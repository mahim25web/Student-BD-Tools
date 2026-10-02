import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { DiscountTaxCalculator } from "@/components/calculators/DiscountTaxCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/discount-tax-calculator";

export const metadata: Metadata = {
  title: "Discount & Tax Calculator — Final Price After VAT",
  description:
    "Calculate the final price after applying a percentage discount and VAT or local sales tax.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Discount & Tax Calculator",
    description: "Calculate final pricing after a percentage discount and tax.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "In what order are discount and tax applied?",
    answer:
      "The discount is applied first to get the discounted price, then tax is calculated on that discounted amount — the common order used by most retailers.",
  },
  {
    question: "Can I use this for VAT specifically?",
    answer:
      "Yes — just enter your local VAT rate in the tax field; the calculation is the same regardless of what the tax is called.",
  },
];

export default function DiscountTaxCalculatorPage() {
  return (
    <CalculatorLayout
      title="Discount & Tax Calculator"
      description="Calculate final pricing after applying a percentage discount, VAT, or local sales tax."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Discount & Tax Calculator" },
      ]}
      related={relatedTools("discount-tax-calculator")}
    >
      <DiscountTaxCalculator />

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          Final price = Price × (1 − Discount%) × (1 + Tax%)
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
