export type ToolCategory = "Academic" | "University" | "General" | "Study";

export interface ToolMeta {
  slug: string;
  name: string;
  href: string;
  category: ToolCategory;
  icon:
    | "graduation-cap"
    | "school"
    | "calculator"
    | "percent"
    | "calendar-days"
    | "clipboard-list"
    | "timer"
    | "hourglass"
    | "alarm-clock";
  shortDescription: string;
  keywords: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "ssc-gpa-calculator",
    name: "SSC GPA Calculator",
    href: "/calculators/ssc-gpa-calculator",
    category: "Academic",
    icon: "graduation-cap",
    shortDescription:
      "Calculate your SSC GPA using Bangladesh grading rules.",
    keywords: ["ssc", "gpa", "grade", "board", "secondary"],
  },
  {
    slug: "hsc-gpa-calculator",
    name: "HSC GPA Calculator",
    href: "/calculators/hsc-gpa-calculator",
    category: "Academic",
    icon: "school",
    shortDescription:
      "Calculate your HSC GPA with subject and optional-subject support.",
    keywords: ["hsc", "gpa", "grade", "board", "higher secondary"],
  },
  {
    slug: "university-cgpa-calculator",
    name: "University CGPA Calculator",
    href: "/calculators/university-cgpa-calculator",
    category: "University",
    icon: "calculator",
    shortDescription:
      "Calculate your university CGPA using course credits and grade points.",
    keywords: ["cgpa", "university", "credit", "semester", "gpa"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    href: "/calculators/percentage-calculator",
    category: "General",
    icon: "percent",
    shortDescription: "Calculate percentage from obtained and total marks.",
    keywords: ["percentage", "marks", "percent"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    href: "/calculators/age-calculator",
    category: "General",
    icon: "calendar-days",
    shortDescription: "Calculate your exact age from your date of birth.",
    keywords: ["age", "birthday", "date of birth", "dob"],
  },
  {
    slug: "marks-calculator",
    name: "Marks Calculator",
    href: "/calculators/marks-calculator",
    category: "Academic",
    icon: "clipboard-list",
    shortDescription:
      "Calculate obtained marks, total marks, percentage and grade.",
    keywords: ["marks", "total", "average", "exam"],
  },
  {
    slug: "study-timer",
    name: "Study Timer",
    href: "/study-tools/study-timer",
    category: "Study",
    icon: "timer",
    shortDescription: "A customizable Pomodoro-style timer for focused study sessions.",
    keywords: ["pomodoro", "timer", "focus", "study"],
  },
  {
    slug: "exam-countdown",
    name: "Exam Countdown",
    href: "/study-tools/exam-countdown",
    category: "Study",
    icon: "alarm-clock",
    shortDescription: "Count down the days, hours and minutes to your exam.",
    keywords: ["exam", "countdown", "days left", "reminder"],
  },
  {
    slug: "study-hours",
    name: "Study Hours Calculator",
    href: "/study-tools/study-hours",
    category: "Study",
    icon: "hourglass",
    shortDescription:
      "Work out your total study time between a start and end time, minus breaks.",
    keywords: ["study hours", "time tracker", "session length"],
  },
];

export const CALCULATOR_TOOLS = TOOLS.filter((t) => t.href.startsWith("/calculators"));
export const STUDY_TOOLS = TOOLS.filter((t) => t.href.startsWith("/study-tools"));

export function relatedTools(currentSlug: string, count = 3): ToolMeta[] {
  return TOOLS.filter((t) => t.slug !== currentSlug).slice(0, count);
}
