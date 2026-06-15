"use client"

import { useEffect, useRef, useState } from "react"
import type { QuizLevel } from "@/lib/quiz-levels"
import { BrandMark } from "./brand-mark"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  vr: number
  color: string
}

const DURATION = 11 // seconds
const SCENES = [
  { start: 0, end: 2.4 },
  { start: 2.4, end: 5.2 },
  { start: 5.2, end: 7.6 },
  { start: 7.6, end: DURATION },
]

const PALETTE = ["#d99757", "#c1a855", "#5fae8c", "#f5f4ef"]

export function CongratsVideo({
  level,
  score,
  name,
  onReplayLevel,
  onHome,
}: {
  level: QuizLevel
  score: number
  name: string
  onReplayLevel: () => void
  onHome: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<Particle[]>([])
  const lastScene = useRef<number>(-1)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [runId, setRunId] = useState(0)

  const displayName = name || "Cowork Operator"

  // ---- Clock: drives scenes + confetti spawning (interval is robust) ----
  useEffect(() => {
    const start = performance.now()
    lastScene.current = -1
    particles.current = []
    setPlaying(true)
    setElapsed(0)

    const spawn = (count: number, spread: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const cx = canvas.width / 2
      const cy = canvas.height * 0.4
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = 3 + Math.random() * spread
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 6 + Math.random() * 8,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          color: [...PALETTE, level.accent][Math.floor(Math.random() * 5)],
        })
      }
    }

    const id = window.setInterval(() => {
      const t = (performance.now() - start) / 1000
      setElapsed(Math.min(t, DURATION))

      const scene = SCENES.findIndex((s) => t >= s.start && t < s.end)
      if (scene !== lastScene.current) {
        lastScene.current = scene
        if (scene === 1) spawn(44, 6)
        if (scene === 3) spawn(110, 10)
      }
      if (t >= 7.6 && t < DURATION && Math.random() > 0.5) spawn(8, 8)

      if (t >= DURATION) {
        setPlaying(false)
        window.clearInterval(id)
      }
    }, 40)

    return () => window.clearInterval(id)
  }, [runId, level.accent])

  // ---- Continuous confetti render loop ----
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
    }
    resize()
    window.addEventListener("resize", resize)

    let raf = 0
    const dpr = window.devicePixelRatio
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter((p) => p.y < canvas.height + 60)
      for (const p of particles.current) {
        p.vy += 0.13
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect((-p.size / 2) * dpr, (-p.size / 2) * dpr, p.size * dpr, p.size * dpr * 0.6)
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  function replay() {
    setRunId((n) => n + 1)
  }

  const scene = elapsed >= DURATION ? 3 : SCENES.findIndex((s) => elapsed >= s.start && elapsed < s.end)
  const countProgress = Math.min(1, Math.max(0, (elapsed - 2.4) / 1.6))
  const shownScore = scene < 1 ? 0 : scene === 1 ? Math.round(countProgress * score) : score
  const progressPct = (elapsed / DURATION) * 100

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-4 py-10 text-cream">
      <div className="w-full max-w-3xl">
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          <span>Your completion reel</span>
          <span style={{ color: level.accent }}>{level.label} level</span>
        </div>

        {/* video frame */}
        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-cream/15"
          style={{
            backgroundImage:
              "radial-gradient(900px 520px at 50% 12%, rgba(217,119,87,.45) 0%, transparent 60%), radial-gradient(700px 480px at 18% 100%, rgba(95,174,140,.20) 0%, transparent 62%), linear-gradient(160deg,#241f1c,#15110f)",
          }}
        >
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

          {/* SCENE 0 — logo reveal */}
          <Stage show={scene === 0}>
            <div key={`s0-${runId}`} className="animate-[pop_.7s_ease-out]">
              <BrandMark className="mx-auto size-20 md:size-24" />
            </div>
            <div className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-clay-bright md:text-sm">
              Cowork Academy
            </div>
            <div className="mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
              Knowledge check complete
            </div>
          </Stage>

          {/* SCENE 1 — score count up */}
          <Stage show={scene === 1}>
            <div className="font-mono text-xs uppercase tracking-[0.24em] text-cream/60">Your score</div>
            <div className="mt-2 font-display text-7xl font-bold leading-none md:text-8xl" style={{ color: level.accent }}>
              {shownScore}
              <span className="text-cream/40">/{level.total}</span>
            </div>
            <div className="mt-4 font-sans text-lg font-bold text-cream/85 md:text-xl">
              {Math.round((score / level.total) * 100)}% correct
            </div>
          </Stage>

          {/* SCENE 2 — verified badge */}
          <Stage show={scene === 2}>
            <div
              key={`s2-${runId}`}
              className="mx-auto flex size-24 animate-[pop_.6s_ease-out] items-center justify-center rounded-full md:size-28"
              style={{ backgroundColor: `${level.accent}26`, border: `2px solid ${level.accent}` }}
            >
              <span className="text-4xl md:text-5xl" style={{ color: level.accent }} aria-hidden="true">
                ✓
              </span>
            </div>
            <div className="mt-5 font-display text-2xl font-bold md:text-3xl">Verified Cowork Operator</div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-cream/55">
              {level.label} level passed
            </div>
          </Stage>

          {/* SCENE 3 — finale */}
          <Stage show={scene === 3}>
            <div key={`s3-${runId}`} className="animate-[pop_.7s_ease-out]">
              <div className="font-mono text-xs uppercase tracking-[0.26em] text-clay-bright md:text-sm">
                Congratulations
              </div>
              <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                {displayName}!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-cream/80 md:text-lg">
                You passed the {level.label.toLowerCase()} check with {score}/{level.total}. You&apos;re ready to put
                Claude Cowork to work for real.
              </p>
            </div>
          </Stage>

          {/* timeline */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
            <button
              onClick={playing ? undefined : replay}
              className="flex size-8 flex-none items-center justify-center rounded-full bg-cream/15 text-sm text-cream transition hover:bg-cream/25"
              aria-label={playing ? "Playing" : "Replay"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/15">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{ width: `${progressPct}%`, backgroundColor: level.accent }}
              />
            </div>
            <span className="flex-none font-mono text-[10.5px] tabular-nums text-cream/60">
              0:{String(Math.floor(elapsed)).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={replay}
            className="rounded-full border border-cream/20 px-6 py-3 font-sans text-sm font-bold text-cream/85 transition hover:border-clay hover:text-clay-bright"
          >
            ▶ Replay reel
          </button>
          <button
            onClick={onReplayLevel}
            className="rounded-full px-6 py-3 font-sans text-sm font-extrabold text-charcoal transition hover:-translate-y-0.5"
            style={{ backgroundColor: level.accent }}
          >
            Try another level
          </button>
          <button
            onClick={onHome}
            className="rounded-full border border-cream/20 px-6 py-3 font-sans text-sm font-bold text-cream/85 transition hover:border-cream/40"
          >
            Back to home
          </button>
        </div>
      </div>
    </main>
  )
}

function Stage({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500"
      style={{ opacity: show ? 1 : 0, pointerEvents: "none" }}
    >
      {children}
    </div>
  )
}
