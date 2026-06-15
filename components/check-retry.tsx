"use client"

import type { QuizLevel } from "@/lib/quiz-levels"
import { BrandMark } from "./brand-mark"

export function CheckRetry({
  level,
  score,
  onRetry,
  onPickLevel,
  onHome,
}: {
  level: QuizLevel
  score: number
  onRetry: () => void
  onPickLevel: () => void
  onHome: () => void
}) {
  const needed = level.pass - score

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center text-cream"
      style={{
        backgroundColor: "#2f2f2d",
        backgroundImage:
          "radial-gradient(900px 520px at 50% -10%, rgba(217,119,87,.30) 0%, transparent 56%)",
      }}
    >
      <BrandMark className="mb-7 size-14" />
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-clay-bright">So close</div>
      <h1 className="mt-4 max-w-xl text-balance font-display text-4xl font-bold leading-tight md:text-5xl">
        {score}/{level.total} — almost there
      </h1>
      <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-cream/75">
        You needed {level.pass} to pass the {level.label.toLowerCase()} check{needed > 0 ? `, just ${needed} more` : ""}.
        No drama — give the guide section another read and run it again. The questions reshuffle nothing, so you can
        learn from the explanations and go again.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="rounded-full bg-clay px-7 py-3.5 font-sans text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-clay-bright"
        >
          Retake {level.label} check
        </button>
        <button
          onClick={onPickLevel}
          className="rounded-full border border-cream/20 px-7 py-3.5 font-sans text-sm font-bold text-cream/85 transition hover:border-clay hover:text-clay-bright"
        >
          Choose a different level
        </button>
        <button
          onClick={onHome}
          className="rounded-full border border-cream/20 px-7 py-3.5 font-sans text-sm font-bold text-cream/85 transition hover:border-cream/40"
        >
          Back to home
        </button>
      </div>
    </main>
  )
}
