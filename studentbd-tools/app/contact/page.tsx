import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo/site";

const PATH = "/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the StudentBD Tools team.",
  alternates: { canonical: absoluteUrl(PATH) },
};

// Update this to the project owner's real inbox before launch.
const CONTACT_EMAIL = "mahimahmmad77@gmail.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 dark:text-white">
        Contact
      </h1>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-navy-700 dark:text-navy-200">
        Found a bug, spotted an incorrect formula, or have an idea for a new
        calculator? We&apos;d like to hear about it.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {CONTACT_EMAIL}
      </a>

      
    </div>
  );
}
