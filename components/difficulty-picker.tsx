"use client"

import { useState } from "react"
import { BrandMark } from "./brand-mark"
import { quizLevels, type QuizLevel } from "@/lib/quiz-levels"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function DifficultyPicker({
  onPick,
  onBack,
}: {
  onPick: (level: QuizLevel, name: string, email: string) => void
  onBack: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const emailValid = EMAIL_RE.test(email.trim())

  function pick(lvl: QuizLevel) {
    if (!emailValid) {
      setEmailError(true)
      document.getElementById("learner-email")?.focus()
      return
    }
    onPick(lvl, name.trim(), email.trim())
  }

  return (
    <main className="min-h-screen bg-charcoal text-cream">
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(1100px 620px at 80% -10%, rgba(217,119,87,.30) 0%, transparent 58%), radial-gradient(700px 500px at 0% 110%, rgba(95,174,140,.12) 0%, transparent 60%)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <button
            onClick={onBack}
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cream/55 transition hover:text-clay-bright"
          >
            <span aria-hidden="true">←</span> Back to home
          </button>

          <div className="flex flex-col items-center text-center">
            <BrandMark className="mb-6 size-14" />
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-clay-bright">
              Standalone knowledge check
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Pick your level
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-cream/75">
              Twenty multiple-choice questions drawn straight from the Cowork guide. Choose how hard you want it. Pass
              and a personalised congratulations plays for you.
            </p>
          </div>

          {/* name */}
          <div className="mx-auto mt-10 max-w-md">
            <label
              htmlFor="learner-name"
              className="mb-2 block text-center font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55"
            >
              Your name (for the certificate)
            </label>
            <input
              id="learner-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              maxLength={40}
              className="w-full rounded-full border border-cream/15 bg-cream/[0.04] px-5 py-3 text-center text-base font-semibold text-cream outline-none transition placeholder:text-cream/30 focus:border-clay focus:bg-cream/[0.07]"
            />
          </div>

          {/* email */}
          <div className="mx-auto mt-5 max-w-md">
            <label
              htmlFor="learner-email"
              className="mb-2 block text-center font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55"
            >
              Your email (to log your result)
            </label>
            <input
              id="learner-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError && EMAIL_RE.test(e.target.value.trim())) setEmailError(false)
              }}
              placeholder="you@company.com"
              maxLength={80}
              aria-invalid={emailError}
              className={`w-full rounded-full border bg-cream/[0.04] px-5 py-3 text-center text-base font-semibold text-cream outline-none transition placeholder:text-cream/30 focus:bg-cream/[0.07] ${
                emailError ? "border-red-400/70 focus:border-red-400" : "border-cream/15 focus:border-clay"
              }`}
            />
            {emailError && (
              <p role="alert" className="mt-2 text-center text-sm font-semibold text-red-300">
                Enter a valid email address to start the quiz.
              </p>
            )}
          </div>

          {/* levels */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quizLevels.map((lvl, i) => {
              const isHover = hovered === lvl.id
              return (
                <button
                  key={lvl.id}
                  onMouseEnter={() => setHovered(lvl.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => pick(lvl)}
                  className="group relative flex flex-col rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 text-left transition hover:-translate-y-1 hover:border-clay/50"
                  style={isHover ? { boxShadow: `0 0 0 1px ${lvl.accent}55, 0 24px 60px -28px ${lvl.accent}` } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex size-10 items-center justify-center rounded-xl font-display text-lg font-bold"
                      style={{ backgroundColor: `${lvl.accent}22`, color: lvl.accent }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((b) => (
                        <span
                          key={b}
                          className="block h-4 w-1.5 rounded-full"
                          style={{ backgroundColor: b <= i ? lvl.accent : "rgba(245,244,239,.15)" }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-cream">{lvl.label}</h3>
                  <p className="mt-2 flex-1 text-pretty leading-relaxed text-cream/65">{lvl.tagline}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-cream/10 pt-4 font-mono text-[11px] uppercase tracking-wide text-cream/55">
                    <span>{lvl.total} questions</span>
                    <span style={{ color: lvl.accent }}>Pass {lvl.pass}+</span>
                  </div>
                  <span
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-extrabold text-charcoal transition"
                    style={{ backgroundColor: lvl.accent }}
                  >
                    Start {lvl.label} <span aria-hidden="true">→</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
