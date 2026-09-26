"use client";

import { useId, useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import {
  calculateBdGpa,
  type GpaOutcome,
  type SubjectInput,
} from "@/lib/grading/bdGrading";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `subj-${idCounter}-${Date.now()}`;
}

function makeDefaultSubjects(names: string[]): SubjectInput[] {
  return names.map((name, index) => ({
    id: nextId(),
    name,
    marks: "",
    isOptional: index === names.length - 1 && names.length > 6,
  }));
}

export function BdGpaCalculator({
  examLabel,
  defaultSubjectNames,
}: {
  examLabel: "SSC" | "HSC";
  defaultSubjectNames: string[];
}) {
  const formTitleId = useId();
  const [subjects, setSubjects] = useState<SubjectInput[]>(() =>
    makeDefaultSubjects(defaultSubjectNames)
  );
  const [outcome, setOutcome] = useState<GpaOutcome | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const updateSubject = (id: string, patch: Partial<SubjectInput>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: nextId(), name: "", marks: "", isOptional: false },
    ]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setSubjects(makeDefaultSubjects(defaultSubjectNames));
    setOutcome(null);
    setFormError(null);
  };

  const handleCalculate = () => {
    if (subjects.length === 0) {
      setFormError("Please add at least one subject.");
      setOutcome(null);
      return;
    }
    const result = calculateBdGpa(subjects);
    setOutcome(result);
    setFormError(
      result.gpa === null && result.errors.length === 0
        ? "Please fix the highlighted fields before calculating."
        : null
    );
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <h2 id={formTitleId} className="font-display text-lg font-semibold text-navy-900 dark:text-white">
        Enter your {examLabel} subjects and marks
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wide text-navy-600 dark:border-navy-800 dark:text-navy-400">
              <th scope="col" className="py-2 pr-3 font-medium">Subject</th>
              <th scope="col" className="py-2 pr-3 font-medium">Marks (0–100)</th>
              <th scope="col" className="py-2 pr-3 font-medium">4th / additional</th>
              <th scope="col" className="py-2 pr-3 font-medium">Grade</th>
              <th scope="col" className="py-2 pr-3 font-medium">Point</th>
              <th scope="col" className="py-2 font-medium sr-only">Remove</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const rowResult = outcome?.results.find((r) => r.id === subject.id);
              return (
                <tr key={subject.id} className="border-b border-navy-50 align-top dark:border-navy-800/60">
                  <td className="py-2 pr-3">
                    <label htmlFor={`name-${subject.id}`} className="sr-only">
                      Subject name {index + 1}
                    </label>
                    <input
                      id={`name-${subject.id}`}
                      type="text"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, { name: e.target.value })}
                      placeholder={`Subject ${index + 1}`}
                      className="w-full min-w-[140px] rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label htmlFor={`marks-${subject.id}`} className="sr-only">
                      Marks for {subject.name || `subject ${index + 1}`}
                    </label>
                    <input
                      id={`marks-${subject.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      value={subject.marks}
                      onChange={(e) => updateSubject(subject.id, { marks: e.target.value })}
                      aria-invalid={Boolean(rowResult?.error)}
                      aria-describedby={rowResult?.error ? `error-${subject.id}` : undefined}
                      className="w-24 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                    {rowResult?.error && (
                      <p id={`error-${subject.id}`} role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {rowResult.error}
                      </p>
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(subject.isOptional)}
                        onChange={(e) => updateSubject(subject.id, { isOptional: e.target.checked })}
                        className="h-4 w-4 rounded border-navy-300 text-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-600"
                      />
                      <span className="text-xs text-navy-600 dark:text-navy-400">4th subject</span>
                    </label>
                  </td>
                  <td className="py-2 pr-3 font-medium text-navy-900 dark:text-white">
                    {rowResult ? rowResult.letter : "-"}
                  </td>
                  <td className="py-2 pr-3 text-navy-700 dark:text-navy-200">
                    {rowResult ? rowResult.point.toFixed(2) : "-"}
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
          Calculate GPA
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>
      </div>

      {formError && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}

      {outcome && outcome.gpa !== null && (
        <div className="mt-6 max-w-xs">
          <ResultCard
            label={`Your ${examLabel} GPA`}
            value={outcome.failed ? "0.00" : outcome.gpa.toFixed(2)}
            helpText={
              outcome.failed
                ? "One or more compulsory subjects scored an F, so the overall result is a fail."
                : "Out of a maximum GPA of 5.00."
            }
            copyValue={outcome.failed ? "0.00" : outcome.gpa.toFixed(2)}
          />
        </div>
      )}
    </div>
  );
}
