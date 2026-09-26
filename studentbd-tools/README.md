# StudentBD Tools

Free calculators and study tools for Bangladeshi SSC, HSC, and university
students — GPA, CGPA, percentage, age, marks, and more.

Built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## 1. Install

Requires Node.js 18.18 or later.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 3. Build for production

```bash
npm run build
npm run start
```

`npm run build` will also run type-checking and linting — fix any reported
errors before deploying.

## 4. Deploy to Vercel

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the
   repository. Vercel auto-detects the Next.js framework — no extra
   configuration is required.
3. Before your first deploy, update `lib/seo/site.ts` with your real
   production domain (`SITE.url`), so metadata, the sitemap, and Open
   Graph tags point to the correct URL.
4. Click **Deploy**. Vercel's free tier is sufficient for this project —
   no database or paid services are required.

## 5. Project structure

```
app/                      Routes (Next.js App Router)
  calculators/             /calculators and each calculator's route
  study-tools/              /study-tools and each study tool's route
  about/, privacy/, terms/, contact/
  layout.tsx                Root layout: fonts, theme, header/footer
  sitemap.ts, robots.ts      Generated SEO files

components/                Reusable UI
  calculators/               Client components with each tool's interactive UI

lib/
  calculators/                Pure calculation functions (no UI)
  grading/                     Bangladesh grading scales (SSC/HSC, CGPA)
  utils/                        Small helpers (localStorage wrapper, cn)
  seo/                          Site config + the tools registry used for
                                 search, grids, and related-tool links
```

Calculation logic is kept separate from UI components (in `lib/`) so it
can be reused or unit tested independently of the interface.

## 6. How to add a new calculator

1. **Add the calculation logic** in `lib/calculators/` (or a new file) as
   a plain TypeScript function — no React involved.
2. **Build the interactive UI** as a client component in
   `components/calculators/YourCalculator.tsx` (`"use client"` at the
   top), following the pattern used by the existing calculators
   (inputs → validation → result via `<ResultCard />`).
3. **Register the tool** in `lib/seo/toolsData.ts` — add an entry to the
   `TOOLS` array with a `slug`, `name`, `href`, `category`, `icon` (see
   `components/ToolIcon.tsx` for available icon keys — add a new one
   there if needed), `shortDescription`, and `keywords`. This
   automatically adds it to the homepage grid, the `/calculators` search
   page, and any related-tools list.
4. **Create the route**: add `app/calculators/your-calculator/page.tsx`
   (or under `app/study-tools/` for a study tool). Use
   `CalculatorLayout` for the page chrome and `ContentSection` for the
   How it works / Formula / Example blocks, following any existing
   calculator page as a template. Export a `metadata` object (see
   section 7 below).

## 7. How to update SEO metadata

Each route file exports a `metadata` object (or `generateMetadata`
function) using Next.js's built-in Metadata API:

```ts
export const metadata: Metadata = {
  title: "Your Calculator Name",
  description: "One or two sentences describing the tool.",
  alternates: { canonical: absoluteUrl("/calculators/your-calculator") },
  openGraph: {
    title: "Your Calculator Name",
    description: "...",
    url: absoluteUrl("/calculators/your-calculator"),
  },
};
```

- The `title` is automatically wrapped in the `%s | StudentBD Tools`
  template set in `app/layout.tsx`.
- Update `lib/seo/site.ts` if the site name, tagline, or base description
  ever changes — it feeds the homepage title, default meta description,
  and JSON-LD `WebSite` schema.
- `app/sitemap.ts` is generated automatically from the `TOOLS` registry
  and a short list of static routes, so a newly-registered tool is
  included in the sitemap without any extra work.
- Structured data (`BreadcrumbList` on every page via `<Breadcrumbs />`,
  `FAQPage` via `<FAQ />`) is generated automatically wherever those
  components are used.

## 8. Notes on scope

- No external database is used. The only persisted data is stored in the
  visitor's own browser via `localStorage` (dark/light theme, the CGPA
  calculator's save/load feature, and saved exam countdowns).
- Grading scales (`lib/grading/bdGrading.ts`,
  `lib/grading/cgpaScale.ts`) reflect commonly-used Bangladesh SSC/HSC
  and university formulas. Official rules can vary by board, university,
  or academic year — this is called out in each calculator's disclaimer
  and should be verified before relying on results for anything formal.
- The interface is in English, but content strings are grouped by page
  rather than scattered inline, so Bangla (বাংলা) support can be added
  later without a large refactor.
