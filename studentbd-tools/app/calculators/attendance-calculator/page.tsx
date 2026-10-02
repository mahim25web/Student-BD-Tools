import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { AttendanceCalculator } from "@/components/calculators/AttendanceCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/attendance-calculator";

export const metadata: Metadata = {
  title: "Attendance Calculator — How Many Classes to Attend or Skip",
  description:
    "Track your class attendance percentage and find out how many more classes you must attend, or can skip, to hit your required attendance.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Attendance Calculator",
    description: "Find out how many classes you must attend or can skip to hit your target attendance.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Why does a 100% target sometimes say \u201cnot possible\u201d?",
    answer:
      "Once you've missed even one class, your attendance can never reach a true 100% again — only aim for 100% as a target if you haven't missed any classes yet.",
  },
  {
    question: "Does \u201cclasses you can skip\u201d assume future classes are new?",
    answer:
      "Yes — it assumes each skipped class adds to your total class count without adding to your attended count, which is how attendance percentages are normally tracked.",
  },
];

export default function AttendanceCalculatorPage() {
  return (
    <CalculatorLayout
      title="Attendance Calculator"
      description="Track your attendance percentage and see how many more classes you must attend, or can skip."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Attendance Calculator" },
      ]}
      related={relatedTools("attendance-calculator")}
    >
      <AttendanceCalculator />

      <ContentSection title="How is this calculated?">
        <p>
          Your current attendance is simply classes attended divided by
          total classes held. If you&apos;re below your required
          percentage, the calculator finds how many consecutive future
          classes you&apos;d need to attend (assuming no more misses) to
          climb back to target. If you&apos;re above it, it finds how many
          more classes you could skip while staying at or above target.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
