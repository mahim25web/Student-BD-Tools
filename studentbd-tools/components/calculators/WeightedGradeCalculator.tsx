"use client";

import { useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { percentageToGrade } from "@/lib/calculators/simple";
import {
  calculateWeightedGrade,
  type WeightedComponent,
  type WeightedComponentResult,
  type WeightedGradeSummary,
} from "@/lib/calculators/academicExtra";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `wgt-${idCounter}-${Date.now()}`;
}

function defaults(): WeightedComponent[] {
  return [
    { id: nextId(), name: "Quizzes", weight: "20", score: "" },
    { id: nextId(), name: "Assignments", weight: "20", score: "" },
    { id: nextId(), name: "Midterm", weight: "25", score: "" },
    { id: nextId(), name: "Final Exam", weight: "35", score: "" },
  ];
}

export function WeightedGradeCalculator() {
  const [components, setComponents] = useState<WeightedComponent[]>(defaults);
  const [summary, setSummary] = useState<WeightedGradeSummary | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (id: string, patch: Partial<WeightedComponent>) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addComponent = () => {
    setComponents((prev) => [...prev, { id: nextId(), name: "", weight: "", score: "" }]);
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    setComponents(defaults());
    setSummary(null);
    setErrors([]);
  };

  const handleCalculate = () => {
    if (components.length === 0) {
      setErrors(["Please add at least one grade component."]);
      setSummary(null);
      return;
    }
    const outcome = calculateWeightedGrade(components);
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
        Enter your graded components
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wide text-navy-600 dark:border-navy-800 dark:text-navy-400">
              <th scope="col" className="py-2 pr-3 font-medium">Component</th>
              <th scope="col" className="py-2 pr-3 font-medium">Weight (%)</th>
              <th scope="col" className="py-2 pr-3 font-medium">Score (%)</th>
              <th scope="col" className="py-2 font-medium sr-only">Remove</th>
            </tr>
          </thead>
          <tbody>
            {components.map((c, index) => {
              const rowResult = summary?.results.find((r: WeightedComponentResult) => r.id === c.id);
              return (
                <tr key={c.id} className="border-b border-navy-50 align-top dark:border-navy-800/60">
                  <td className="py-2 pr-3">
                    <label htmlFor={`wgt-name-${c.id}`} className="sr-only">Component name {index + 1}</label>
                    <input
                      id={`wgt-name-${c.id}`}
                      type="text"
                      value={c.name}
                      onChange={(e) => update(c.id, { name: e.target.value })}
                      placeholder={`Component ${index + 1}`}
                      className="w-full min-w-[140px] rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={c.weight}
                      onChange={(e) => update(c.id, { weight: e.target.value })}
                      aria-label={`Weight for ${c.name || `component ${index + 1}`}`}
                      className="w-20 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={c.score}
                      onChange={(e) => update(c.id, { score: e.target.value })}
                      aria-label={`Score for ${c.name || `component ${index + 1}`}`}
                      className="w-20 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                    {rowResult?.error && (
                      <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{rowResult.error}</p>
                    )}
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeComponent(c.id)}
                      disabled={components.length <= 1}
                      aria-label={`Remove ${c.name || `component ${index + 1}`}`}
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
        <button type="button" onClick={addComponent} className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800">
          <Plus className="h-4 w-4" aria-hidden="true" /> Add component
        </button>
        <button type="button" onClick={handleCalculate} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
          Calculate Final Grade
        </button>
        <button type="button" onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((err) => <li key={err} role="alert">{err}</li>)}
        </ul>
      )}

      {summary && summary.weightWarning && (
        <p className="mt-3 text-sm text-gold-600 dark:text-gold-400">
          Your weights add up to {summary.totalWeight}%, not 100% — the final score below has been normalized accordingly.
        </p>
      )}

      {summary && (
        <div className="mt-6 max-w-xs">
          <ResultCard
            label="Final grade"
            value={`${summary.finalScore}%`}
            helpText={`Approximate letter grade: ${percentageToGrade(summary.finalScore)}`}
            copyValue={`${summary.finalScore}%`}
          />
        </div>
      )}
    </div>
  );
}
