'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const introCopy = {
  ru: {
    hint: 'Экран исчезнет автоматически через 10 секунд',
    button: 'Перейти к сайту',
  },
  en: {
    hint: 'This screen will close automatically in 10 seconds',
    button: 'Enter the site',
  },
  kk: {
    hint: 'Бұл экран 10 секундтан кейін автоматты түрде жабылады',
    button: 'Сайтқа өту',
  },
} as const

export function IntroScreen() {
  const { locale } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const copy = introCopy[locale]

  useEffect(() => {
    if (sessionStorage.getItem('intro_seen')) return

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) {
      sessionStorage.setItem('intro_seen', '1')
      return
    }

    setVisible(true)

    const t = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('intro_seen', '1')
      }, 700)
    }, 10000)

    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('intro_seen', '1')
    }, 700)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ height: '100dvh' }}
    >
      {/* Mobile: full-screen photo + overlay */}
      <div className="relative h-full w-full lg:hidden">
        <Image
          src="/images/photosession/webp/GK2A9147.webp"
          alt="Tomiris Collection Astana"
          fill
          className="object-cover object-[60%_center]"
          priority
          quality={80}
          sizes="100vw"
        />
        {/* gradient overlay — bottom to top */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.04) 100%)' }} />
        {/* centered brand name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-montserrat), sans-serif', textTransform: 'uppercase', marginBottom: '20px' }}>
            2026
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(3.2rem, 16vw, 5rem)', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '0.06em', marginBottom: '10px' }}>
            TOMIRIS
          </h1>
          <p style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', fontWeight: 300, letterSpacing: '0.16em' }}>
            Collection Astana
          </p>
        </div>
        {/* bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 px-8 pb-12">
          <button
            type="button"
            onClick={dismiss}
            style={{
              width: '100%',
              maxWidth: '320px',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#fff',
              padding: '16px 24px',
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-montserrat), sans-serif',
              transition: 'background 0.2s ease',
            }}
          >
            {copy.button}
          </button>
          <p style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-montserrat), sans-serif', textTransform: 'uppercase', textAlign: 'center' }}>
            {copy.hint}
          </p>
        </div>
      </div>

      {/* Desktop: original 50/50 split */}
      <div className="hidden lg:flex h-full w-full">
        <div className="relative flex-1 overflow-hidden bg-[#ece3d7]">
          <Image
            src="/images/photosession/webp/GK2A9147.webp"
            alt="Tomiris Collection Astana"
            fill
            className="object-cover object-center"
            priority
            quality={72}
            sizes="50vw"
          />
        </div>
        <div
          className="flex-1 flex flex-col items-center justify-center px-12 text-center"
          style={{ backgroundColor: '#fafaf9' }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#a8a29e', fontFamily: 'var(--font-montserrat), sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>
            2026
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 400,
              color: '#292524',
              lineHeight: 1,
              marginBottom: '12px',
              letterSpacing: '0.05em',
            }}
          >
            TOMIRIS
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: '1.1rem',
              color: '#78716c',
              fontWeight: 300,
              letterSpacing: '0.14em',
            }}
          >
            Collection Astana
          </p>

          <div style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#a8a29e' }}>
            <button
              type="button"
              onClick={dismiss}
              style={{
                border: '1px solid rgba(41, 37, 36, 0.2)',
                background: '#292524',
                color: '#fafaf9',
                padding: '14px 30px',
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat), sans-serif',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-1px)'
                event.currentTarget.style.opacity = '0.92'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'translateY(0)'
                event.currentTarget.style.opacity = '1'
              }}
            >
              {copy.button}
            </button>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', fontFamily: 'var(--font-montserrat), sans-serif', textTransform: 'uppercase' }}>
              {copy.hint}
            </p>
            <svg
              style={{ width: '18px', height: '18px', animation: 'bounce 1s infinite', marginTop: '4px' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
