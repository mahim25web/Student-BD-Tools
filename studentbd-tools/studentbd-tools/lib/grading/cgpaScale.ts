// University grading scales for the CGPA calculator.
//
// To add another university's scale, add a new entry to `CGPA_SCALES`
// below with its own `id`, `label`, and `grades` array. The calculator UI
// automatically lists whatever scales exist here.

export interface LetterGrade {
  letter: string;
  point: number;
}

export interface CgpaScale {
  id: string;
  label: string;
  grades: LetterGrade[];
}

export const CGPA_SCALES: CgpaScale[] = [
  {
    id: "standard-4",
    label: "Standard 4.00 scale",
    grades: [
      { letter: "A+", point: 4.0 },
      { letter: "A", point: 3.75 },
      { letter: "A-", point: 3.5 },
      { letter: "B+", point: 3.25 },
      { letter: "B", point: 3.0 },
      { letter: "B-", point: 2.75 },
      { letter: "C+", point: 2.5 },
      { letter: "C", point: 2.25 },
      { letter: "D", point: 2.0 },
      { letter: "F", point: 0.0 },
    ],
  },
];

export const DEFAULT_CGPA_SCALE_ID = CGPA_SCALES[0].id;

export function getScaleById(id: string): CgpaScale {
  return CGPA_SCALES.find((s) => s.id === id) ?? CGPA_SCALES[0];
}

export function pointForLetter(scale: CgpaScale, letter: string): number | null {
  const found = scale.grades.find((g) => g.letter === letter);
  return found ? found.point : null;
}
