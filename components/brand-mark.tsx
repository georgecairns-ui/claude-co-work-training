export function BrandMark({ className }: { className?: string }) {
  // Anthropic-style sunburst mark rendered as SVG
  const rays = Array.from({ length: 12 })
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g transform="translate(50 50)">
        {rays.map((_, i) => {
          const angle = (i * 360) / rays.length
          return (
            <rect
              key={i}
              x={-3.2}
              y={-46}
              width={6.4}
              height={34}
              rx={3.2}
              fill="currentColor"
              transform={`rotate(${angle})`}
            />
          )
        })}
      </g>
    </svg>
  )
}
