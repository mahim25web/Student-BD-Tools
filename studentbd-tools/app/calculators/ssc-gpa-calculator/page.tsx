import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { BdGpaCalculator } from "@/components/calculators/BdGpaCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/ssc-gpa-calculator";

export const metadata: Metadata = {
  title: "SSC GPA Calculator (Bangladesh) — Free & Instant",
  description:
    "Calculate your SSC GPA using the Bangladesh education board grading scale. Enter your subject marks and get your GPA instantly, with 4th-subject support.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "SSC GPA Calculator (Bangladesh)",
    description:
      "Calculate your SSC GPA instantly using the Bangladesh education board grading scale.",
    url: absoluteUrl(PATH),
  },
};

const DEFAULT_SUBJECTS = [
  "Bangla",
  "English",
  "Mathematics",
  "Religion & Moral Education",
  "Science",
  "Bangladesh & Global Studies",
  "ICT",
  "4th Subject (optional)",
];

const FAQ_ITEMS = [
  {
    question: "How is SSC GPA calculated in Bangladesh?",
    answer:
      "Each subject's marks (0–100) are converted into a grade point using the national grading scale. The grade points of your compulsory subjects are averaged to get your GPA. If you sat for a 4th (additional) subject, only the portion of its grade point above 2.0 is added as bonus — it does not count toward the number of subjects being averaged.",
  },
  {
    question: "What happens if I fail a subject?",
    answer:
      "If any compulsory subject receives an F grade (below 33 marks), the overall SSC result is recorded as a fail and the GPA is shown as 0.00, matching how education boards report results.",
  },
  {
    question: "Can the 4th subject lower my GPA?",
    answer:
      "No. The 4th/additional subject can only add to your GPA if its grade point is above 2.0. If it scores 2.0 or below, it simply contributes nothing, rather than pulling your average down.",
  },
  {
    question: "Is this calculator accurate for every board and year?",
    answer:
      "This calculator uses the standard Bangladesh SSC grading scale and the widely-used GPA formula. Specific rules can occasionally be adjusted by boards or for a particular exam year, so always confirm the official rule for your exam year with your board.",
  },
];

export default function SscGpaCalculatorPage() {
  return (
    <CalculatorLayout
      title="SSC GPA Calculator"
      description="Calculate your SSC GPA using Bangladesh grading rules. Enter marks for each subject to get your grade and overall GPA instantly."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "SSC GPA Calculator" },
      ]}
      disclaimer="Rules may vary by education board or academic year. Please verify official requirements with your board."
      related={relatedTools("ssc-gpa-calculator")}
    >
      <BdGpaCalculator examLabel="SSC" defaultSubjectNames={DEFAULT_SUBJECTS} />

      <ContentSection title="How is SSC GPA calculated?">
        <p>
          Every subject&apos;s marks are converted to a letter grade and a
          grade point using the national grading scale (shown below). Your
          GPA is the average grade point of your compulsory subjects. If you
          took a 4th/additional subject, only the grade point above 2.0 is
          added on top — it can help your GPA but never lowers it.
        </p>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-navy-500 dark:border-navy-800 dark:text-navy-400">
                <th scope="col" className="py-2 pr-4 font-medium">Marks range</th>
                <th scope="col" className="py-2 pr-4 font-medium">Letter grade</th>
                <th scope="col" className="py-2 font-medium">Grade point</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["80 – 100", "A+", "5.00"],
                ["70 – 79", "A", "4.00"],
                ["60 – 69", "A-", "3.50"],
                ["50 – 59", "B", "3.00"],
                ["40 – 49", "C", "2.00"],
                ["33 – 39", "D", "1.00"],
                ["0 – 32", "F", "0.00"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-navy-50 dark:border-navy-800/60">
                  <td className="py-2 pr-4">{row[0]}</td>
                  <td className="py-2 pr-4 font-medium text-navy-900 dark:text-white">{row[1]}</td>
                  <td className="py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          GPA = (Sum of grade points of compulsory subjects + 4th subject
          bonus) ÷ Number of compulsory subjects
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>
          Suppose a student scores grade points of 5.00, 4.00, 5.00, 3.50,
          4.00, 5.00, and 4.00 across seven compulsory subjects, and a 4th
          subject grade point of 4.00.
        </p>
        <p>
          Compulsory sum = 30.50. The 4th subject bonus is 4.00 − 2.00 =
          2.00. GPA = (30.50 + 2.00) ÷ 7 = 4.64.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
