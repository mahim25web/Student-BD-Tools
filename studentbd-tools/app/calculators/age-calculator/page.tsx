import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/age-calculator";

export const metadata: Metadata = {
  title: "Age Calculator — Exact Age in Years, Months & Days",
  description:
    "Calculate your exact age from your date of birth in years, months, and days, plus total days lived.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Age Calculator",
    description: "Calculate your exact age from your date of birth.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "How is age calculated?",
    answer:
      "The calculator finds the difference between your date of birth and the comparison date, breaking it down into full years, remaining months, and remaining days.",
  },
  {
    question: "Can I calculate my age on a future or past date, not just today?",
    answer:
      "Yes. Change the \u201cCalculate age on\u201d field to any date — useful for working out how old you'll be on an admission test date or exam day.",
  },
  {
    question: "Why does the day count sometimes look unexpected?",
    answer:
      "Months have different lengths, so when your birth day-of-month falls later than the comparison day-of-month, the calculator borrows days from the previous month — the same way you would count by hand.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age from your date of birth, in years, months, and days."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Age Calculator" },
      ]}
      related={relatedTools("age-calculator")}
    >
      <AgeCalculator />

      <ContentSection title="How is age calculated?">
        <p>
          Your date of birth is subtracted from the comparison date (by
          default, today). The result is broken into full years, then
          leftover months, then leftover days — the same way you&apos;d work
          it out on a calendar by hand.
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>
          Someone born on 15 March 2005, checking their age on 26 September
          2026, is 21 years, 6 months, and 11 days old — a total of 7,865
          days.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
