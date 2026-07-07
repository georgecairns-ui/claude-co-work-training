import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block overflow-hidden rounded-[22%] shadow-sm", className)}>
      <Image
        src="/cowork-quiz/images/cowork-logo.webp"
        alt="Claude Cowork Academy logo"
        fill
        sizes="80px"
        className="object-cover"
        priority
      />
    </span>
  )
}
