import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How StudentBD Tools handles data and what it stores in your browser.",
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">Last updated: 2026</p>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-navy-700 dark:text-navy-200">
        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            What information we collect
          </h2>
          <p className="mt-2">
            StudentBD Tools does not require an account and does not
            collect unnecessary personal information. The marks, dates, and
            other values you type into a calculator are used only to
            produce your result on that page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            What stays in your browser
          </h2>
          <p className="mt-2">
            A few tools — the University CGPA Calculator&apos;s save/load
            feature, the Exam Countdown, and your light/dark theme
            preference — use your browser&apos;s local storage to remember
            information between visits. This data stays on your own device
            and is not sent to us or to any third party. Clearing your
            browser data will remove it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Analytics and cookies
          </h2>
          <p className="mt-2">
            This site does not currently use tracking cookies or analytics
            that identify individual visitors. If that changes in the
            future, this page will be updated to describe what is collected
            and why.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Compliance
          </h2>
          <p className="mt-2">
            StudentBD Tools does not claim compliance with any specific data
            protection regulation (such as GDPR) at this time, since no
            personal data is collected or stored on our servers. If the
            site later introduces features that require server-side
            storage, this policy will be updated accordingly before that
            change takes effect.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy can be sent through the{" "}
            <a href="/contact" className="font-medium text-navy-900 underline dark:text-white">
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
