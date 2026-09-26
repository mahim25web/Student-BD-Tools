import Link from "next/link";
import { GraduationCap } from "lucide-react";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/calculators", label: "Calculators" },
      { href: "/study-tools", label: "Study Tools" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white dark:border-navy-800 dark:bg-navy-950">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display text-base font-semibold text-navy-900 dark:text-white">
                StudentBD Tools
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-navy-600 dark:text-navy-300">
              Free tools for every Bangladeshi student.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-navy-900 dark:text-white">
                {col.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-600 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-navy-100 pt-6 text-sm text-navy-500 dark:border-navy-800 dark:text-navy-400">
          © 2026 StudentBD Tools. All results are for reference — always
          verify official rules for your board, university, and academic
          year.
        </div>
      </div>
    </footer>
  );
}
