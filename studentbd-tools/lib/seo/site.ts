export const SITE = {
  name: "StudentBD Tools",
  tagline: "Free tools for every Bangladeshi student.",
  description:
    "Free calculators and study tools for Bangladeshi SSC, HSC and university students — GPA, CGPA, percentage, age and more.",
  // Update this once the project has a real production domain.
  url: "https://studentbdtools.vercel.app",
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
