// Pure calculation functions kept separate from UI components so they can
// be unit-tested and reused independently.

export interface PercentageResult {
  percentage: number;
}

export type PercentageError = "invalid" | "total-zero" | "exceeds-total";

export function calculatePercentage(
  obtained: number,
  total: number,
  allowExceed = false
): { ok: true; data: PercentageResult } | { ok: false; error: PercentageError } {
  if (Number.isNaN(obtained) || Number.isNaN(total)) {
    return { ok: false, error: "invalid" };
  }
  if (total <= 0) {
    return { ok: false, error: "total-zero" };
  }
  if (obtained < 0) {
    return { ok: false, error: "invalid" };
  }
  if (!allowExceed && obtained > total) {
    return { ok: false, error: "exceeds-total" };
  }
  const percentage = (obtained / total) * 100;
  return { ok: true, data: { percentage: Math.round(percentage * 100) / 100 } };
}

export function percentageToGrade(percentage: number): string {
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
}

export function calculateAge(
  dob: Date,
  onDate: Date
): { ok: true; data: AgeResult } | { ok: false; error: "invalid-date" | "dob-in-future" } {
  if (Number.isNaN(dob.getTime()) || Number.isNaN(onDate.getTime())) {
    return { ok: false, error: "invalid-date" };
  }
  if (dob.getTime() > onDate.getTime()) {
    return { ok: false, error: "dob-in-future" };
  }

  let years = onDate.getFullYear() - dob.getFullYear();
  let months = onDate.getMonth() - dob.getMonth();
  let days = onDate.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(onDate.getFullYear(), onDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((onDate.getTime() - dob.getTime()) / msPerDay);

  return {
    ok: true,
    data: {
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      totalMonths: years * 12 + months,
    },
  };
}

export interface MarksSubject {
  id: string;
  name: string;
  fullMarks: string;
  obtainedMarks: string;
}

export interface MarksSubjectResult {
  id: string;
  name: string;
  fullMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  error?: string;
}

export interface MarksSummary {
  results: MarksSubjectResult[];
  totalFullMarks: number;
  totalObtainedMarks: number;
  overallPercentage: number;
  averagePercentage: number;
  overallGrade: string;
}

export function calculateMarksSummary(
  subjects: MarksSubject[]
): { ok: true; data: MarksSummary } | { ok: false; errors: string[] } {
  const results: MarksSubjectResult[] = [];
  const errors: string[] = [];

  for (const subject of subjects) {
    const name = subject.name.trim() || "Untitled subject";
    const full = Number(subject.fullMarks);
    const obtained = Number(subject.obtainedMarks);

    if (subject.fullMarks.trim() === "" || subject.obtainedMarks.trim() === "") {
      results.push({
        id: subject.id,
        name,
        fullMarks: full,
        obtainedMarks: obtained,
        percentage: 0,
        grade: "-",
        error: "Please fill in both marks fields.",
      });
      errors.push(`${name}: please fill in all required fields.`);
      continue;
    }

    if (Number.isNaN(full) || full <= 0) {
      results.push({
        id: subject.id,
        name,
        fullMarks: full,
        obtainedMarks: obtained,
        percentage: 0,
        grade: "-",
        error: "Full marks must be a positive number.",
      });
      errors.push(`${name}: full marks must be a positive number.`);
      continue;
    }

    if (Number.isNaN(obtained) || obtained < 0) {
      results.push({
        id: subject.id,
        name,
        fullMarks: full,
        obtainedMarks: obtained,
        percentage: 0,
        grade: "-",
        error: "Please enter a valid mark.",
      });
      errors.push(`${name}: please enter a valid mark.`);
      continue;
    }

    if (obtained > full) {
      results.push({
        id: subject.id,
        name,
        fullMarks: full,
        obtainedMarks: obtained,
        percentage: 0,
        grade: "-",
        error: "Obtained marks cannot exceed full marks.",
      });
      errors.push(`${name}: obtained marks cannot exceed full marks.`);
      continue;
    }

    const percentage = Math.round((obtained / full) * 10000) / 100;
    results.push({
      id: subject.id,
      name,
      fullMarks: full,
      obtainedMarks: obtained,
      percentage,
      grade: percentageToGrade(percentage),
    });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const totalFullMarks = results.reduce((sum, r) => sum + r.fullMarks, 0);
  const totalObtainedMarks = results.reduce((sum, r) => sum + r.obtainedMarks, 0);
  const overallPercentage =
    totalFullMarks > 0
      ? Math.round((totalObtainedMarks / totalFullMarks) * 10000) / 100
      : 0;
  const averagePercentage =
    results.length > 0
      ? Math.round(
          (results.reduce((sum, r) => sum + r.percentage, 0) / results.length) * 100
        ) / 100
      : 0;

  return {
    ok: true,
    data: {
      results,
      totalFullMarks,
      totalObtainedMarks,
      overallPercentage,
      averagePercentage,
      overallGrade: percentageToGrade(overallPercentage),
    },
  };
}
