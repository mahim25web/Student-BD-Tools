"use client";

import { useState, type FormEvent } from "react";
import { ResultCard } from "@/components/ResultCard";
import { convertTimeZone, CITY_ZONES, type TimeZoneResult } from "@/lib/calculators/timezone";

export function TimeZoneCalculator() {
  const [fromZone, setFromZone] = useState("dhaka");
  const [toZone, setToZone] = useState("london");
  const [time, setTime] = useState("09:00");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TimeZoneResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = convertTimeZone(fromZone, toZone, time);
    if (!outcome.ok) {
      setError(outcome.error);
      setResult(null);
      return;
    }
    setError(null);
    setResult(outcome.data);
  };

  const fromLabel = CITY_ZONES.find((z) => z.id === fromZone)?.label ?? "";
  const toLabel = CITY_ZONES.find((z) => z.id === toZone)?.label ?? "";

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="from-zone" className="text-sm font-medium text-navy-700 dark:text-navy-200">From</label>
          <select id="from-zone" value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
            {CITY_ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="to-zone" className="text-sm font-medium text-navy-700 dark:text-navy-200">To</label>
          <select id="to-zone" value={toZone} onChange={(e) => setToZone(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
            {CITY_ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="source-time" className="text-sm font-medium text-navy-700 dark:text-navy-200">Time in {fromLabel.split(" (")[0]}</label>
          <input id="source-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>

        <div className="sm:col-span-3">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
            Convert Time
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard
            label={`Time in ${toLabel.split(" (")[0]}`}
            value={result.convertedTime}
            helpText={
              result.dayOffset === 0
                ? "Same calendar day."
                : result.dayOffset > 0
                ? "The next calendar day."
                : "The previous calendar day."
            }
            copyValue={result.convertedTime}
          />
          <ResultCard
            label="Time difference"
            value={`${result.differenceHours >= 0 ? "+" : ""}${result.differenceHours}h`}
            helpText="Approximate standard-time offset — doesn't account for daylight saving time."
          />
        </div>
      )}
    </div>
  );
}
