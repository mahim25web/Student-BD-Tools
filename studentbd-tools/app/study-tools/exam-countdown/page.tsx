import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { ExamCountdown } from "@/components/calculators/ExamCountdown";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/study-tools/exam-countdown";

export const metadata: Metadata = {
  title: "Exam Countdown — Days, Hours & Minutes Remaining",
  description:
    "Add your exams and see a live countdown of days, hours, and minutes remaining, saved right in your browser.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Exam Countdown",
    description:
      "Add your exams and see a live countdown of days, hours, and minutes remaining.",
    url: absoluteUrl(PATH),
  },
};

export default function ExamCountdownPage() {
  return (
    <CalculatorLayout
      title="Exam Countdown"
      description="Add an exam name and date to see exactly how much time is left."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Study Tools", href: "/study-tools" },
        { label: "Exam Countdown" },
      ]}
      related={relatedTools("exam-countdown")}
    >
      <ExamCountdown />

      <ContentSection title="How it works">
        <p>
          Every exam you add is saved in your browser&apos;s local storage,
          so your countdowns are still there the next time you visit — even
          after closing the tab. The countdown updates automatically while
          the page is open.
        </p>
      </ContentSection>
    </CalculatorLayout>
  );
}
