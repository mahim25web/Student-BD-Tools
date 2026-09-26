"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculatePercentage, percentageToGrade } from "@/lib/calculators/simple";

export function PercentageCalculator() {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (obtained.trim() === "" || total.trim() === "") {
      setError("Please fill in all required fields.");
      setResult(null);
      return;
    }

    const obtainedNum = Number(obtained);
    const totalNum = Number(total);
    const outcome = calculatePercentage(obtainedNum, totalNum);

    if (!outcome.ok) {
      const messages: Record<string, string> = {
        invalid: "Please enter a valid mark.",
        "total-zero": "Total marks must be greater than 0.",
        "exceeds-total": "Obtained marks cannot exceed total marks.",
      };
      setError(messages[outcome.error]);
      setResult(null);
      return;
    }

    setError(null);
    setResult(outcome.data.percentage);
  };

  const handleReset = () => {
    setObtained("");
    setTotal("");
    setError(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="obtained-marks" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Obtained marks
          </label>
          <input
            id="obtained-marks"
            type="number"
            inputMode="decimal"
            min={0}
            value={obtained}
            onChange={(e) => setObtained(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="total-marks" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Total marks
          </label>
          <input
            id="total-marks"
            type="number"
            inputMode="decimal"
            min={0}
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>

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
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800"
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

      {result !== null && (
        <div className="mt-6 max-w-xs">
          <ResultCard
            label="Percentage"
            value={`${result}%`}
            helpText={`Approximate grade: ${percentageToGrade(result)}`}
            copyValue={`${result}%`}
          />
        </div>
      )}
    </div>
  );
}
