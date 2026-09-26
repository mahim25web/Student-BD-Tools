"use client";

import { useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateMarksSummary, type MarksSubject, type MarksSummary } from "@/lib/calculators/simple";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `mark-${idCounter}-${Date.now()}`;
}

function makeDefaultSubjects(): MarksSubject[] {
  return [
    { id: nextId(), name: "", fullMarks: "100", obtainedMarks: "" },
    { id: nextId(), name: "", fullMarks: "100", obtainedMarks: "" },
    { id: nextId(), name: "", fullMarks: "100", obtainedMarks: "" },
  ];
}

export function MarksCalculator() {
  const [subjects, setSubjects] = useState<MarksSubject[]>(makeDefaultSubjects);
  const [summary, setSummary] = useState<MarksSummary | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const updateSubject = (id: string, patch: Partial<MarksSubject>) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: nextId(), name: "", fullMarks: "100", obtainedMarks: "" }]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setSubjects(makeDefaultSubjects());
    setSummary(null);
    setErrors([]);
  };

  const handleCalculate = () => {
    if (subjects.length === 0) {
      setErrors(["Please add at least one subject."]);
      setSummary(null);
      return;
    }
    const outcome = calculateMarksSummary(subjects);
    if (!outcome.ok) {
      setErrors(outcome.errors);
      setSummary(null);
      return;
    }
    setErrors([]);
    setSummary(outcome.data);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
        Enter your subjects
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wide text-navy-600 dark:border-navy-800 dark:text-navy-400">
              <th scope="col" className="py-2 pr-3 font-medium">Subject</th>
              <th scope="col" className="py-2 pr-3 font-medium">Full marks</th>
              <th scope="col" className="py-2 pr-3 font-medium">Obtained marks</th>
              <th scope="col" className="py-2 pr-3 font-medium">Percentage</th>
              <th scope="col" className="py-2 pr-3 font-medium">Grade</th>
              <th scope="col" className="py-2 font-medium sr-only">Remove</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const rowResult = summary?.results.find((r) => r.id === subject.id);
              return (
                <tr key={subject.id} className="border-b border-navy-50 align-top dark:border-navy-800/60">
                  <td className="py-2 pr-3">
                    <label htmlFor={`m-name-${subject.id}`} className="sr-only">
                      Subject name {index + 1}
                    </label>
                    <input
                      id={`m-name-${subject.id}`}
                      type="text"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, { name: e.target.value })}
                      placeholder={`Subject ${index + 1}`}
                      className="w-full min-w-[140px] rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label htmlFor={`m-full-${subject.id}`} className="sr-only">
                      Full marks for {subject.name || `subject ${index + 1}`}
                    </label>
                    <input
                      id={`m-full-${subject.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={subject.fullMarks}
                      onChange={(e) => updateSubject(subject.id, { fullMarks: e.target.value })}
                      className="w-24 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label htmlFor={`m-obtained-${subject.id}`} className="sr-only">
                      Obtained marks for {subject.name || `subject ${index + 1}`}
                    </label>
                    <input
                      id={`m-obtained-${subject.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={subject.obtainedMarks}
                      onChange={(e) => updateSubject(subject.id, { obtainedMarks: e.target.value })}
                      aria-invalid={Boolean(rowResult?.error)}
                      className="w-24 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                    {rowResult?.error && (
                      <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {rowResult.error}
                      </p>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-navy-700 dark:text-navy-200">
                    {rowResult ? `${rowResult.percentage}%` : "-"}
                  </td>
                  <td className="py-2 pr-3 font-medium text-navy-900 dark:text-white">
                    {rowResult ? rowResult.grade : "-"}
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length <= 1}
                      aria-label={`Remove ${subject.name || `subject ${index + 1}`}`}
                      className="rounded-md p-1.5 text-navy-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addSubject}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Add subject
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((err) => (
            <li key={err} role="alert">{err}</li>
          ))}
        </ul>
      )}

      {summary && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard
            label="Total marks"
            value={`${summary.totalObtainedMarks} / ${summary.totalFullMarks}`}
          />
          <ResultCard
            label="Overall percentage"
            value={`${summary.overallPercentage}%`}
            helpText={`Approximate grade: ${summary.overallGrade}`}
            copyValue={`${summary.overallPercentage}%`}
          />
          <ResultCard
            label="Average per subject"
            value={`${summary.averagePercentage}%`}
          />
        </div>
      )}
    </div>
  );
}
