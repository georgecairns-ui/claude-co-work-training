"use client"

import type { Module, ContentBlock } from "@/lib/training-data"

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-pretty text-[17px] leading-relaxed text-foreground/85">{block.text}</p>
    case "heading":
      return <h3 className="pt-2 font-sans text-xl font-extrabold text-foreground">{block.text}</h3>
    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-7 text-[16px] leading-relaxed text-foreground/85">
              <span className="absolute left-0 top-2.5 size-2.5 rounded-full bg-clay" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )
    case "tip":
      return (
        <div className="rounded-r-xl border-l-4 border-clay bg-clay-tint px-5 py-4">
          <div className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-clay-deep">
            {block.label}
          </div>
          <p className="text-[15.5px] leading-relaxed text-foreground/85">{block.text}</p>
        </div>
      )
    case "warn":
      return (
        <div className="rounded-r-xl border-l-4 border-gold bg-gold-tint px-5 py-4">
          <div className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a7420]">
            {block.label}
          </div>
          <p className="text-[15.5px] leading-relaxed text-foreground/85">{block.text}</p>
        </div>
      )
    case "prompt":
      return (
        <div className="rounded-xl bg-charcoal px-5 py-4 text-cream">
          <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-clay-bright">{block.label}</div>
          <code className="block whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed text-cream/90">
            {block.text}
          </code>
        </div>
      )
    case "table":
      return (
        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="bg-charcoal px-4 py-3 text-left font-sans text-sm font-extrabold text-cream"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-clay-tint" : "bg-ivory"}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-t border-border px-4 py-3 align-top text-[14.5px] leading-relaxed text-foreground/85"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function SectionReader({
  module,
  index,
  total,
  onStartQuiz,
}: {
  module: Module
  index: number
  total: number
  onStartQuiz: () => void
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-clay-deep">
        <span>Section {module.number}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{module.readMins} min read</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">
          {index + 1} of {total}
        </span>
      </div>

      <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[40px]">
        {module.title}
      </h2>
      <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">{module.subtitle}</p>

      <article className="mt-9 flex flex-col gap-6">
        {module.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      <div className="mt-12 rounded-2xl border border-clay/30 bg-clay-tint/60 p-6 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-clay-deep">Ready?</div>
        <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-foreground/80">
          Time to lock in what you just learned. {module.questions.length} questions stand between you and the prize
          ladder.
        </p>
        <button
          onClick={onStartQuiz}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 font-sans text-base font-extrabold text-cream transition hover:-translate-y-0.5 hover:bg-clay-deep"
        >
          Start the quiz
          <span aria-hidden="true">▶</span>
        </button>
      </div>
    </div>
  )
}
