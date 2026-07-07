"use client"

import { useState } from "react"
import { modules } from "@/lib/training-data"
import type { QuizLevel } from "@/lib/quiz-levels"
import { BrandMark } from "@/components/brand-mark"
import { IntroScreen } from "@/components/intro-screen"
import { SectionReader } from "@/components/section-reader"
import { QuizGame } from "@/components/quiz-game"
import { CompletionScreen } from "@/components/completion-screen"
import { DifficultyPicker } from "@/components/difficulty-picker"
import { KnowledgeCheck } from "@/components/knowledge-check"
import { CongratsVideo } from "@/components/congrats-video"
import { CheckRetry } from "@/components/check-retry"
import { trackQuizEvent } from "@/lib/track"

type Phase =
  | "intro"
  | "reading"
  | "quiz"
  | "complete"
  | "picker"
  | "check"
  | "checkpass"
  | "checkfail"

export default function Page() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [current, setCurrent] = useState(0)
  const [completed, setCompleted] = useState<number>(0)
  const [level, setLevel] = useState<QuizLevel | null>(null)
  const [learner, setLearner] = useState("")
  const [email, setEmail] = useState("")
  const [checkScore, setCheckScore] = useState(0)

  function startCourse() {
    setCurrent(0)
    setCompleted(0)
    setPhase("reading")
  }

  function finishCheck(score: number) {
    setCheckScore(score)
    const passed = level ? score >= level.pass : false
    if (level) {
      trackQuizEvent({
        email,
        name: learner,
        event: passed ? "quiz_passed" : "quiz_failed",
        level: level.label,
        score,
        total: level.total,
      })
    }
    setPhase(passed ? "checkpass" : "checkfail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function passSection() {
    setCompleted((c) => Math.max(c, current + 1))
    if (current + 1 < modules.length) {
      setCurrent((i) => i + 1)
      setPhase("reading")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setPhase("complete")
    }
  }

  if (phase === "intro")
    return <IntroScreen onStart={startCourse} onCheck={() => setPhase("picker")} />
  if (phase === "complete") return <CompletionScreen onRestart={() => setPhase("intro")} />

  if (phase === "picker")
    return (
      <DifficultyPicker
        onBack={() => setPhase("intro")}
        onPick={(lvl, name, learnerEmail) => {
          setLevel(lvl)
          setLearner(name)
          setEmail(learnerEmail)
          setCheckScore(0)
          trackQuizEvent({
            email: learnerEmail,
            name,
            event: "quiz_started",
            level: lvl.label,
          })
          setPhase("check")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    )

  if (phase === "check" && level)
    return <KnowledgeCheck level={level} onFinish={finishCheck} onQuit={() => setPhase("picker")} />

  if (phase === "checkpass" && level)
    return (
      <CongratsVideo
        level={level}
        score={checkScore}
        name={learner}
        onReplayLevel={() => setPhase("picker")}
        onHome={() => setPhase("intro")}
      />
    )

  if (phase === "checkfail" && level)
    return (
      <CheckRetry
        level={level}
        score={checkScore}
        onRetry={() => {
          setCheckScore(0)
          setPhase("check")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onPickLevel={() => setPhase("picker")}
        onHome={() => setPhase("intro")}
      />
    )

  const activeModule = modules[current]

  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader current={current} completed={completed} />
      {phase === "reading" ? (
        <SectionReader
          module={activeModule}
          index={current}
          total={modules.length}
          onStartQuiz={() => {
            setPhase("quiz")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      ) : (
        <QuizGame
          module={activeModule}
          onPass={() => passSection()}
          onReview={() => {
            setPhase("reading")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      )}
    </div>
  )
}

function ProgressHeader({ current, completed }: { current: number; completed: number }) {
  const pct = (completed / modules.length) * 100
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <BrandMark className="size-6 text-clay" />
          <span className="hidden font-display text-base font-bold tracking-tight text-foreground sm:block">
            Cowork Academy
          </span>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-clay transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="flex-none font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
            {completed}/{modules.length} done
          </span>
        </div>
        <div className="hidden rounded-full bg-clay-tint px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-clay-deep md:block">
          §{modules[current].number}
        </div>
      </div>
    </header>
  )
}
