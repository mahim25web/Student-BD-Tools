"use client";

import { useState, type FormEvent } from "react";
import { ResultCard } from "@/components/ResultCard";
import { calculateDiscountTax, type DiscountTaxResult } from "@/lib/calculators/finance";

export function DiscountTaxCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [tax, setTax] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiscountTaxResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = calculateDiscountTax(Number(price), Number(discount), Number(tax));
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="orig-price" className="text-sm font-medium text-navy-700 dark:text-navy-200">Original price</label>
          <input id="orig-price" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        <div>
          <label htmlFor="discount-pct" className="text-sm font-medium text-navy-700 dark:text-navy-200">Discount (%)</label>
          <input id="discount-pct" type="number" min={0} max={100} value={discount} onChange={(e) => setDiscount(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>
        <div>
          <label htmlFor="tax-pct" className="text-sm font-medium text-navy-700 dark:text-navy-200">Tax / VAT (%)</label>
          <input id="tax-pct" type="number" min={0} value={tax} onChange={(e) => setTax(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
        </div>

        <div className="sm:col-span-3">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
            Calculate
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ResultCard label="Price after discount" value={result.priceAfterDiscount.toLocaleString()} helpText={`You save ${result.discountAmount.toLocaleString()}.`} />
          <ResultCard label="Final price (with tax)" value={result.finalPrice.toLocaleString()} helpText={`Tax added: ${result.taxAmount.toLocaleString()}.`} copyValue={String(result.finalPrice)} />
        </div>
      )}
    </div>
  );
}
