'use client'

import Image from "next/image"
import Link from "next/link"
import { useT } from "@/locales"

export function HeroBanner() {
  const t = useT()

  return (
    <section className="relative w-full h-[95vh] min-h-[600px] overflow-hidden">
      <Image
        src="/images/photosession/GK2A9401.JPG"
        alt={t.hero.imageAlt}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Лёгкий градиент снизу */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />

      {/* Контент — левый нижний угол */}
      <div className="absolute bottom-14 left-8 lg:left-16 max-w-lg">
        <p
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontSize: '9px',
            letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {t.hero.label}
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2.4rem, 4vw, 4rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            marginBottom: '20px',
          }}
        >
          {t.hero.heading}
        </h1>

        <Link
          href="/catalog"
          style={{
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.7)',
            color: '#fff',
            padding: '12px 32px',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-montserrat), sans-serif',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'
            ;(e.currentTarget as HTMLElement).style.borderColor = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)'
          }}
        >
          {t.hero.cta}
        </Link>
      </div>

      {/* Год — правый нижний угол */}
      <div className="absolute bottom-14 right-8 lg:right-16">
        <p
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontSize: '9px',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          2026
        </p>
      </div>
    </section>
  )
}
