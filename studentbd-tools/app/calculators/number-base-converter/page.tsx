import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { NumberBaseConverter } from "@/components/calculators/NumberBaseConverter";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/number-base-converter";

export const metadata: Metadata = {
  title: "Number Base Converter — Binary, Octal, Decimal, Hex",
  description:
    "Convert numeric values seamlessly between binary, octal, decimal, and hexadecimal formats.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Number Base Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "What characters are valid for each base?",
    answer:
      "Binary uses 0–1, octal uses 0–7, decimal uses 0–9, and hexadecimal uses 0–9 plus A–F. The calculator validates your input against whichever base you select as the source.",
  },
  {
    question: "Can I convert from bases other than these four?",
    answer:
      "The input only offers binary, octal, decimal, and hexadecimal, but the underlying conversion supports any base from 2 to 36 if a developer wants to extend the dropdown.",
  },
];

export default function NumberBaseConverterPage() {
  return (
    <CalculatorLayout
      title="Number Base Converter"
      description="Convert numeric values seamlessly between binary, octal, decimal, and hexadecimal formats."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Number Base Converter" },
      ]}
      related={relatedTools("number-base-converter")}
    >
      <NumberBaseConverter />

      <ContentSection title="Example">
        <p>
          The decimal number 255 converts to 11111111 in binary, 377 in
          octal, and FF in hexadecimal.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
