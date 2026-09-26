// Bangladesh SSC / HSC grading scale.
//
// This is the standard letter-grade / grade-point scale used by the
// Bangladesh Education Boards for SSC and HSC examinations. Boards and
// academic years can adjust pass marks or grading details, so this is
// provided as a reference scale — students should confirm the exact rule
// for their board and year with their board's official notice.

export interface GradeBand {
  min: number; // inclusive
  max: number; // inclusive
  letter: string;
  point: number;
}

// Same scale is used for both SSC and HSC in Bangladesh.
export const BD_GRADE_SCALE: GradeBand[] = [
  { min: 80, max: 100, letter: "A+", point: 5.0 },
  { min: 70, max: 79, letter: "A", point: 4.0 },
  { min: 60, max: 69, letter: "A-", point: 3.5 },
  { min: 50, max: 59, letter: "B", point: 3.0 },
  { min: 40, max: 49, letter: "C", point: 2.0 },
  { min: 33, max: 39, letter: "D", point: 1.0 },
  { min: 0, max: 32, letter: "F", point: 0.0 },
];

export function marksToGrade(marks: number): GradeBand | null {
  if (Number.isNaN(marks) || marks < 0 || marks > 100) return null;
  return (
    BD_GRADE_SCALE.find((band) => marks >= band.min && marks <= band.max) ??
    null
  );
}

export interface SubjectInput {
  id: string;
  name: string;
  marks: string; // raw string from the input field
  isOptional?: boolean; // true for the 4th / additional subject
}

export interface SubjectResult {
  id: string;
  name: string;
  marks: number;
  letter: string;
  point: number;
  isOptional?: boolean;
  error?: string;
}

export interface GpaOutcome {
  results: SubjectResult[];
  gpa: number | null;
  failed: boolean;
  errors: string[];
}

/**
 * Calculates GPA using the widely-used Bangladesh board method:
 *  - Every compulsory/core subject's grade point is summed and divided by
 *    the number of those subjects.
 *  - The 4th/additional subject does NOT count toward the subject count.
 *    Instead, only the portion of its grade point ABOVE 2.0 is added to the
 *    numerator (extra credit). If its point is 2.0 or below, it contributes
 *    nothing (and cannot lower the GPA).
 *  - If any compulsory subject is an F, the overall result is a fail and
 *    GPA is reported as 0.00, matching board practice.
 *
 * This mirrors the calculation method commonly published by Bangladeshi
 * education boards, but boards/years can vary — always confirm official
 * rules for your exact exam year.
 */
export function calculateBdGpa(subjects: SubjectInput[]): GpaOutcome {
  const errors: string[] = [];
  const results: SubjectResult[] = [];

  const coreSubjects = subjects.filter((s) => !s.isOptional);
  const optionalSubjects = subjects.filter((s) => s.isOptional);

  if (coreSubjects.length === 0) {
    errors.push("Please add at least one subject.");
  }

  let coreSum = 0;
  let hasFail = false;
  let hasError = false;

  for (const subject of subjects) {
    const trimmedName = subject.name.trim() || "Untitled subject";
    const marksNum = Number(subject.marks);

    if (subject.marks.trim() === "") {
      results.push({
        id: subject.id,
        name: trimmedName,
        marks: NaN,
        letter: "-",
        point: 0,
        isOptional: subject.isOptional,
        error: "Please enter marks.",
      });
      hasError = true;
      continue;
    }

    if (Number.isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      results.push({
        id: subject.id,
        name: trimmedName,
        marks: marksNum,
        letter: "-",
        point: 0,
        isOptional: subject.isOptional,
        error: "Enter a valid mark between 0 and 100.",
      });
      hasError = true;
      continue;
    }

    const band = marksToGrade(marksNum);
    if (!band) {
      results.push({
        id: subject.id,
        name: trimmedName,
        marks: marksNum,
        letter: "-",
        point: 0,
        isOptional: subject.isOptional,
        error: "Could not determine a grade for this mark.",
      });
      hasError = true;
      continue;
    }

    results.push({
      id: subject.id,
      name: trimmedName,
      marks: marksNum,
      letter: band.letter,
      point: band.point,
      isOptional: subject.isOptional,
    });

    if (!subject.isOptional) {
      coreSum += band.point;
      if (band.point === 0) hasFail = true;
    }
  }

  if (hasError) {
    return { results, gpa: null, failed: false, errors };
  }

  if (coreSubjects.length === 0) {
    return { results, gpa: null, failed: false, errors };
  }

  let bonus = 0;
  for (const opt of optionalSubjects) {
    const marksNum = Number(opt.marks);
    const band = marksToGrade(marksNum);
    if (band && band.point > 2.0) {
      bonus += band.point - 2.0;
    }
  }

  if (hasFail) {
    return { results, gpa: 0, failed: true, errors };
  }

  const gpa = (coreSum + bonus) / coreSubjects.length;
  const clamped = Math.min(5, Math.max(0, gpa));

  return {
    results,
    gpa: Math.round(clamped * 100) / 100,
    failed: false,
    errors,
  };
}
