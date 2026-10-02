import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { ExpensePlanner } from "@/components/calculators/ExpensePlanner";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/expense-planner";

export const metadata: Metadata = {
  title: "Student Expense Planner — Monthly Budget Tracker",
  description:
    "Estimate, track, and manage your monthly living expenses, tuition, and overall student budget.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "Student Expense Planner",
    description: "Estimate and track your monthly living expenses and budget.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Is my budget data saved anywhere?",
    answer:
      "No — this planner recalculates in your browser each time and doesn't save your entries. For a version that remembers your numbers between visits, check back as the site adds more features.",
  },
  {
    question: "Can I add expense categories beyond rent, food, and transport?",
    answer:
      "Yes — rename any row or add new ones. The planner works with however many categories you need.",
  },
];

export default function ExpensePlannerPage() {
  return (
    <CalculatorLayout
      title="Student Expense Planner"
      description="Estimate, track, and manage your monthly living expenses, tuition, and overall budget."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Student Expense Planner" },
      ]}
      related={relatedTools("expense-planner")}
    >
      <ExpensePlanner />

      <ContentSection title="How it works">
        <p>
          Enter your monthly budget and list out your expense categories.
          The planner totals everything, shows what share of your spending
          each category takes up, and tells you how much room is left in
          your budget — or how far over you are.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
