import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { AspectRatioCalculator } from "@/components/calculators/AspectRatioCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/aspect-ratio-calculator";

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator — Proportional Dimensions",
  description:
    "Compute proportional dimensions for web components, images, and videos based on aspect ratios.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Aspect Ratio Calculator",
    description: "Compute proportional dimensions for images, video, and web components.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "How is the simplified ratio found?",
    answer:
      "The calculator divides both width and height by their greatest common divisor — the same way 1920×1080 simplifies to the familiar 16:9.",
  },
  {
    question: "Can I compute both a new width and height at once?",
    answer:
      "Enter just one of the two — if you fill in both, the calculator will compute height from the width field and width from the height field independently, which may not match each other.",
  },
];

export default function AspectRatioCalculatorPage() {
  return (
    <CalculatorLayout
      title="Aspect Ratio Calculator"
      description="Compute proportional dimensions for web components, images, and videos based on aspect ratios."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Aspect Ratio Calculator" },
      ]}
      related={relatedTools("aspect-ratio-calculator")}
    >
      <AspectRatioCalculator />

      <ContentSection title="Example">
        <p>
          An image that&apos;s 1920×1080 simplifies to a 16:9 ratio. If you
          need the same image resized to 1280 wide, the matching height
          that keeps the proportions correct is 720.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
