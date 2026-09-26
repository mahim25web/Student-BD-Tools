import { AlertTriangle } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import type { ToolMeta } from "@/lib/seo/toolsData";

export function CalculatorLayout({
  title,
  description,
  breadcrumbs,
  disclaimer,
  related,
  children,
}: {
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  disclaimer?: string;
  related?: ToolMeta[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-3 font-display text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-base text-navy-700 dark:text-navy-200">
        {description}
      </p>

      {disclaimer && (
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-800 dark:border-gold-900/40 dark:bg-navy-900 dark:text-navy-200">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600 dark:text-gold-400"
            aria-hidden="true"
          />
          <p>{disclaimer}</p>
        </div>
      )}

      <div className="mt-8">{children}</div>

      {related && related.length > 0 && (
        <section className="mt-14" aria-labelledby="related-tools-heading">
          <h2
            id="related-tools-heading"
            className="font-display text-xl font-semibold text-navy-900 dark:text-white"
          >
            Related calculators
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((tool) => (
              <CalculatorCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
