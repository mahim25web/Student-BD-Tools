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
    slug: "target-cgpa-calculator",
    name: "Target CGPA Calculator",
    href: "/calculators/target-cgpa-calculator",
    category: "University",
    icon: "school",
    shortDescription:
      "Find the GPA you need in remaining credits to reach your target overall CGPA.",
    keywords: ["target cgpa", "future gpa", "required gpa", "semester goal"],
  },
  {
    slug: "weighted-grade-calculator",
    name: "Weighted Grade Calculator",
    href: "/calculators/weighted-grade-calculator",
    category: "Academic",
    icon: "clipboard-list",
    shortDescription:
      "Compute your final course grade from assignment, quiz, and exam weights.",
    keywords: ["weighted grade", "final grade", "course grade", "marks weight"],
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
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    href: "/calculators/date-difference-calculator",
    category: "General",
    icon: "calendar-days",
    shortDescription: "Find the exact time between two dates in years, months, and days.",
    keywords: ["date difference", "days between dates", "date calculator", "time between"],
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
    slug: "attendance-calculator",
    name: "Attendance Calculator",
    href: "/calculators/attendance-calculator",
    category: "Academic",
    icon: "clipboard-list",
    shortDescription:
      "Track your current attendance and find the classes you must attend to reach your target.",
    keywords: ["attendance", "class attendance", "percent attendance", "required classes"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    href: "/calculators/bmi-calculator",
    category: "General",
    icon: "calculator",
    shortDescription: "Check your Body Mass Index from height and weight measurements.",
    keywords: ["bmi", "body mass index", "health", "weight"],
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    href: "/calculators/aspect-ratio-calculator",
    category: "General",
    icon: "calculator",
    shortDescription: "Find a simplified aspect ratio or compute a missing width or height.",
    keywords: ["aspect ratio", "width height", "image ratio", "screen size"],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    href: "/calculators/unit-converter",
    category: "General",
    icon: "calculator",
    shortDescription: "Convert values across length, mass, temperature, and digital storage units.",
    keywords: ["unit converter", "convert length", "temperature", "storage bytes"],
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    href: "/calculators/number-base-converter",
    category: "General",
    icon: "calculator",
    shortDescription: "Convert numbers between binary, octal, decimal, and hexadecimal bases.",
    keywords: ["binary", "hexadecimal", "base converter", "number system"],
  },
  {
    slug: "discount-tax-calculator",
    name: "Discount & Tax Calculator",
    href: "/calculators/discount-tax-calculator",
    category: "General",
    icon: "percent",
    shortDescription: "Calculate discounted prices, tax values, and final payable amounts.",
    keywords: ["discount", "tax", "price", "vat", "sale"],
  },
  {
    slug: "expense-planner",
    name: "Expense Planner",
    href: "/calculators/expense-planner",
    category: "General",
    icon: "calculator",
    shortDescription: "Plan monthly spending and compare your budget against your income.",
    keywords: ["expense planner", "budget", "monthly cost", "money planner"],
  },
  {
    slug: "interest-calculator",
    name: "Interest Calculator",
    href: "/calculators/interest-calculator",
    category: "General",
    icon: "percent",
    shortDescription: "Estimate simple or compound interest and total repayment values.",
    keywords: ["interest", "loan", "compound", "simple interest"],
  },
  {
    slug: "timezone-calculator",
    name: "Time Zone Calculator",
    href: "/calculators/timezone-calculator",
    category: "General",
    icon: "calendar-days",
    shortDescription: "Compare local times across cities and countries in different time zones.",
    keywords: ["timezone", "time difference", "world clock", "local time"],
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
