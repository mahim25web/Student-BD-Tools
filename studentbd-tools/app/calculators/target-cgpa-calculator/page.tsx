import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { TargetCgpaCalculator } from "@/components/calculators/TargetCgpaCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/target-cgpa-calculator";

export const metadata: Metadata = {
  title: "Target CGPA Calculator — Required GPA to Reach Your Goal",
  description:
    "Find the minimum GPA you need in your upcoming semesters to reach a target overall CGPA.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Target CGPA Calculator",
    description: "Find the minimum GPA needed in upcoming semesters to hit your target CGPA.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "What if the required GPA is higher than the scale maximum?",
    answer:
      "The calculator will tell you the target isn't achievable with your remaining credits. You'd need either more remaining credits or a lower target CGPA.",
  },
  {
    question: "Does this work for any grading scale?",
    answer:
      "Yes — enter your scale's maximum (4.00 is most common) and the calculator adjusts accordingly.",
  },
];

export default function TargetCgpaCalculatorPage() {
  return (
    <CalculatorLayout
      title="Target CGPA Calculator"
      description="Find the minimum GPA you need in upcoming semesters to reach your target overall CGPA."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Target CGPA Calculator" },
      ]}
      related={relatedTools("target-cgpa-calculator")}
    >
      <TargetCgpaCalculator />

      <ContentSection title="How is this calculated?">
        <p>
          The calculator works backward from your goal: given your current
          CGPA and completed credits, plus your target CGPA and remaining
          credits, it solves for the average grade point you&apos;d need to
          earn across every remaining credit hour to land exactly on target.
        </p>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Required GPA = (Target × Total credits − Current CGPA × Completed credits) ÷ Remaining credits
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
