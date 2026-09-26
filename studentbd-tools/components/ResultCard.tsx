"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ResultCard({
  label,
  value,
  helpText,
  copyValue,
}: {
  label: string;
  value: string;
  helpText?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, nothing to recover.
    }
  };

  return (
    <div className="rounded-xl border border-gold-200 bg-gold-50 p-5 dark:border-gold-900/40 dark:bg-navy-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-navy-600 dark:text-navy-300">
            {label}
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-navy-900 dark:text-white">
            {value}
          </p>
          {helpText && (
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-400">
              {helpText}
            </p>
          )}
        </div>
        {copyValue && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
