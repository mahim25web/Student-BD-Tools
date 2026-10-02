import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ContentSection } from "@/components/ContentSection";
import { FAQ } from "@/components/FAQ";
import { BmiCalculator } from "@/components/calculators/BmiCalculator";
import { relatedTools } from "@/lib/seo/toolsData";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/calculators/bmi-calculator";

export const metadata: Metadata = {
  title: "BMI Calculator — Body Mass Index & Weight Category",
  description:
    "Calculate your Body Mass Index (BMI) and see your weight category using your height and weight, in metric or imperial units.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: "BMI & Fitness Calculator",
    description: "Calculate your BMI and weight category from your height and weight.",
    url: absoluteUrl(PATH),
  },
};

const FAQ_ITEMS = [
  {
    question: "Is BMI an accurate health measure?",
    answer:
      "BMI is a quick screening tool, not a diagnosis — it doesn't account for muscle mass, body composition, age, or sex. Use it as a general reference and speak with a doctor for personalized health guidance.",
  },
  {
    question: "What's the formula for BMI?",
    answer:
      "Metric: weight in kilograms divided by height in meters squared. Imperial: 703 × weight in pounds, divided by height in inches squared.",
  },
];

export default function BmiCalculatorPage() {
  return (
    <CalculatorLayout
      title="BMI & Fitness Calculator"
      description="Determine your Body Mass Index (BMI) and see your weight category from your height and weight."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "BMI & Fitness Calculator" },
      ]}
      disclaimer="BMI is a general screening measure, not a medical diagnosis. Consult a healthcare professional for personal health advice."
      related={relatedTools("bmi-calculator")}
    >
      <BmiCalculator />

      <ContentSection title="Weight categories (WHO standard)">
        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-navy-200 text-left text-xs uppercase tracking-wide text-navy-600 dark:border-navy-800 dark:text-navy-400">
                <th scope="col" className="py-2 pr-4 font-medium">BMI range</th>
                <th scope="col" className="py-2 font-medium">Category</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Below 18.5", "Underweight"],
                ["18.5 – 24.9", "Normal weight"],
                ["25.0 – 29.9", "Overweight"],
                ["30.0 and above", "Obese"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-navy-50 dark:border-navy-800/60">
                  <td className="py-2 pr-4">{row[0]}</td>
                  <td className="py-2 font-medium text-navy-900 dark:text-white">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FAQ items={FAQ_ITEMS} />
      </ContentSection>
    </CalculatorLayout>
  );
}
