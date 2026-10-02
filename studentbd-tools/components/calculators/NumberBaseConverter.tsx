"use client";

import { useState, type FormEvent } from "react";
import { ResultCard } from "@/components/ResultCard";
import { convertNumberBase, type NumberBaseResult } from "@/lib/calculators/converters";

const BASES = [
  { value: 2, label: "Binary (base 2)" },
  { value: 8, label: "Octal (base 8)" },
  { value: 10, label: "Decimal (base 10)" },
  { value: 16, label: "Hexadecimal (base 16)" },
];

export function NumberBaseConverter() {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NumberBaseResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = convertNumberBase(value, Number(fromBase));
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="base-value" className="text-sm font-medium text-navy-700 dark:text-navy-200">Number</label>
          <input id="base-value" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 1010 or FF" className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 font-mono text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        <div>
          <label htmlFor="from-base" className="text-sm font-medium text-navy-700 dark:text-navy-200">From base</label>
          <select id="from-base" value={fromBase} onChange={(e) => setFromBase(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white">
            {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
            Convert
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard label="Binary" value={result.binary} copyValue={result.binary} />
          <ResultCard label="Octal" value={result.octal} copyValue={result.octal} />
          <ResultCard label="Decimal" value={result.decimal} copyValue={result.decimal} />
          <ResultCard label="Hexadecimal" value={result.hexadecimal} copyValue={result.hexadecimal} />
        </div>
      )}
    </div>
  );
}
