"use client";

import { useState, type FormEvent } from "react";
import { ResultCard } from "@/components/ResultCard";
import { calculateInterest, type InterestResult, type InterestType } from "@/lib/calculators/finance";

const FREQUENCIES = [
  { value: 1, label: "Annually" },
  { value: 2, label: "Semi-annually" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
];

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [type, setType] = useState<InterestType>("simple");
  const [frequency, setFrequency] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InterestResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateInterest(Number(principal), Number(rate), Number(years), type, Number(frequency));
    if (!outcome.ok) {
      setError(outcome.error);
      setResult(null);
      return;
    }
    setError(null);
    setResult(outcome.data);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <div role="group" aria-label="Interest type" className="flex gap-2">
        {(["simple", "compound"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              type === t
                ? "border-navy-900 bg-navy-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-navy-950"
                : "border-navy-200 bg-white text-navy-600 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300"
            }`}
          >
            {t} interest
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="principal" className="text-sm font-medium text-navy-700 dark:text-navy-200">Principal amount</label>
          <input id="principal" type="number" min={0} value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        <div>
          <label htmlFor="rate" className="text-sm font-medium text-navy-700 dark:text-navy-200">Annual interest rate (%)</label>
          <input id="rate" type="number" min={0} value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        <div>
          <label htmlFor="years" className="text-sm font-medium text-navy-700 dark:text-navy-200">Time period (years)</label>
          <input id="years" type="number" min={0} step="0.1" value={years} onChange={(e) => setYears(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        {type === "compound" && (
          <div>
            <label htmlFor="frequency" className="text-sm font-medium text-navy-700 dark:text-navy-200">Compounding frequency</label>
            <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
              {FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
            Calculate
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard label="Interest earned" value={result.interestEarned.toLocaleString()} />
          <ResultCard label="Total amount" value={result.totalAmount.toLocaleString()} copyValue={String(result.totalAmount)} />
        </div>
      )}
    </div>
  );
}
