"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeftRight } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { convertUnit, UNIT_OPTIONS, type UnitCategory } from "@/lib/calculators/converters";

const CATEGORIES: { id: UnitCategory; label: string }[] = [
  { id: "length", label: "Length" },
  { id: "mass", label: "Mass" },
  { id: "temperature", label: "Temperature" },
  { id: "storage", label: "Storage" },
];

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState(UNIT_OPTIONS.length[0].id);
  const [toUnit, setToUnit] = useState(UNIT_OPTIONS.length[2].id);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const changeCategory = (c: UnitCategory) => {
    setCategory(c);
    setFromUnit(UNIT_OPTIONS[c][0].id);
    setToUnit(UNIT_OPTIONS[c][1].id);
    setResult(null);
    setError(null);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = convertUnit(category, fromUnit, toUnit, Number(value));
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
      <div role="group" aria-label="Unit category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((c: { id: UnitCategory; label: string }) => (
          <button
            key={c.id}
            type="button"
            onClick={() => changeCategory(c.id)}
            aria-pressed={category === c.id}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c.id
                ? "border-navy-900 bg-navy-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-navy-950"
                : "border-navy-200 bg-white text-navy-600 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label htmlFor="from-unit" className="text-sm font-medium text-navy-700 dark:text-navy-200">From</label>
          <select id="from-unit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
            {UNIT_OPTIONS[category].map((u: { id: string; label: string }) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="mt-2 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>

        <div className="flex items-end justify-center pb-2 sm:pb-0 sm:pt-7">
          <button
            type="button"
            onClick={swap}
            aria-label="Swap units"
            className="rounded-lg border border-navy-200 p-2 text-navy-600 hover:bg-navy-50 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-800"
          >
            <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div>
          <label htmlFor="to-unit" className="text-sm font-medium text-navy-700 dark:text-navy-200">To</label>
          <select id="to-unit" value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
            {UNIT_OPTIONS[category].map((u: { id: string; label: string }) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
          >
            Convert
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result !== null && (
        <div className="mt-6 max-w-xs">
          <ResultCard label="Result" value={`${result} ${toUnit}`} copyValue={String(result)} />
        </div>
      )}
    </div>
  );
}
