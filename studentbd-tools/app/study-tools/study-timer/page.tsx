import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { StudyTimer } from "@/components/calculators/StudyTimer";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/study-tools/study-timer";

export const metadata: Metadata = {
  title: "Study Timer — Pomodoro Timer for Students",
  description:
    "A free, customizable Pomodoro-style study timer with adjustable study and break durations.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Study Timer",
    description: "A free, customizable Pomodoro-style study timer.",
    url: absoluteUrl(PATH),
  },
};

export default function StudyTimerPage() {
  return (
    <CalculatorLayout
      title="Study Timer"
      description="A simple Pomodoro-style timer: study in focused bursts, then take a short break."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Study Tools", href: "/study-tools" },
        { label: "Study Timer" },
      ]}
      related={relatedTools("study-timer")}
    >
      <StudyTimer />

      <ContentSection title="How it works">
        <p>
          The timer alternates between a study period and a break period.
          The classic Pomodoro pattern is 25 minutes of study followed by a
          5-minute break, but you can set any durations that suit your own
          routine. When one period ends, the timer automatically switches to
          the other.
        </p>
      </ContentSection>
    </CalculatorLayout>
  );
}
