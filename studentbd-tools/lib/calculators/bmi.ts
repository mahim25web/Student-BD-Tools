export type BmiUnit = "metric" | "imperial";

export type BmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
}

export type BmiInput =
  | { unit: "metric"; heightCm: number; weightKg: number }
  | { unit: "imperial"; heightIn: number; weightLb: number };

function categoryFor(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBmi(
  input: BmiInput
): { ok: true; data: BmiResult } | { ok: false; error: string } {
  let heightM: number;
  let weightKg: number;

  if (input.unit === "metric") {
    if (Number.isNaN(input.heightCm) || Number.isNaN(input.weightKg)) {
      return { ok: false, error: "Please enter a valid height and weight." };
    }
    if (input.heightCm <= 0 || input.weightKg <= 0) {
      return { ok: false, error: "Height and weight must be positive numbers." };
    }
    heightM = input.heightCm / 100;
    weightKg = input.weightKg;
  } else {
    if (Number.isNaN(input.heightIn) || Number.isNaN(input.weightLb)) {
      return { ok: false, error: "Please enter a valid height and weight." };
    }
    if (input.heightIn <= 0 || input.weightLb <= 0) {
      return { ok: false, error: "Height and weight must be positive numbers." };
    }
    heightM = (input.heightIn * 2.54) / 100;
    weightKg = input.weightLb * 0.45359237;
  }

  const bmi = weightKg / (heightM * heightM);
  return { ok: true, data: { bmi: Math.round(bmi * 10) / 10, category: categoryFor(bmi) } };
}
