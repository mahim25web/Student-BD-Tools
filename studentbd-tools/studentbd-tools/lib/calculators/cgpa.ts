import { CgpaScale, pointForLetter } from "@/lib/grading/cgpaScale";

export interface CourseInput {
  id: string;
  name: string;
  credit: string;
  letter: string;
}

export interface CourseResult {
  id: string;
  name: string;
  credit: number;
  letter: string;
  point: number;
  qualityPoints: number;
  error?: string;
}

export interface CgpaSummary {
  results: CourseResult[];
  totalCredits: number;
  totalQualityPoints: number;
  cgpa: number | null;
}

export function calculateCgpa(
  courses: CourseInput[],
  scale: CgpaScale
): { ok: true; data: CgpaSummary } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const results: CourseResult[] = [];

  for (const course of courses) {
    const name = course.name.trim() || "Untitled course";
    const credit = Number(course.credit);

    if (course.credit.trim() === "") {
      results.push({
        id: course.id,
        name,
        credit: 0,
        letter: course.letter,
        point: 0,
        qualityPoints: 0,
        error: "Please enter a credit value.",
      });
      errors.push(`${name}: please enter a credit value.`);
      continue;
    }

    if (Number.isNaN(credit) || credit <= 0) {
      results.push({
        id: course.id,
        name,
        credit: 0,
        letter: course.letter,
        point: 0,
        qualityPoints: 0,
        error: "Credit must be a positive number.",
      });
      errors.push(`${name}: credit must be a positive number.`);
      continue;
    }

    const point = pointForLetter(scale, course.letter);
    if (point === null) {
      results.push({
        id: course.id,
        name,
        credit,
        letter: course.letter,
        point: 0,
        qualityPoints: 0,
        error: "Please select a grade.",
      });
      errors.push(`${name}: please select a grade.`);
      continue;
    }

    results.push({
      id: course.id,
      name,
      credit,
      letter: course.letter,
      point,
      qualityPoints: Math.round(credit * point * 100) / 100,
    });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const totalCredits = results.reduce((sum, r) => sum + r.credit, 0);
  const totalQualityPoints = results.reduce((sum, r) => sum + r.qualityPoints, 0);
  const cgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : null;

  return {
    ok: true,
    data: {
      results,
      totalCredits: Math.round(totalCredits * 100) / 100,
      totalQualityPoints: Math.round(totalQualityPoints * 100) / 100,
      cgpa: cgpa !== null ? Math.round(cgpa * 100) / 100 : null,
    },
  };
}
