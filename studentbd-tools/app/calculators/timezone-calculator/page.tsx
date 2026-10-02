import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { TimeZoneCalculator } from "@/components/calculators/TimeZoneCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/timezone-calculator";

export const metadata: Metadata = {
  title: "Time Zone Difference Calculator — Convert Meeting Times",
  description:
    "Compare time differences between global locations and convert meeting schedules to local time.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Time Zone Difference Calculator",
    description: "Compare time differences between cities and convert meeting times.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Does this account for daylight saving time?",
    answer:
      "No — it uses fixed, approximate standard-time offsets for each city. During daylight saving periods, some locations may be an hour off from what's shown here.",
  },
  {
    question: "Why does the converted time sometimes land on a different day?",
    answer:
      "Large time zone gaps can push the converted time past midnight in either direction — the result tells you whether it falls on the same, previous, or next calendar day.",
  },
];

export default function TimeZoneCalculatorPage() {
  return (
    <CalculatorLayout
      title="Time Zone Difference Calculator"
      description="Compare time differences between global locations and convert meeting schedules to local time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Time Zone Difference Calculator" },
      ]}
      disclaimer="Offsets are approximate standard-time values and don't account for daylight saving time."
      related={relatedTools("timezone-calculator")}
    >
      <TimeZoneCalculator />

      <ContentSection title="How it works">
        <p>
          Select a source and destination city and a time in the source
          city. The calculator applies the difference between each
          city&apos;s UTC offset to find the equivalent local time at the
          destination, and flags if that time falls on a different day.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
