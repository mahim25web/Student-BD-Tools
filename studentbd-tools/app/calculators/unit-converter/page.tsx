import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { UnitConverter } from "@/components/calculators/UnitConverter";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/unit-converter";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Mass, Temperature & Storage",
  description:
    "Convert values across length, mass, temperature, and digital storage units, instantly.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Unit Converter",
    description: "Convert between length, mass, temperature, and storage units.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Does the storage converter use 1000 or 1024 as a base?",
    answer:
      "It uses 1024 (binary) for KB, MB, GB, and TB, matching how most operating systems display file and storage sizes.",
  },
  {
    question: "Why is temperature handled differently?",
    answer:
      "Unlike length or mass, Celsius, Fahrenheit, and Kelvin aren't related by a simple multiplier — they use their own conversion formulas, which this tool applies automatically.",
  },
];

export default function UnitConverterPage() {
  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert values across multiple standard units including length, mass, temperature, and storage size."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Unit Converter" },
      ]}
      related={relatedTools("unit-converter")}
    >
      <UnitConverter />

      <ContentSection title="How it works">
        <p>
          Pick a category, choose your starting and target units, and enter
          a value. Length, mass, and storage conversions scale by a fixed
          factor relative to a base unit; temperature uses the standard
          Celsius/Fahrenheit/Kelvin formulas instead.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
