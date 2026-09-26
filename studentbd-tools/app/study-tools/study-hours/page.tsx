import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { StudyHours } from "@/components/calculators/StudyHours";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/study-tools/study-hours";

export const metadata: Metadata = {
  title: "Study Hours Calculator — Track Study Session Length",
  description:
    "Work out your total study time between a start and end time, minus any breaks.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Study Hours Calculator",
    description:
      "Work out your total study time between a start and end time, minus any breaks.",
    url: absoluteUrl(PATH),
  },
};

export default function StudyHoursPage() {
  return (
    <CalculatorLayout
      title="Study Hours Calculator"
      description="Enter a start time, end time, and break duration to see your total study time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Study Tools", href: "/study-tools" },
        { label: "Study Hours Calculator" },
      ]}
      related={relatedTools("study-hours")}
    >
      <StudyHours />

      <ContentSection title="How it works">
        <p>
          The calculator finds the time between your start and end times,
          then subtracts your break duration to give you the net study
          time. Sessions that cross midnight (for example, 10 PM to 1 AM)
          are handled correctly.
        </p>
      </ContentSection>
    </CalculatorLayout>
  );
}
