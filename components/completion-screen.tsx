"use client"

import { BrandMark } from "./brand-mark"
import { modules } from "@/lib/training-data"

export function CompletionScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center text-cream"
      style={{
        backgroundColor: "#2f2f2d",
        backgroundImage:
          "radial-gradient(900px 520px at 50% -10%, rgba(217,119,87,.35) 0%, transparent 56%), radial-gradient(700px 500px at 0% 110%, rgba(193,168,85,.14) 0%, transparent 60%)",
      }}
    >
      <BrandMark className="mb-7 size-16 text-clay" />
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-clay-bright">Course complete</div>
      <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold leading-tight md:text-6xl">
        You&apos;re Cowork-ready.
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream/75">
        You&apos;ve worked through all {modules.length} sections and topped the prize ladder on every round. The
        recurring work that used to eat your mornings can now happen in the background.
      </p>

      <div className="mt-10 max-w-xl rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 text-left">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-clay-bright">Your first ten minutes</div>
        <p className="leading-relaxed text-cream/80">
          Open the desktop app, switch to Cowork, connect one folder, and hand it one real job. Watch the checklist
          tick along in the top-right. That single real task teaches you more than another page of reading.
        </p>
      </div>

      <button
        onClick={onRestart}
        className="mt-10 rounded-full border border-cream/25 px-7 py-3.5 font-sans text-base font-extrabold text-cream transition hover:border-clay hover:text-clay-bright"
      >
        Restart the course
      </button>

      <footer className="mt-14 font-mono text-[11px] tracking-wide text-cream/40">
        Based on the Claude Cowork Complete Guide v1.0 · A Claude Co-founder field guide
      </footer>
    </main>
  )
}
