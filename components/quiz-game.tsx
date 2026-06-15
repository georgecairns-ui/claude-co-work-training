"use client"

import { useMemo, useState } from "react"
import type { Module } from "@/lib/training-data"

type Lifelines = { fifty: boolean; audience: boolean; friend: boolean }
const LETTERS = ["A", "B", "C", "D"]

export function QuizGame({
  module,
  onPass,
  onReview,
}: {
  module: Module
  onPass: (winnings: string) => void
  onReview: () => void
}) {
  const questions = module.questions
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [outcome, setOutcome] = useState<"none" | "won" | "lost">("none")
  const [lifelines, setLifelines] = useState<Lifelines>({ fifty: true, audience: true, friend: true })
  const [hidden, setHidden] = useState<number[]>([])
  const [showAudience, setShowAudience] = useState(false)
  const [showFriend, setShowFriend] = useState(false)

  const q = questions[qIndex]

  const fiftyAudience = useMemo(() => {
    if (!showAudience) return q.audience
    // when 50:50 already used, redistribute hidden options to 0 visually
    return q.audience.map((v, i) => (hidden.includes(i) ? 0 : v))
  }, [q.audience, hidden, showAudience])

  function resetForQuestion() {
    setSelected(null)
    setLocked(false)
    setRevealed(false)
    setHidden([])
    setShowAudience(false)
    setShowFriend(false)
  }

  function useFifty() {
    if (!lifelines.fifty) return
    const wrongs = [0, 1, 2, 3].filter((i) => i !== q.correct)
    // keep one random wrong + the correct one
    const shuffled = [...wrongs].sort(() => Math.random() - 0.5)
    const toHide = shuffled.slice(0, 2)
    setHidden(toHide)
    if (selected !== null && toHide.includes(selected)) setSelected(null)
    setLifelines((l) => ({ ...l, fifty: false }))
  }

  function useAudience() {
    if (!lifelines.audience) return
    setShowAudience(true)
    setLifelines((l) => ({ ...l, audience: false }))
  }

  function useFriend() {
    if (!lifelines.friend) return
    setShowFriend(true)
    setLifelines((l) => ({ ...l, friend: false }))
  }

  function lockIn() {
    if (selected === null || locked) return
    setLocked(true)
    // suspense
    setTimeout(() => {
      setRevealed(true)
      const correct = selected === q.correct
      setTimeout(() => {
        if (!correct) {
          setOutcome("lost")
          return
        }
        if (qIndex + 1 < questions.length) {
          setQIndex((i) => i + 1)
          resetForQuestion()
        } else {
          setOutcome("won")
        }
      }, 1600)
    }, 1400)
  }

  function retry() {
    setQIndex(0)
    resetForQuestion()
    setOutcome("none")
    setLifelines({ fifty: true, audience: true, friend: true })
  }

  // ---- Outcome screens ----
  if (outcome === "won") {
    const top = module.questions[module.questions.length - 1].prize
    return (
      <Result
        kind="won"
        title="Section banked!"
        prize={top}
        body={`You answered all ${questions.length} questions on “${module.title}” correctly and climbed to ${top}.`}
        primaryLabel="Continue to next section →"
        onPrimary={() => onPass(top)}
        secondaryLabel="Re-read this section"
        onSecondary={onReview}
      />
    )
  }

  if (outcome === "lost") {
    return (
      <Result
        kind="lost"
        title="Not quite — but no harm done"
        body={`The correct answer was ${LETTERS[q.correct]}: “${q.options[q.correct]}”. Give the section another look, then take the round again.`}
        primaryLabel="Try this quiz again"
        onPrimary={retry}
        secondaryLabel="Re-read the section"
        onSecondary={onReview}
      />
    )
  }

  // ---- Active question ----
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1fr_240px] lg:py-12">
        {/* main column */}
        <div className="order-2 lg:order-1">
          {/* header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-clay-bright">
              Section {module.number} · Question {qIndex + 1} of {questions.length}
            </div>
            <div className="rounded-full border border-clay/40 bg-clay/10 px-4 py-1.5 font-display text-lg font-bold text-clay-bright">
              Playing for {q.prize}
            </div>
          </div>

          {/* lifelines */}
          <div className="mb-7 flex gap-3">
            <Lifeline label="50:50" available={lifelines.fifty} onClick={useFifty} disabled={locked} />
            <Lifeline label="Audience" available={lifelines.audience} onClick={useAudience} disabled={locked} />
            <Lifeline label="Phone" available={lifelines.friend} onClick={useFriend} disabled={locked} />
          </div>

          {showFriend && (
            <div className="mb-5 rounded-xl border border-clay/40 bg-cream/5 p-4">
              <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-clay-bright">
                ☎ A friend says…
              </div>
              <p className="text-[15px] italic leading-relaxed text-cream/85">“{q.friend}”</p>
            </div>
          )}

          {/* question */}
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 md:p-8">
            <h2 className="text-balance font-display text-2xl font-bold leading-snug md:text-[28px]">{q.question}</h2>
          </div>

          {/* options */}
          <div className="mt-6 grid gap-3.5 md:grid-cols-2">
            {q.options.map((opt, i) => {
              const isHidden = hidden.includes(i)
              const isSelected = selected === i
              const isCorrect = i === q.correct
              let stateClass =
                "border-cream/15 bg-charcoal-deep/60 hover:border-clay/60 hover:bg-clay/10"
              if (isSelected && !revealed)
                stateClass = "border-gold bg-gold/20 text-cream"
              if (revealed && isCorrect) stateClass = "border-success bg-success/25 text-cream"
              if (revealed && isSelected && !isCorrect) stateClass = "border-destructive bg-destructive/25 text-cream"

              return (
                <button
                  key={i}
                  disabled={locked || isHidden}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${stateClass} ${
                    isHidden ? "pointer-events-none opacity-25" : ""
                  } ${locked && !revealed && isSelected ? "animate-pulse" : ""}`}
                >
                  <span className="flex size-8 flex-none items-center justify-center rounded-md bg-cream/10 font-display text-base font-bold text-clay-bright">
                    {LETTERS[i]}
                  </span>
                  <span className="text-[15.5px] font-semibold leading-snug">{isHidden ? "" : opt}</span>

                  {showAudience && !isHidden && (
                    <span className="ml-auto flex flex-none items-center gap-2 font-mono text-xs text-cream/60">
                      <span className="hidden h-1.5 w-12 overflow-hidden rounded bg-cream/15 sm:block">
                        <span
                          className="block h-full bg-clay-bright"
                          style={{ width: `${fiftyAudience[i]}%` }}
                        />
                      </span>
                      {fiftyAudience[i]}%
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* lock in */}
          <div className="mt-7 flex items-center gap-4">
            <button
              onClick={lockIn}
              disabled={selected === null || locked}
              className="inline-flex items-center gap-2 rounded-full bg-clay px-8 py-3.5 font-sans text-base font-extrabold text-white transition enabled:hover:-translate-y-0.5 enabled:hover:bg-clay-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              {locked && !revealed ? "Locking in…" : "Final answer"}
            </button>
            {locked && !revealed && (
              <span className="font-mono text-sm text-cream/60">Is that your final answer…?</span>
            )}
            <button onClick={onReview} className="ml-auto font-mono text-xs text-cream/45 underline-offset-4 hover:text-cream/80 hover:underline">
              Re-read section
            </button>
          </div>
        </div>

        {/* prize ladder */}
        <aside className="order-1 lg:order-2">
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-4">
            <div className="mb-3 px-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream/45">
              Prize ladder
            </div>
            <ol className="flex flex-col-reverse gap-1.5">
              {questions.map((qq, i) => {
                const active = i === qIndex
                const banked = i < qIndex
                return (
                  <li
                    key={i}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 font-display text-sm font-bold ${
                      active
                        ? "bg-clay text-white"
                        : banked
                          ? "bg-success/20 text-success"
                          : "text-cream/55"
                    }`}
                  >
                    <span className="font-mono text-[11px] font-normal opacity-70">Q{i + 1}</span>
                    <span>{qq.prize}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Lifeline({
  label,
  available,
  onClick,
  disabled,
}: {
  label: string
  available: boolean
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={!available || disabled}
      className={`relative rounded-full border px-4 py-2 font-mono text-[12px] font-bold tracking-wide transition ${
        available && !disabled
          ? "border-clay/50 bg-clay/10 text-clay-bright hover:bg-clay/20"
          : "border-cream/10 text-cream/30"
      }`}
    >
      {label}
      {!available && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-0.5 w-[120%] rotate-[-12deg] rounded bg-destructive/70" />
        </span>
      )}
    </button>
  )
}

function Result({
  kind,
  title,
  body,
  prize,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: {
  kind: "won" | "lost"
  title: string
  body: string
  prize?: string
  primaryLabel: string
  onPrimary: () => void
  secondaryLabel: string
  onSecondary: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-cream">
      <div className="w-full max-w-lg rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 text-center md:p-10">
        <div
          className={`mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl text-3xl font-bold ${
            kind === "won" ? "bg-success/25 text-success" : "bg-clay/25 text-clay-bright"
          }`}
        >
          {kind === "won" ? "✓" : "↻"}
        </div>
        <h2 className="text-balance font-display text-3xl font-bold">{title}</h2>
        {prize && <div className="mt-3 font-display text-4xl font-bold text-clay-bright">{prize}</div>}
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-cream/70">{body}</p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onPrimary}
            className="rounded-full bg-clay px-7 py-3.5 font-sans text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-clay-bright"
          >
            {primaryLabel}
          </button>
          <button
            onClick={onSecondary}
            className="rounded-full border border-cream/20 px-7 py-3 font-sans text-sm font-bold text-cream/80 transition hover:border-cream/40"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
