"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateAttendance, type AttendanceResult } from "@/lib/calculators/academicExtra";

export function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [targetPercent, setTargetPercent] = useState("75");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AttendanceResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateAttendance({
      totalClasses: Number(totalClasses),
      attendedClasses: Number(attendedClasses),
      targetPercent: Number(targetPercent),
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
    setTotalClasses("");
    setAttendedClasses("");
    setTargetPercent("75");
    setError(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="total-classes" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Total classes held
          </label>
          <input
            id="total-classes"
            type="number"
            min={0}
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="attended-classes" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Classes attended
          </label>
          <input
            id="attended-classes"
            type="number"
            min={0}
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="target-percent" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Required attendance (%)
          </label>
          <input
            id="target-percent"
            type="number"
            min={1}
            max={100}
            value={targetPercent}
            onChange={(e) => setTargetPercent(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
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
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard label="Current attendance" value={`${result.currentPercent}%`} />
          {result.status === "below" && (
            <ResultCard
              label="Classes you must attend next"
              value={
                result.classesNeeded === Infinity
                  ? "Not possible"
                  : String(result.classesNeeded)
              }
              helpText={
                result.classesNeeded === Infinity
                  ? "You can't reach 100% once you've missed a class — aim for a lower, realistic target."
                  : "Consecutively, assuming you don't miss any more classes."
              }
            />
          )}
          {result.status === "above" && (
            <ResultCard
              label="Classes you can still skip"
              value={String(result.classesCanSkip)}
              helpText="While staying at or above your required percentage."
            />
          )}
          {result.status === "exact" && (
            <ResultCard label="Status" value="Right on target" helpText="You're exactly at your required percentage." />
          )}
        </div>
      )}
    </div>
  );
}
