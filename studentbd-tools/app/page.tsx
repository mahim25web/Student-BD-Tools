import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Smartphone } from "lucide-react";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CALCULATOR_TOOLS, STUDY_TOOLS } from "@/lib/seo/toolsData";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy-100 bg-navy-50/40 dark:border-navy-800 dark:bg-navy-900/40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight text-navy-900 dark:text-white sm:text-4xl lg:text-5xl">
              Free Tools for Bangladeshi Students
            </h1>
            <p className="mt-4 max-w-lg text-base text-navy-600 dark:text-navy-300 sm:text-lg">
              Calculate your GPA, CGPA, percentage, age, and more — quickly
              and accurately.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
              >
                Explore Calculators
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-lg border border-navy-200 px-5 py-3 text-sm font-medium text-navy-800 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-100 dark:hover:bg-navy-800"
              >
                View All Tools
              </Link>
            </div>
          </div>

          {/* CSS/icon-built illustration standing in for a hero image */}
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-navy-200 bg-white p-5 shadow-sm dark:border-navy-700 dark:bg-navy-900">
            <p className="text-xs font-medium uppercase tracking-wide text-navy-400 dark:text-navy-500">
              SSC Result Preview
            </p>
            <div className="mt-3 space-y-2">
              {[
                { name: "Bangla", grade: "A+" },
                { name: "English", grade: "A" },
                { name: "Mathematics", grade: "A+" },
                { name: "Physics", grade: "A-" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between rounded-lg bg-navy-50 px-3 py-2 text-sm dark:bg-navy-800"
                >
                  <span className="text-navy-700 dark:text-navy-200">{row.name}</span>
                  <span className="font-semibold text-navy-900 dark:text-white">{row.grade}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-navy-900 px-4 py-3 dark:bg-gold-500">
              <span className="text-sm font-medium text-white dark:text-navy-950">Overall GPA</span>
              <span className="font-display text-2xl font-bold text-white dark:text-navy-950">4.83</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular tools */}
      <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-white">
              Popular Tools
            </h2>
            <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">
              The calculators students use most.
            </p>
          </div>
          <Link
            href="/calculators"
            className="hidden text-sm font-medium text-navy-700 hover:underline dark:text-navy-200 sm:inline-flex"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATOR_TOOLS.map((tool) => (
            <CalculatorCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="border-y border-navy-100 bg-navy-50/40 dark:border-navy-800 dark:bg-navy-900/40">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: ShieldCheck,
              title: "Built for accuracy",
              body: "Every formula is documented on its calculator page, so you can check the working behind your result.",
            },
            {
              icon: Smartphone,
              title: "Works everywhere",
              body: "Designed mobile-first so it's just as fast on a phone in class as it is on a laptop at home.",
            },
            {
              icon: Clock,
              title: "No sign-up, no waiting",
              body: "Every tool works instantly in your browser — nothing to install, no account required.",
            },
          ].map((item) => (
            <div key={item.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Study tools teaser */}
      <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-white">
              Study Tools
            </h2>
            <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">
              Stay focused and on schedule.
            </p>
          </div>
          <Link
            href="/study-tools"
            className="hidden text-sm font-medium text-navy-700 hover:underline dark:text-navy-200 sm:inline-flex"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STUDY_TOOLS.map((tool) => (
            <CalculatorCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
