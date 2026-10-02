"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateBmi, type BmiResult, type BmiUnit } from "@/lib/calculators/bmi";

const CATEGORY_HELP: Record<BmiResult["category"], string> = {
  Underweight: "Below the typical healthy range — consider speaking with a doctor or nutritionist.",
  "Normal weight": "Within the typical healthy range for most adults.",
  Overweight: "Above the typical healthy range.",
  Obese: "Well above the typical healthy range — consider speaking with a doctor.",
};

export function BmiCalculator() {
  const [unit, setUnit] = useState<BmiUnit>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BmiResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateBmi(
      unit === "metric"
        ? { unit, heightCm: Number(heightCm), weightKg: Number(weightKg) }
        : { unit, heightIn: Number(heightIn), weightLb: Number(weightLb) }
    );
    if (!outcome.ok) {
      setError(outcome.error);
      setResult(null);
      return;
    }
    setError(null);
    setResult(outcome.data);
  };

  const handleReset = () => {
    setHeightCm("");
    setWeightKg("");
    setHeightIn("");
    setWeightLb("");
    setError(null);
    setResult(null);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <div role="group" aria-label="Unit system" className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnit(u)}
            aria-pressed={unit === u}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              unit === u
                ? "border-navy-900 bg-navy-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-navy-950"
                : "border-navy-200 bg-white text-navy-600 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300"
            }`}
          >
            {u === "metric" ? "Metric (cm / kg)" : "Imperial (in / lb)"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {unit === "metric" ? (
          <>
            <div>
              <label htmlFor="height-cm" className="text-sm font-medium text-navy-700 dark:text-navy-200">Height (cm)</label>
              <input id="height-cm" type="number" min={0} value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
            </div>
            <div>
              <label htmlFor="weight-kg" className="text-sm font-medium text-navy-700 dark:text-navy-200">Weight (kg)</label>
              <input id="weight-kg" type="number" min={0} value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="height-in" className="text-sm font-medium text-navy-700 dark:text-navy-200">Height (inches)</label>
              <input id="height-in" type="number" min={0} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
            </div>
            <div>
              <label htmlFor="weight-lb" className="text-sm font-medium text-navy-700 dark:text-navy-200">Weight (lb)</label>
              <input id="weight-lb" type="number" min={0} value={weightLb} onChange={(e) => setWeightLb(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
            </div>
          </>
        )}

        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
            Calculate BMI
          </button>
          <button type="button" onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 max-w-xs">
          <ResultCard label="Your BMI" value={result.bmi.toFixed(1)} helpText={`${result.category} — ${CATEGORY_HELP[result.category]}`} copyValue={result.bmi.toFixed(1)} />
        </div>
      )}
    </div>
  );
}
