import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSearch } from "@/components/ToolSearch";
import { TOOLS } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "All Calculators & Tools",
  description:
    "Browse every StudentBD Tools calculator — SSC GPA, HSC GPA, university CGPA, percentage, age, marks, and study tools — in one searchable page.",
  alternates: { canonical: absoluteUrl("/calculators") },
  openGraph: {
    title: "All Calculators & Tools | StudentBD Tools",
    description:
      "Browse every StudentBD Tools calculator in one searchable, filterable page.",
    url: absoluteUrl("/calculators"),
  },
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        All Calculators & Tools
      </h1>
      <p className="mt-2 max-w-2xl text-base text-navy-600 dark:text-navy-300">
        Every calculator on StudentBD Tools, in one place. Search by name or
        filter by category to find what you need.
      </p>

      <div className="mt-8">
        <ToolSearch tools={TOOLS} />
      </div>
    </div>
  );
}
