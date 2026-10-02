"use client";

import { useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateExpensePlan, type ExpenseItem, type ExpensePlanSummary } from "@/lib/calculators/finance";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `exp-${idCounter}-${Date.now()}`;
}

function defaults(): ExpenseItem[] {
  return [
    { id: nextId(), name: "Rent / hostel", amount: "" },
    { id: nextId(), name: "Food", amount: "" },
    { id: nextId(), name: "Transport", amount: "" },
    { id: nextId(), name: "Tuition / course fees", amount: "" },
  ];
}

export function ExpensePlanner() {
  const [budget, setBudget] = useState("");
  const [items, setItems] = useState<ExpenseItem[]>(defaults);
  const [summary, setSummary] = useState<ExpensePlanSummary | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (id: string, patch: Partial<ExpenseItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const addItem = () => setItems((prev) => [...prev, { id: nextId(), name: "", amount: "" }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const handleReset = () => {
    setBudget("");
    setItems(defaults());
    setSummary(null);
    setErrors([]);
  };

  const handleCalculate = () => {
    const outcome = calculateExpensePlan(items, Number(budget));
    if (!outcome.ok) {
      setErrors(outcome.errors);
      setSummary(null);
      return;
    }
    setErrors([]);
    setSummary(outcome.data);
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <div className="max-w-xs">
        <label htmlFor="budget" className="text-sm font-medium text-navy-700 dark:text-navy-200">Monthly budget</label>
        <input id="budget" type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white" />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wide text-navy-600 dark:border-navy-800 dark:text-navy-400">
              <th scope="col" className="py-2 pr-3 font-medium">Expense</th>
              <th scope="col" className="py-2 pr-3 font-medium">Monthly amount</th>
              <th scope="col" className="py-2 pr-3 font-medium">% of total</th>
              <th scope="col" className="py-2 font-medium sr-only">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const rowResult = summary?.results.find((r) => r.id === item.id);
              return (
                <tr key={item.id} className="border-b border-navy-50 align-top dark:border-navy-800/60">
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => update(item.id, { name: e.target.value })}
                      placeholder={`Expense ${index + 1}`}
                      aria-label={`Expense name ${index + 1}`}
                      className="w-full min-w-[140px] rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={item.amount}
                      onChange={(e) => update(item.id, { amount: e.target.value })}
                      aria-label={`Amount for ${item.name || `expense ${index + 1}`}`}
                      className="w-28 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                    {rowResult?.error && <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{rowResult.error}</p>}
                  </td>
                  <td className="py-2 pr-3 text-navy-700 dark:text-navy-300">{rowResult ? `${rowResult.percentOfTotal}%` : "-"}</td>
                  <td className="py-2">
                    <button type="button" onClick={() => removeItem(item.id)} disabled={items.length <= 1} aria-label={`Remove ${item.name || `expense ${index + 1}`}`} className="rounded-md p-1.5 text-navy-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-950/40">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800">
          <Plus className="h-4 w-4" aria-hidden="true" /> Add expense
        </button>
        <button type="button" onClick={handleCalculate} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
          Calculate
        </button>
        <button type="button" onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((err) => <li key={err} role="alert">{err}</li>)}
        </ul>
      )}

      {summary && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResultCard label="Total expenses" value={summary.totalExpenses.toLocaleString()} />
          <ResultCard
            label={summary.overBudget ? "Over budget by" : "Remaining budget"}
            value={Math.abs(summary.remaining).toLocaleString()}
            helpText={summary.overBudget ? "Consider trimming a category above." : "Still within your monthly budget."}
          />
          <ResultCard label="Monthly budget" value={summary.budget.toLocaleString()} />
        </div>
      )}
    </div>
  );
}
