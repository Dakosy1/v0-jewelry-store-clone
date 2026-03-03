"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  "RINGS",
  "NECKLACES",
  "BRACELETS",
  "EARRINGS",
  "PENDANTS",
  "CHAINS",
  "CUFFS",
  "ANKLETS",
  "BROOCHES",
  "WATCHES",
]

export function CategoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="catalog" className="relative border-y border-border bg-secondary">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-0 bottom-0 z-10 px-3 bg-gradient-to-r from-secondary to-transparent text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide px-12 py-4 gap-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <a
            key={category}
            href="#"
            className="shrink-0 text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
          >
            {category}
          </a>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-0 bottom-0 z-10 px-3 bg-gradient-to-l from-secondary to-transparent text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  )
}
