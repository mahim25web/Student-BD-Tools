import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "StudentBD Tools is a free collection of academic and productivity tools for Bangladeshi students.",
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        About StudentBD Tools
      </h1>

      <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-700 dark:text-navy-200">
        <p>
          StudentBD Tools is a free collection of useful academic and
          productivity tools designed to make everyday calculations easier
          for Bangladeshi students — from SSC and HSC candidates to
          university students working through their CGPA.
        </p>
        <p>
          The idea is simple: the small calculations students need most
          often — GPA, CGPA, percentage, age, exam countdowns — should be
          available in one place, work correctly, and be free to use, with
          no sign-up required.
        </p>
        <p>
          Every calculator&apos;s working is shown on its own page, so you
          can see exactly how a result was reached rather than treating it
          as a black box. Where official rules can vary by board,
          university, or academic year, that&apos;s called out clearly so
          you know to double-check against your own institution&apos;s
          requirements.
        </p>
        <p>
          StudentBD Tools is an independent, ongoing project. New tools are
          added over time based on what students actually find useful.
        </p>
      </div>
    </div>
  );
}
