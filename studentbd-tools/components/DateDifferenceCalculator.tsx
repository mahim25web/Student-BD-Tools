"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateDateDifference, type DateDiffResult } from "@/lib/calculators/simple";

export function DateDifferenceCalculator() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DateDiffResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!dateA || !dateB) {
      setError("Please select both dates.");
      setResult(null);
      return;
    }

    const outcome = calculateDateDifference(
      new Date(`${dateA}T00:00:00`),
      new Date(`${dateB}T00:00:00`)
    );

    if (!outcome.ok) {
      setError("Please select valid dates.");
      setResult(null);
      return;
    }

    setError(null);
    setResult(outcome.data);
  };

  const handleReset = () => {
    setDateA("");
    setDateB("");
    setError(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date-a" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            From date
          </label>
          <input
            id="date-a"
            type="date"
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="date-b" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            To date
          </label>
          <input
            id="date-b"
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
          >
            Calculate Difference
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
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard
            label="Difference"
            value={`${result.years}y ${result.months}m ${result.days}d`}
            helpText={`That's ${result.totalMonths} months, or ${result.totalWeeks.toLocaleString()} weeks.`}
            copyValue={`${result.years} years, ${result.months} months, ${result.days} days`}
          />
          <ResultCard
            label="Total days"
            value={result.totalDays.toLocaleString()}
            copyValue={String(result.totalDays)}
          />
        </div>
      )}
    </div>
  );
}
