// Academic & Student Utilities — calculation logic kept separate from UI.

export interface TargetCgpaInput {
  currentCgpa: number;
  completedCredits: number;
  targetCgpa: number;
  remainingCredits: number;
  scaleMax: number;
}

export interface TargetCgpaResult {
  requiredGpa: number;
  alreadyAchieved: boolean;
  achievable: boolean;
}

export function calculateTargetCgpa(
  input: TargetCgpaInput
): { ok: true; data: TargetCgpaResult } | { ok: false; error: string } {
  const { currentCgpa, completedCredits, targetCgpa, remainingCredits, scaleMax } = input;

  if ([currentCgpa, completedCredits, targetCgpa, remainingCredits, scaleMax].some(Number.isNaN)) {
    return { ok: false, error: "Please fill in all fields with valid numbers." };
  }
  if (scaleMax <= 0) return { ok: false, error: "Scale maximum must be greater than 0." };
  if (completedCredits < 0) return { ok: false, error: "Completed credits cannot be negative." };
  if (remainingCredits <= 0) return { ok: false, error: "Remaining credits must be greater than 0." };
  if (currentCgpa < 0 || currentCgpa > scaleMax)
    return { ok: false, error: `Current CGPA must be between 0 and ${scaleMax}.` };
  if (targetCgpa < 0 || targetCgpa > scaleMax)
    return { ok: false, error: `Target CGPA must be between 0 and ${scaleMax}.` };

  const totalCredits = completedCredits + remainingCredits;
  const rawRequired =
    (targetCgpa * totalCredits - currentCgpa * completedCredits) / remainingCredits;
  const requiredGpa = Math.round(Math.max(0, rawRequired) * 100) / 100;

  return {
    ok: true,
    data: {
      requiredGpa,
      alreadyAchieved: rawRequired <= 0,
      achievable: rawRequired <= scaleMax,
    },
  };
}

export interface AttendanceInput {
  totalClasses: number;
  attendedClasses: number;
  targetPercent: number;
}

export interface AttendanceResult {
  currentPercent: number;
  status: "above" | "below" | "exact";
  classesNeeded: number | null; // null when not computable (e.g. target is 100%)
  classesCanSkip: number | null;
}

export function calculateAttendance(
  input: AttendanceInput
): { ok: true; data: AttendanceResult } | { ok: false; error: string } {
  const { totalClasses, attendedClasses, targetPercent } = input;

  if ([totalClasses, attendedClasses, targetPercent].some(Number.isNaN)) {
    return { ok: false, error: "Please fill in all fields with valid numbers." };
  }
  if (totalClasses <= 0) return { ok: false, error: "Total classes must be greater than 0." };
  if (attendedClasses < 0 || attendedClasses > totalClasses)
    return { ok: false, error: "Attended classes must be between 0 and total classes." };
  if (targetPercent <= 0 || targetPercent > 100)
    return { ok: false, error: "Target attendance must be between 1 and 100." };

  const currentPercent = Math.round((attendedClasses / totalClasses) * 10000) / 100;
  const target = targetPercent / 100;

  let status: AttendanceResult["status"] = "exact";
  if (currentPercent > targetPercent) status = "above";
  else if (currentPercent < targetPercent) status = "below";

  let classesNeeded: number | null = null;
  let classesCanSkip: number | null = null;

  if (status === "below") {
    if (target >= 1) {
      classesNeeded = Number.POSITIVE_INFINITY; // 100% target can never be recovered once below
    } else {
      classesNeeded = Math.ceil((target * totalClasses - attendedClasses) / (1 - target));
    }
  } else if (status === "above") {
    classesCanSkip = Math.max(0, Math.floor(attendedClasses / target - totalClasses));
  }

  return {
    ok: true,
    data: { currentPercent, status, classesNeeded, classesCanSkip },
  };
}

export interface WeightedComponent {
  id: string;
  name: string;
  weight: string;
  score: string;
}

export interface WeightedComponentResult {
  id: string;
  name: string;
  weight: number;
  score: number;
  contribution: number;
  error?: string;
}

export interface WeightedGradeSummary {
  results: WeightedComponentResult[];
  totalWeight: number;
  finalScore: number;
  weightWarning: boolean;
}

export function calculateWeightedGrade(
  components: WeightedComponent[]
): { ok: true; data: WeightedGradeSummary } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const results: WeightedComponentResult[] = [];

  for (const c of components) {
    const name = c.name.trim() || "Untitled component";
    const weight = Number(c.weight);
    const score = Number(c.score);

    if (c.weight.trim() === "" || c.score.trim() === "") {
      results.push({ id: c.id, name, weight: 0, score: 0, contribution: 0, error: "Please fill in all required fields." });
      errors.push(`${name}: please fill in all required fields.`);
      continue;
    }
    if (Number.isNaN(weight) || weight < 0) {
      results.push({ id: c.id, name, weight: 0, score: 0, contribution: 0, error: "Weight must be zero or a positive number." });
      errors.push(`${name}: weight must be zero or a positive number.`);
      continue;
    }
    if (Number.isNaN(score) || score < 0 || score > 100) {
      results.push({ id: c.id, name, weight, score: 0, contribution: 0, error: "Score must be a valid mark between 0 and 100." });
      errors.push(`${name}: please enter a valid mark.`);
      continue;
    }

    results.push({ id: c.id, name, weight, score, contribution: Math.round(weight * score) / 100 });
  }

  if (errors.length > 0) return { ok: false, errors };

  const totalWeight = results.reduce((sum, r) => sum + r.weight, 0);
  if (totalWeight === 0) return { ok: false, errors: ["Total weight must be greater than 0."] };

  const weightedSum = results.reduce((sum, r) => sum + r.weight * r.score, 0);
  const finalScore = Math.round((weightedSum / totalWeight) * 100) / 100;

  return {
    ok: true,
    data: {
      results,
      totalWeight: Math.round(totalWeight * 100) / 100,
      finalScore,
      weightWarning: Math.abs(totalWeight - 100) > 0.01,
    },
  };
}
