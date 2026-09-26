import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolIcon } from "@/components/ToolIcon";
import type { ToolMeta } from "@/lib/seo/toolsData";

export function CalculatorCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      href={tool.href}
      className="group flex flex-col rounded-xl border border-navy-200 bg-white p-5 transition-colors hover:border-navy-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-800 dark:bg-navy-900 dark:hover:border-navy-600"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800 dark:bg-navy-800 dark:text-gold-400">
        <ToolIcon icon={tool.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-navy-900 dark:text-white">
        {tool.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-navy-700 dark:text-navy-200">
        {tool.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 group-hover:text-navy-950 dark:text-gold-400 dark:group-hover:text-gold-300">
        Use Calculator
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
