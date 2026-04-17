'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function IntroScreen() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('intro_seen')) return
    setVisible(true)

    const t = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('intro_seen', '1')
      }, 700)
    }, 4000)

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
      className={`fixed inset-0 z-[200] flex cursor-pointer transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={dismiss}
      style={{ height: '100dvh' }}
    >
      {/* Левая половина — фото */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src="/images/photosession/GK2A9147.JPG"
          alt="Tomiris Collection"
          fill
          className="object-cover object-center"
          priority
          sizes="50vw"
        />
      </div>

      {/* Правая половина — текст */}
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
            letterSpacing: '0.15em',
          }}
        >
          Collection
        </p>

        <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#a8a29e' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', fontFamily: 'var(--font-montserrat), sans-serif', textTransform: 'uppercase' }}>
            Нажмите чтобы войти
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
  )
}
