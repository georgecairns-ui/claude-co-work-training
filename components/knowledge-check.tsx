"use client"

import { useState } from "react"
import type { QuizLevel } from "@/lib/quiz-levels"

const LETTERS = ["A", "B", "C", "D"]

export function KnowledgeCheck({
  level,
  onFinish,
  onQuit,
}: {
  level: QuizLevel
  onFinish: (score: number) => void
  onQuit: () => void
}) {
  const questions = level.questions
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  const q = questions[index]
  const isLast = index === questions.length - 1
  const correct = selected === q.correct
  const pct = ((index + (revealed ? 1 : 0)) / questions.length) * 100

  function reveal() {
    if (selected === null || revealed) return
    setRevealed(true)
    if (selected === q.correct) setScore((s) => s + 1)
  }

  function next() {
    if (isLast) {
      onFinish(score)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-charcoal text-cream">
      {/* progress header */}
      <header className="sticky top-0 z-50 border-b border-cream/10 bg-charcoal/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-3.5">
          <button
            onClick={onQuit}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50 transition hover:text-clay-bright"
          >
            Exit
          </button>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: level.accent }}
            />
          </div>
          <span className="flex-none font-mono text-[11px] tabular-nums text-cream/60">
            {index + 1}/{questions.length}
          </span>
          <span
            className="hidden flex-none rounded-full px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wide sm:block"
            style={{ backgroundColor: `${level.accent}22`, color: level.accent }}
          >
            {level.label}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-cream/45">
          <span>Question {index + 1}</span>
          <span>
            Score {score}
            <span className="text-cream/30"> · pass {level.pass}+</span>
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 md:p-8">
          <h2 className="text-balance font-display text-2xl font-bold leading-snug md:text-[28px]">{q.question}</h2>
        </div>

        <div className="mt-6 grid gap-3.5">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isAnswer = i === q.correct
            let cls = "border-cream/15 bg-charcoal-deep/50 hover:border-clay/60 hover:bg-clay/10"
            if (!revealed && isSelected) cls = "border-gold bg-gold/20"
            if (revealed && isAnswer) cls = "border-success bg-success/25"
            if (revealed && isSelected && !isAnswer) cls = "border-destructive bg-destructive/25"
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${cls} ${
                  revealed ? "cursor-default" : ""
                }`}
              >
                <span className="flex size-8 flex-none items-center justify-center rounded-md bg-cream/10 font-display text-base font-bold text-clay-bright">
                  {LETTERS[i]}
                </span>
                <span className="text-[15.5px] font-semibold leading-snug">{opt}</span>
                {revealed && isAnswer && <span className="ml-auto flex-none text-success">✓</span>}
                {revealed && isSelected && !isAnswer && <span className="ml-auto flex-none text-destructive">✕</span>}
              </button>
            )
          })}
        </div>

        {/* explanation */}
        {revealed && (
          <div
            className="mt-5 rounded-xl border p-4"
            style={{
              borderColor: correct ? "rgba(95,174,140,.4)" : "rgba(217,119,87,.4)",
              backgroundColor: correct ? "rgba(95,174,140,.08)" : "rgba(217,119,87,.08)",
            }}
          >
            <div
              className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]"
              style={{ color: correct ? "#8fd3b3" : "#e89b78" }}
            >
              {correct ? "Correct" : `Answer: ${LETTERS[q.correct]}`}
            </div>
            <p className="text-[15px] leading-relaxed text-cream/85">{q.why}</p>
          </div>
        )}

        {/* actions */}
        <div className="mt-7 flex items-center gap-4">
          {!revealed ? (
            <button
              onClick={reveal}
              disabled={selected === null}
              className="rounded-full bg-clay px-8 py-3.5 font-sans text-base font-extrabold text-white transition enabled:hover:-translate-y-0.5 enabled:hover:bg-clay-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check answer
            </button>
          ) : (
            <button
              onClick={next}
              className="rounded-full px-8 py-3.5 font-sans text-base font-extrabold text-charcoal transition hover:-translate-y-0.5"
              style={{ backgroundColor: level.accent }}
            >
              {isLast ? "See my result" : "Next question →"}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
