import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/percentage-calculator";

export const metadata: Metadata = {
  title: "Percentage Calculator — Marks to Percentage",
  description:
    "Calculate percentage from obtained and total marks instantly. Simple, accurate, and works for any exam or assignment.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Percentage Calculator",
    description: "Calculate percentage from obtained and total marks instantly.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "What is the formula for percentage?",
    answer:
      "Percentage = (Obtained marks ÷ Total marks) × 100. This calculator applies that formula directly to whatever numbers you enter.",
  },
  {
    question: "Can obtained marks be more than total marks?",
    answer:
      "Not with this calculator — it treats total marks as the maximum possible, so obtained marks are expected to be equal to or less than the total.",
  },
  {
    question: "What if I have marks from multiple subjects?",
    answer:
      "Use the Marks Calculator instead — it's built for entering several subjects at once and gives you an overall and average percentage.",
  },
];

export default function PercentageCalculatorPage() {
  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentage from obtained and total marks."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Percentage Calculator" },
      ]}
      related={relatedTools("percentage-calculator")}
    >
      <PercentageCalculator />

      <ContentSection title="How is percentage calculated?">
        <p>
          Percentage compares the marks you obtained against the total
          marks possible, expressed out of 100. Divide obtained marks by
          total marks, then multiply by 100.
        </p>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Percentage = (Obtained ÷ Total) × 100
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>
          If you scored 450 marks out of a total of 500, your percentage is
          (450 ÷ 500) × 100 = 90%.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
