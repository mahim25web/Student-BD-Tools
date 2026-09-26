import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { BdGpaCalculator } from "@/components/calculators/BdGpaCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/hsc-gpa-calculator";

export const metadata: Metadata = {
  title: "HSC GPA Calculator (Bangladesh) — Free & Instant",
  description:
    "Calculate your HSC GPA using the Bangladesh education board grading scale. Works for Science, Commerce, and Arts groups, with 4th-subject support.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "HSC GPA Calculator (Bangladesh)",
    description:
      "Calculate your HSC GPA instantly using the Bangladesh education board grading scale.",
    url: absoluteUrl(PATH),
  },
};

const DEFAULT_SUBJECTS = [
  "Bangla",
  "English",
  "ICT",
  "Subject 4",
  "Subject 5",
  "Subject 6",
  "4th Subject (optional)",
];

const FAQ_ITEMS = [
  {
    question: "Does this calculator work for Science, Commerce, and Arts?",
    answer:
      "Yes. The calculator doesn't assume a fixed subject list — rename each row to match your own subjects, whichever group you're in, and add or remove rows as needed.",
  },
  {
    question: "How does the 4th/additional subject work for HSC?",
    answer:
      "The same rule as SSC applies: your six compulsory subjects are averaged for GPA, and if you took a 4th subject, only the grade point above 2.0 is added as a bonus on top.",
  },
  {
    question: "What if I don't have a 4th subject?",
    answer:
      "Simply remove that row, or leave its checkbox unmarked and delete the row — the calculator will average whatever subjects you've entered as compulsory.",
  },
  {
    question: "Are these rules the same for every board and year?",
    answer:
      "This tool follows the standard, widely-used Bangladesh HSC grading scale and GPA formula. Boards or exam years can adjust specific details, so always verify official requirements for your academic year.",
  },
];

export default function HscGpaCalculatorPage() {
  return (
    <CalculatorLayout
      title="HSC GPA Calculator"
      description="Calculate your HSC GPA with subject and optional-subject support, following Bangladesh education board grading rules."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "HSC GPA Calculator" },
      ]}
      disclaimer="Rules may vary by education board or academic year. Please verify official requirements."
      related={relatedTools("hsc-gpa-calculator")}
    >
      <BdGpaCalculator examLabel="HSC" defaultSubjectNames={DEFAULT_SUBJECTS} />

      <ContentSection title="How is HSC GPA calculated?">
        <p>
          HSC uses the same national grading scale as SSC. Rename the
          default subject rows to match your own group (Science, Commerce,
          or Arts), enter your marks, and the calculator converts each into
          a letter grade and grade point before averaging them into your
          GPA.
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
          A Science-group student scores grade points of 5.00, 4.00, 4.00,
          3.50, 5.00, and 4.00 across six compulsory subjects, with a 4th
          subject grade point of 3.50.
        </p>
        <p>
          Compulsory sum = 25.50. The 4th subject bonus is 3.50 − 2.00 =
          1.50. GPA = (25.50 + 1.50) ÷ 6 = 4.50.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
