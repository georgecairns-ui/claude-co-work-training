"use client"

import { BrandMark } from "./brand-mark"
import { modules } from "@/lib/training-data"

export function IntroScreen({ onStart }: { onStart: () => void }) {
  const totalQuestions = modules.reduce((n, m) => n + m.questions.length, 0)

  return (
    <main className="min-h-screen bg-charcoal text-cream">
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(1100px 620px at 80% -10%, rgba(217,119,87,.34) 0%, transparent 58%), radial-gradient(700px 500px at 0% 110%, rgba(193,168,85,.12) 0%, transparent 60%)",
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center md:py-28">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-clay/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-clay-bright">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay-bright opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-clay-bright" />
            </span>
            Field Guide / No coding needed
          </div>

          <BrandMark className="mb-8 size-16 text-clay md:size-20" />

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Claude Cowork <span className="text-clay-bright">Academy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg font-semibold leading-relaxed text-cream/80 md:text-xl">
            Turn Claude into a co-worker that does the work, not just answers the question. Read each section, then play
            the quiz to lock it in.
          </p>

          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 font-sans text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-clay-bright"
          >
            Begin training
            <span aria-hidden="true">→</span>
          </button>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4">
            {[
              { n: modules.length, l: "Sections" },
              { n: totalQuestions, l: "Quiz questions" },
              { n: "£20k", l: "Top prize / round" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-cream/10 bg-cream/5 px-4 py-5">
                <div className="font-display text-3xl font-bold text-clay-bright">{s.n}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-cream/55">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-clay-bright">How it works</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "1 · Read the section",
              d: "Short, plain-English lessons drawn straight from the official Cowork field guide.",
            },
            {
              t: "2 · Play the quiz",
              d: "A ‘Who Wants to Be a Millionaire’ round — lifelines included — based on what you just read.",
            },
            {
              t: "3 · Bank your winnings",
              d: "Climb the prize ladder section by section. Get one wrong? Revisit the lesson and try again.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
              <h3 className="font-sans text-lg font-extrabold text-cream">{c.t}</h3>
              <p className="mt-2 leading-relaxed text-cream/65">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-cream/10 py-8 text-center font-mono text-[11px] tracking-wide text-cream/40">
        Based on the Claude Cowork Complete Guide v1.0 · A Claude Co-founder field guide
      </footer>
    </main>
  )
}
