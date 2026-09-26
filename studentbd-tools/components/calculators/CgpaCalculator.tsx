"use client";

import { useEffect, useState } from "react";
import { Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { calculateCgpa, type CgpaSummary, type CourseInput } from "@/lib/calculators/cgpa";
import { CGPA_SCALES, DEFAULT_CGPA_SCALE_ID, getScaleById } from "@/lib/grading/cgpaScale";
import { readStorage, writeStorage } from "@/lib/utils/storage";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `course-${idCounter}-${Date.now()}`;
}

const STORAGE_KEY = "studentbd-cgpa-saved";

function makeDefaultCourses(): CourseInput[] {
  return [
    { id: nextId(), name: "", credit: "3", letter: "" },
    { id: nextId(), name: "", credit: "3", letter: "" },
    { id: nextId(), name: "", credit: "3", letter: "" },
  ];
}

interface SavedCalculation {
  courses: CourseInput[];
  scaleId: string;
  isSemester: boolean;
  savedAt: string;
}

export function CgpaCalculator() {
  const [courses, setCourses] = useState<CourseInput[]>(makeDefaultCourses);
  const [scaleId, setScaleId] = useState(DEFAULT_CGPA_SCALE_ID);
  const [isSemester, setIsSemester] = useState(false);
  const [summary, setSummary] = useState<CgpaSummary | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const scale = getScaleById(scaleId);

  useEffect(() => {
    const saved = readStorage<SavedCalculation | null>(STORAGE_KEY, null);
    setHasSaved(Boolean(saved));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timeout);
  }, [toast]);

  const updateCourse = (id: string, patch: Partial<CourseInput>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, { id: nextId(), name: "", credit: "3", letter: "" }]);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    setCourses(makeDefaultCourses());
    setSummary(null);
    setErrors([]);
  };

  const handleCalculate = () => {
    if (courses.length === 0) {
      setErrors(["Please add at least one course."]);
      setSummary(null);
      return;
    }
    const result = calculateCgpa(courses, scale);
    if (!result.ok) {
      setErrors(result.errors);
      setSummary(null);
      return;
    }
    setErrors([]);
    setSummary(result.data);
  };

  const handleSave = () => {
    const ok = writeStorage<SavedCalculation>(STORAGE_KEY, {
      courses,
      scaleId,
      isSemester,
      savedAt: new Date().toISOString(),
    });
    if (ok) {
      setHasSaved(true);
      setToast("Calculation saved to this browser.");
    } else {
      setToast("Could not save — storage may be unavailable.");
    }
  };

  const handleLoad = () => {
    const saved = readStorage<SavedCalculation | null>(STORAGE_KEY, null);
    if (!saved) {
      setToast("No saved calculation found.");
      return;
    }
    setCourses(saved.courses);
    setScaleId(saved.scaleId);
    setIsSemester(saved.isSemester);
    setSummary(null);
    setToast("Saved calculation loaded.");
  };

  const resultLabel = isSemester ? "Semester GPA" : "CGPA";

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
          Add your courses
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="scale-select" className="text-xs font-medium text-navy-500 dark:text-navy-400">
            Grade scale
          </label>
          <select
            id="scale-select"
            value={scaleId}
            onChange={(e) => setScaleId(e.target.value)}
            className="rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-sm text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          >
            {CGPA_SCALES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-4 inline-flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
        <input
          type="checkbox"
          checked={isSemester}
          onChange={(e) => setIsSemester(e.target.checked)}
          className="h-4 w-4 rounded border-navy-300 text-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-600"
        />
        These courses are all from a single semester (label result as Semester GPA)
      </label>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-navy-500 dark:border-navy-800 dark:text-navy-400">
              <th scope="col" className="py-2 pr-3 font-medium">Course name</th>
              <th scope="col" className="py-2 pr-3 font-medium">Credit</th>
              <th scope="col" className="py-2 pr-3 font-medium">Grade</th>
              <th scope="col" className="py-2 pr-3 font-medium">Quality points</th>
              <th scope="col" className="py-2 font-medium sr-only">Remove</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              const rowResult = summary?.results.find((r) => r.id === course.id);
              return (
                <tr key={course.id} className="border-b border-navy-50 align-top dark:border-navy-800/60">
                  <td className="py-2 pr-3">
                    <label htmlFor={`course-name-${course.id}`} className="sr-only">
                      Course name {index + 1}
                    </label>
                    <input
                      id={`course-name-${course.id}`}
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                      placeholder={`e.g. CSE10${index + 1}`}
                      className="w-full min-w-[140px] rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label htmlFor={`course-credit-${course.id}`} className="sr-only">
                      Credit for {course.name || `course ${index + 1}`}
                    </label>
                    <input
                      id={`course-credit-${course.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.5}
                      value={course.credit}
                      onChange={(e) => updateCourse(course.id, { credit: e.target.value })}
                      className="w-20 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label htmlFor={`course-grade-${course.id}`} className="sr-only">
                      Grade for {course.name || `course ${index + 1}`}
                    </label>
                    <select
                      id={`course-grade-${course.id}`}
                      value={course.letter}
                      onChange={(e) => updateCourse(course.id, { letter: e.target.value })}
                      aria-invalid={Boolean(rowResult?.error)}
                      className="w-24 rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
                    >
                      <option value="">Select</option>
                      {scale.grades.map((g) => (
                        <option key={g.letter} value={g.letter}>
                          {g.letter} ({g.point.toFixed(2)})
                        </option>
                      ))}
                    </select>
                    {rowResult?.error && (
                      <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {rowResult.error}
                      </p>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-navy-700 dark:text-navy-300">
                    {rowResult ? rowResult.qualityPoints.toFixed(2) : "-"}
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                      aria-label={`Remove ${course.name || `course ${index + 1}`}`}
                      className="rounded-md p-1.5 text-navy-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {summary && (
            <tfoot>
              <tr className="text-sm font-medium text-navy-900 dark:text-white">
                <td className="pt-3">Total</td>
                <td className="pt-3">{summary.totalCredits}</td>
                <td className="pt-3" />
                <td className="pt-3">{summary.totalQualityPoints}</td>
                <td className="pt-3" />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addCourse}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Add course
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
        >
          Calculate {resultLabel}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
        </button>

        <span className="mx-1 hidden h-6 w-px bg-navy-200 dark:bg-navy-700 sm:inline-block" aria-hidden="true" />

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          <Save className="h-4 w-4" aria-hidden="true" /> Save locally
        </button>
        <button
          type="button"
          onClick={handleLoad}
          disabled={!hasSaved}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          <Upload className="h-4 w-4" aria-hidden="true" /> Load saved
        </button>
      </div>

      {toast && (
        <p role="status" className="mt-3 text-sm text-navy-600 dark:text-navy-300">
          {toast}
        </p>
      )}

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((err) => (
            <li key={err} role="alert">{err}</li>
          ))}
        </ul>
      )}

      {summary && summary.cgpa !== null && (
        <div className="mt-6 max-w-xs">
          <ResultCard
            label={`Your ${resultLabel}`}
            value={summary.cgpa.toFixed(2)}
            helpText={`Based on ${summary.totalCredits} total credit hours on the ${scale.label}.`}
            copyValue={summary.cgpa.toFixed(2)}
          />
        </div>
      )}
    </div>
  );
}
