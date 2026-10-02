import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { InterestCalculator } from "@/components/calculators/InterestCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/interest-calculator";

export const metadata: Metadata = {
  title: "Interest Calculator — Simple & Compound Interest",
  description:
    "Compute simple and compound interest payouts over a specified timeframe and interest rate.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Interest Calculator",
    description: "Compute simple and compound interest over any timeframe.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "What's the difference between simple and compound interest?",
    answer:
      "Simple interest is calculated only on the original principal for the whole period. Compound interest is recalculated periodically on the growing balance (principal plus interest already earned), so it grows faster the more often it compounds.",
  },
  {
    question: "Which compounding frequency should I choose?",
    answer:
      "Match whatever your bank or financial product actually uses — this is usually stated in the account terms (annually, monthly, etc.). More frequent compounding results in slightly higher returns for the same stated rate.",
  },
];

export default function InterestCalculatorPage() {
  return (
    <CalculatorLayout
      title="Interest Calculator"
      description="Compute simple and compound interest payouts over a specified timeframe and interest rate."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Interest Calculator" },
      ]}
      related={relatedTools("interest-calculator")}
    >
      <InterestCalculator />

      <ContentSection title="Formulas">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Simple: Interest = P × r × t ÷ 100
          <br />
          Compound: A = P × (1 + r ÷ (100n))^(n×t)
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
