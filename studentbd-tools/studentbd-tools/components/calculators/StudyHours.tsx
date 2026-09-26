"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";

function parseTimeToMinutes(value: string): number | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function StudyHours() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ hours: number; minutes: number } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const startMin = parseTimeToMinutes(start);
    const endMin = parseTimeToMinutes(end);
    const breakNum = Number(breakMinutes || 0);

    if (startMin === null || endMin === null) {
      setError("Please select a valid start and end time.");
      setResult(null);
      return;
    }
    if (Number.isNaN(breakNum) || breakNum < 0) {
      setError("Break duration must be zero or a positive number of minutes.");
      setResult(null);
      return;
    }

    // Support sessions that cross midnight (e.g. 10 PM to 1 AM).
    let diff = endMin - startMin;
    if (diff <= 0) diff += 24 * 60;

    const netMinutes = diff - breakNum;
    if (netMinutes < 0) {
      setError("Break duration cannot be longer than the total session time.");
      setResult(null);
      return;
    }

    setError(null);
    setResult({ hours: Math.floor(netMinutes / 60), minutes: netMinutes % 60 });
  };

  const handleReset = () => {
    setStart("");
    setEnd("");
    setBreakMinutes("0");
    setError(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="start-time" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Start time
          </label>
          <input
            id="start-time"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="end-time" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            End time
          </label>
          <input
            id="end-time"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="break-duration" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Break (minutes)
          </label>
          <input
            id="break-duration"
            type="number"
            min={0}
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
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
        <div className="mt-6 max-w-xs">
          <ResultCard
            label="Total study time"
            value={`${result.hours}h ${result.minutes}m`}
            copyValue={`${result.hours} hours ${result.minutes} minutes`}
          />
        </div>
      )}
    </div>
  );
}
