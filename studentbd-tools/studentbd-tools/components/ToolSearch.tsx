"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorCard } from "@/components/CalculatorCard";
import type { ToolCategory, ToolMeta } from "@/lib/seo/toolsData";

const CATEGORIES: Array<ToolCategory | "All"> = [
  "All",
  "Academic",
  "University",
  "General",
  "Study",
];

export function ToolSearch({ tools }: { tools: ToolMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [tool.name, tool.shortDescription, ...tool.keywords]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [tools, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
            aria-hidden="true"
          />
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-9 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                  isActive
                    ? "border-navy-900 bg-navy-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-navy-950"
                    : "border-navy-200 bg-white text-navy-700 hover:border-navy-400 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-navy-200 p-8 text-center text-sm text-navy-600 dark:border-navy-700 dark:text-navy-400">
          No tools match &ldquo;{query}&rdquo;. Try a different search term.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <CalculatorCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
