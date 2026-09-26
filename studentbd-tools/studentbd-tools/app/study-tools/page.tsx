import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { STUDY_TOOLS } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/study-tools";

export const metadata: Metadata = {
  title: "Study Tools",
  description:
    "Free study tools for Bangladeshi students: a Pomodoro-style study timer, an exam countdown, and a study hours calculator.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Study Tools | StudentBD Tools",
    description:
      "Free study tools: a Pomodoro-style study timer, an exam countdown, and a study hours calculator.",
    url: absoluteUrl(PATH),
  },
};

export default function StudyToolsPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Study Tools" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        Study Tools
      </h1>
      <p className="mt-2 max-w-2xl text-base text-navy-700 dark:text-navy-200">
        Tools to help you plan, focus, and track your study time.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STUDY_TOOLS.map((tool) => (
          <CalculatorCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
