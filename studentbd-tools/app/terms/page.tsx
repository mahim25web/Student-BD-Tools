import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the free calculators and tools on StudentBD Tools.",
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">Last updated: 2026</p>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-navy-700 dark:text-navy-200">
        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Using this site
          </h2>
          <p className="mt-2">
            StudentBD Tools is provided free of charge for personal,
            non-commercial use. You&apos;re welcome to use any calculator or
            study tool as often as you like.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Accuracy of results
          </h2>
          <p className="mt-2">
            Calculators are built to follow standard, widely-used formulas
            and grading scales. However, official rules set by education
            boards, universities, or exam years can differ from the
            defaults used here. Results are provided for reference only —
            always confirm important figures against your institution&apos;s
            official documentation before relying on them for admissions,
            scholarships, or other formal decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            No warranty
          </h2>
          <p className="mt-2">
            This site is offered &ldquo;as is,&rdquo; without warranties of
            any kind. We work to keep every calculator accurate and
            functioning, but we can&apos;t guarantee the site will be free
            of errors or available without interruption.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Changes to these terms
          </h2>
          <p className="mt-2">
            These terms may be updated from time to time as the site
            changes. Continued use of the site after an update means you
            accept the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
