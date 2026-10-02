"use client";

import { useState, type FormEvent } from "react";
import { ResultCard } from "@/components/ResultCard";
import { calculateAspectRatio, type AspectRatioResult } from "@/lib/calculators/converters";

export function AspectRatioCalculator() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [targetWidth, setTargetWidth] = useState("");
  const [targetHeight, setTargetHeight] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AspectRatioResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateAspectRatio(
      Number(width),
      Number(height),
      targetWidth ? Number(targetWidth) : undefined,
      targetHeight ? Number(targetHeight) : undefined
    );
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="orig-width" className="text-sm font-medium text-navy-700 dark:text-navy-200">Original width</label>
            <input id="orig-width" type="number" min={0} value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
          </div>
          <div>
            <label htmlFor="orig-height" className="text-sm font-medium text-navy-700 dark:text-navy-200">Original height</label>
            <input id="orig-height" type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
          </div>
        </div>

        <p className="text-sm text-navy-600 dark:text-navy-300">
          Optionally, enter a new width <em>or</em> height to scale proportionally:
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="target-width" className="text-sm font-medium text-navy-700 dark:text-navy-200">New width (optional)</label>
            <input id="target-width" type="number" min={0} value={targetWidth} onChange={(e) => setTargetWidth(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
          </div>
          <div>
            <label htmlFor="target-height" className="text-sm font-medium text-navy-700 dark:text-navy-200">New height (optional)</label>
            <input id="target-height" type="number" min={0} value={targetHeight} onChange={(e) => setTargetHeight(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
          </div>
        </div>

        <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
          Calculate
        </button>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard label="Simplified ratio" value={`${result.simplified.w}:${result.simplified.h}`} copyValue={`${result.simplified.w}:${result.simplified.h}`} />
          {result.computedHeight !== undefined && (
            <ResultCard label="Matching height" value={String(result.computedHeight)} />
          )}
          {result.computedWidth !== undefined && (
            <ResultCard label="Matching width" value={String(result.computedWidth)} />
          )}
        </div>
      )}
    </div>
  );
}
