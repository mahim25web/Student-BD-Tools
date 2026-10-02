import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/weighted-grade-calculator";

export const metadata: Metadata = {
  title: "Weighted Grade Calculator — Final Course Grade",
  description:
    "Compute your final course grade from the percentage weights of your exams, quizzes, and assignments.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Weighted Grade Calculator",
    description: "Compute your final course grade from assignment, quiz, and exam weights.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "What if my weights don't add up to 100%?",
    answer:
      "The calculator still works — it normalizes by dividing by your total weight instead of assuming 100, and shows a note so you know your weights didn't match your syllabus exactly.",
  },
  {
    question: "Can I use this before all my grades are in?",
    answer:
      "Yes — leave out components you haven't been graded on yet, or use the Target CGPA-style approach by entering a hypothetical score for a remaining component to see how it would affect your final grade.",
  },
];

export default function WeightedGradeCalculatorPage() {
  return (
    <CalculatorLayout
      title="Weighted Grade Calculator"
      description="Compute your final course grade based on assigned percentage weights for exams, quizzes, and assignments."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Weighted Grade Calculator" },
      ]}
      related={relatedTools("weighted-grade-calculator")}
    >
      <WeightedGradeCalculator />

      <ContentSection title="How is this calculated?">
        <p>
          Each component&apos;s score is multiplied by its weight, these
          are added together, then divided by the total weight. This gives
          your final grade as a single percentage, which is then mapped to
          an approximate letter grade.
        </p>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Final grade = Σ (Weight × Score) ÷ Σ Weight
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
