"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { readStorage, writeStorage } from "@/lib/utils/storage";

interface ExamEntry {
  id: string;
  name: string;
  date: string; // ISO date, yyyy-mm-dd
}

const STORAGE_KEY = "studentbd-exam-countdowns";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `exam-${idCounter}-${Date.now()}`;
}

function getRemaining(dateStr: string) {
  const target = new Date(`${dateStr}T00:00:00`);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  if (Number.isNaN(diffMs)) return null;
  if (diffMs <= 0) return { passed: true, days: 0, hours: 0, minutes: 0 };
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { passed: false, days, hours, minutes };
}

export function ExamCountdown() {
  const [exams, setExams] = useState<ExamEntry[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    setExams(readStorage<ExamEntry[]>(STORAGE_KEY, []));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const persist = (next: ExamEntry[]) => {
    setExams(next);
    writeStorage(STORAGE_KEY, next);
  };

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Please enter an exam name.");
      return;
    }
    if (!date) {
      setError("Please select a valid date.");
      return;
    }
    setError(null);
    persist([...exams, { id: nextId(), name: name.trim(), date }]);
    setName("");
    setDate("");
  };

  const handleRemove = (id: string) => {
    persist(exams.filter((e) => e.id !== id));
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">
        Add an exam
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <label htmlFor="exam-name" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Exam name
          </label>
          <input
            id="exam-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HSC Physics 1st Paper"
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="exam-date" className="text-sm font-medium text-navy-700 dark:text-navy-200">
            Exam date
          </label>
          <input
            id="exam-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 sm:w-auto"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Add
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {exams.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-200 p-6 text-center text-sm text-navy-600 dark:border-navy-700 dark:text-navy-400">
            No exams added yet. Add one above to start your countdown.
          </p>
        ) : (
          exams
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((exam) => {
              const remaining = getRemaining(exam.date);
              return (
                <div
                  key={exam.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-gold-200 bg-gold-50 p-4 dark:border-gold-900/40 dark:bg-navy-800"
                >
                  <div>
                    <p className="font-medium text-navy-900 dark:text-white">{exam.name}</p>
                    <p className="text-xs text-navy-600 dark:text-navy-400">
                      {new Date(`${exam.date}T00:00:00`).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {remaining && (
                      <p className="mt-1 font-display text-xl font-semibold text-navy-900 dark:text-white">
                        {remaining.passed
                          ? "This exam date has passed"
                          : `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m left`}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(exam.id)}
                    aria-label={`Remove ${exam.name}`}
                    className="rounded-md p-2 text-navy-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
