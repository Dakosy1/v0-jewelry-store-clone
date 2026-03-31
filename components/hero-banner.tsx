'use client'

import Image from "next/image"
import { useT } from "@/locales"

export function HeroBanner() {
  const t = useT()

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt={t.hero.imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-white/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[10px] tracking-[0.5em] text-foreground/60 mb-8 font-sans uppercase">
          {t.hero.label}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.1] tracking-tight text-balance font-serif">
          {t.hero.heading}
        </h1>
        <p className="mt-6 text-base md:text-lg text-foreground/70 font-light max-w-xl text-pretty tracking-wide">
          {t.hero.tagline}
        </p>
        <a
          href="/catalog"
          className="mt-12 inline-block bg-black text-white px-12 py-4 text-[10px] tracking-[0.3em] hover:bg-black/80 transition-all duration-300 font-sans uppercase"
        >
          {t.hero.cta}
        </a>
      </div>
    </section>
  )
}
