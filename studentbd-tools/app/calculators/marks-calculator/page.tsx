import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { MarksCalculator } from "@/components/calculators/MarksCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/marks-calculator";

export const metadata: Metadata = {
  title: "Marks Calculator — Total, Percentage & Grade",
  description:
    "Calculate obtained marks, total marks, percentage, and grade across multiple subjects in one place.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Marks Calculator",
    description:
      "Calculate obtained marks, total marks, percentage and grade across multiple subjects.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "How is the overall percentage different from the average?",
    answer:
      "Overall percentage adds up all obtained marks and all full marks across subjects, then divides once. Average percentage instead averages each subject's own percentage, which weighs every subject equally regardless of how many marks it was out of.",
  },
  {
    question: "Can subjects have different full marks?",
    answer:
      "Yes — each subject row has its own full marks field, so you can mix a 100-mark subject with a 50-mark practical, for example.",
  },
  {
    question: "How are grades assigned here?",
    answer:
      "Each subject's percentage is mapped to a grade using the same A+ to F scale used for SSC/HSC results, purely as a general reference.",
  },
];

export default function MarksCalculatorPage() {
  return (
    <CalculatorLayout
      title="Marks Calculator"
      description="Calculate obtained marks, total marks, percentage and grade across multiple subjects."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Marks Calculator" },
      ]}
      related={relatedTools("marks-calculator")}
    >
      <MarksCalculator />

      <ContentSection title="How is this calculated?">
        <p>
          Each subject&apos;s obtained marks are checked against its full
          marks to get that subject&apos;s percentage and grade. The totals
          add every subject&apos;s obtained and full marks together for an
          overall percentage, and separately average each subject&apos;s
          percentage for a per-subject average.
        </p>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Overall % = (Σ Obtained marks ÷ Σ Full marks) × 100
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>
          Three subjects scored 78/100, 45/50, and 132/150. Total obtained =
          255, total full marks = 300. Overall percentage = (255 ÷ 300) ×
          100 = 85%.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
