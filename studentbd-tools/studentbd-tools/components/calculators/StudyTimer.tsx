"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Phase = "study" | "break";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function StudyTimer() {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [phase, setPhase] = useState<Phase>("study");
  const [secondsLeft, setSecondsLeft] = useState(studyMinutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextPhase: Phase = phase === "study" ? "break" : "study";
          setPhase(nextPhase);
          return (nextPhase === "study" ? studyMinutes : breakMinutes) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase, studyMinutes, breakMinutes]);

  const handleDurationChange = (which: Phase, minutes: number) => {
    const safeMinutes = Math.max(1, Math.min(180, minutes));
    if (which === "study") {
      setStudyMinutes(safeMinutes);
      if (phase === "study" && !running) setSecondsLeft(safeMinutes * 60);
    } else {
      setBreakMinutes(safeMinutes);
      if (phase === "break" && !running) setSecondsLeft(safeMinutes * 60);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setPhase("study");
    setSecondsLeft(studyMinutes * 60);
  };

  const totalForPhase = (phase === "study" ? studyMinutes : breakMinutes) * 60;
  const progress = totalForPhase > 0 ? 1 - secondsLeft / totalForPhase : 0;

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 sm:p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[220px_1fr] sm:items-center">
        <div className="flex flex-col items-center">
          <div
            role="timer"
            aria-live="polite"
            className="relative flex h-44 w-44 items-center justify-center rounded-full border-8 border-navy-200 dark:border-navy-800"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${
                  phase === "study" ? "#c9922b" : "#243b53"
                } ${progress * 360}deg, transparent 0deg)`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 8px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 8px))",
              }}
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="font-display text-3xl font-semibold text-navy-900 dark:text-white">
                {formatTime(secondsLeft)}
              </p>
              <p className="mt-1 text-xs font-medium uppercase text-navy-600 dark:text-navy-400">
                {phase === "study" ? "Study" : "Break"}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
            >
              {running ? (
                <>
                  <Pause className="h-4 w-4" aria-hidden="true" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" aria-hidden="true" /> Start
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-navy-400 dark:hover:bg-navy-800"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="study-minutes" className="text-sm font-medium text-navy-700 dark:text-navy-200">
              Study minutes
            </label>
            <input
              id="study-minutes"
              type="number"
              min={1}
              max={180}
              value={studyMinutes}
              onChange={(e) => handleDurationChange("study", Number(e.target.value))}
              className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="break-minutes" className="text-sm font-medium text-navy-700 dark:text-navy-200">
              Break minutes
            </label>
            <input
              id="break-minutes"
              type="number"
              min={1}
              max={180}
              value={breakMinutes}
              onChange={(e) => handleDurationChange("break", Number(e.target.value))}
              className="mt-1.5 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
            />
          </div>
          <p className="col-span-2 text-sm text-navy-600 dark:text-navy-400">
            Defaults follow the classic 25-minute study / 5-minute break
            Pomodoro pattern. Change the minutes above to fit your own
            routine.
          </p>
        </div>
      </div>
    </div>
  );
}
