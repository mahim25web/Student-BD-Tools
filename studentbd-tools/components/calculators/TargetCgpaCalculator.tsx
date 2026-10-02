"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateTargetCgpa, type TargetCgpaResult } from "@/lib/calculators/academicExtra";

export function TargetCgpaCalculator() {
  const [currentCgpa, setCurrentCgpa] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [targetCgpa, setTargetCgpa] = useState("");
  const [remainingCredits, setRemainingCredits] = useState("");
  const [scaleMax, setScaleMax] = useState("4.00");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TargetCgpaResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateTargetCgpa({
      currentCgpa: Number(currentCgpa),
      completedCredits: Number(completedCredits),
      targetCgpa: Number(targetCgpa),
      remainingCredits: Number(remainingCredits),
      scaleMax: Number(scaleMax),
    });
    if (!outcome.ok) {
      setError(outcome.error);
      setResult(null);
      return;
    }
    setError(null);
    setResult(outcome.data);
  };

  const handleReset = () => {
    setCurrentCgpa("");
    setCompletedCredits("");
    setTargetCgpa("");
    setRemainingCredits("");
    setScaleMax("4.00");
    setError(null);
    setResult(null);
  };

  const fields = [
    { id: "current-cgpa", label: "Current CGPA", value: currentCgpa, set: setCurrentCgpa },
    { id: "completed-credits", label: "Credits completed", value: completedCredits, set: setCompletedCredits },
    { id: "target-cgpa", label: "Target CGPA", value: targetCgpa, set: setTargetCgpa },
    { id: "remaining-credits", label: "Credits remaining", value: remainingCredits, set: setRemainingCredits },
    { id: "scale-max", label: "Scale maximum", value: scaleMax, set: setScaleMax },
  ];

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="text-sm font-medium text-navy-700 dark:text-navy-200">
              {f.label}
            </label>
            <input
              id={f.id}
              type="number"
              inputMode="decimal"
              step="0.01"
              min={0}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
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
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 max-w-xs">
          <ResultCard
            label="Required GPA in remaining semesters"
            value={result.achievable ? result.requiredGpa.toFixed(2) : "Not achievable"}
            helpText={
              result.alreadyAchieved
                ? "You've already reached your target CGPA — any passing GPA from here keeps you above it."
                : result.achievable
                ? "This is the average GPA you need across your remaining credits."
                : "Even a perfect GPA in your remaining credits won't reach this target — consider adjusting it."
            }
            copyValue={result.achievable ? result.requiredGpa.toFixed(2) : undefined}
          />
        </div>
      )}
    </div>
  );
}
