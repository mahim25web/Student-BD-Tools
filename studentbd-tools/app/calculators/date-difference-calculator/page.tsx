import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { DateDifferenceCalculator } from "@/components/DateDifferenceCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/date-difference-calculator";

export const metadata: Metadata = {
  title: "Date Difference Calculator — Days Between Two Dates",
  description:
    "Find the exact number of years, months, and days between any two dates, plus the total day count.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Date Difference Calculator",
    description: "Find the exact difference between any two dates, instantly.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Does the order of the two dates matter?",
    answer:
      "No. Enter the dates in either order — the calculator automatically treats the earlier date as the start and the later date as the end.",
  },
  {
    question: "How is the year/month/day breakdown calculated?",
    answer:
      "The calculator counts full years, then full months, then remaining days between the two dates, the same way you'd count by hand on a calendar. It also shows the total number of days, which is useful for things like visa applications or admission deadlines.",
  },
  {
    question: "Can I use this for deadlines or countdowns?",
    answer:
      "Yes — set one date to today and the other to your deadline to see exactly how much time is left. For a live, auto-updating countdown to a specific exam, try the Exam Countdown tool instead.",
  },
];

export default function DateDifferenceCalculatorPage() {
  return (
    <CalculatorLayout
      title="Date Difference Calculator"
      description="Find the exact number of years, months, and days between any two dates."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Date Difference Calculator" },
      ]}
      related={relatedTools("date-difference-calculator")}
    >
      <DateDifferenceCalculator />

      <ContentSection title="How is the date difference calculated?">
        <p>
          The calculator finds the gap between your two dates and breaks it
          down into full years, full months, and remaining days — plus the
          total number of days, weeks, and months for quick reference.
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>
          From 10 January 2023 to 26 September 2026 is 3 years, 8 months,
          and 16 days — a total of 1,355 days.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
