import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { CgpaCalculator } from "@/components/calculators/CgpaCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/university-cgpa-calculator";

export const metadata: Metadata = {
  title: "University CGPA Calculator — Credits & Grade Points",
  description:
    "Calculate your university CGPA from course credits and grades. Add unlimited courses, save your calculation locally, and reload it any time.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "University CGPA Calculator",
    description:
      "Calculate your university CGPA from course credits and grades, with local save/load support.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "How is CGPA calculated?",
    answer:
      "Each course's credit hours are multiplied by its grade point to get quality points. CGPA is the sum of all quality points divided by the sum of all credit hours across your courses.",
  },
  {
    question: "Where is my saved calculation stored?",
    answer:
      "Saved calculations are stored only in your own browser's local storage — nothing is sent to a server. Saving again overwrites the previous save, and it will remain until you clear your browser data.",
  },
  {
    question: "My university uses a different grading scale — what do I do?",
    answer:
      "The calculator's grade scale is defined in one configurable place in the code, so a developer can add your university's exact scale alongside the standard 4.00 scale already included.",
  },
  {
    question: "What's the difference between CGPA and semester GPA?",
    answer:
      "CGPA is your cumulative average across every course you've taken. If you only enter one semester's courses and turn on \u201csingle semester\u201d mode, the same formula gives you that semester's GPA instead.",
  },
];

export default function UniversityCgpaCalculatorPage() {
  return (
    <CalculatorLayout
      title="University CGPA Calculator"
      description="Calculate your university CGPA using course credits and grade points. Add as many courses as you need, then save your work for later."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "University CGPA Calculator" },
      ]}
      disclaimer="Grading scales vary between universities. Confirm your institution's official scale if it differs from the one used here."
      related={relatedTools("university-cgpa-calculator")}
    >
      <CgpaCalculator />

      <ContentSection title="How is CGPA calculated?">
        <p>
          For each course, multiply its credit hours by its grade point to
          get that course&apos;s quality points. Add up the quality points
          for every course, then divide by the total credit hours. The
          result is your CGPA, out of a maximum of 4.00 on the standard
          scale.
        </p>
      </ContentSection>

      <ContentSection title="Formula">
        <p className="rounded-lg bg-navy-50 px-4 py-3 font-mono text-sm text-navy-800 dark:bg-navy-800 dark:text-navy-100">
          CGPA = Σ (Credit × Grade Point) ÷ Σ Credit
        </p>
      </ContentSection>

      <ContentSection title="Example">
        <p>Consider three courses:</p>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-navy-500 dark:border-navy-800 dark:text-navy-400">
                <th scope="col" className="py-2 pr-4 font-medium">Course</th>
                <th scope="col" className="py-2 pr-4 font-medium">Credit</th>
                <th scope="col" className="py-2 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["CSE101", "3", "A (3.75)"],
                ["CSE102", "3", "A- (3.50)"],
                ["MAT101", "3", "B+ (3.25)"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-navy-50 dark:border-navy-800/60">
                  <td className="py-2 pr-4">{row[0]}</td>
                  <td className="py-2 pr-4">{row[1]}</td>
                  <td className="py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Quality points: (3×3.75) + (3×3.50) + (3×3.25) = 11.25 + 10.50 +
          9.75 = 31.50. Total credits = 9. CGPA = 31.50 ÷ 9 = 3.50.
        </p>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
