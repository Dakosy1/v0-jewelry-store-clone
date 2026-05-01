'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useT } from '@/locales'

const REELS = [
  '/videos/reel-1.mp4',
  '/videos/reel-2.mp4',
  '/videos/reel-3.mp4',
  '/videos/reel-4.mp4',
  '/videos/reel-5.mp4',
  '/videos/reel-6.mp4',
]

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

function ReelCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-md bg-black cursor-pointer"
      style={{ aspectRatio: '9/16' }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-black fill-black ml-1" />
          </div>
        </div>
      )}
    </div>
  )
}

export function CustomersCarousel() {
  const [start, setStart] = useState(0)
  const total = REELS.length
  const t = useT()

  const next = () => setStart(s => mod(s + 1, total))
  const prev = () => setStart(s => mod(s - 1, total))

  const visibleReels = Array.from({ length: 5 }, (_, i) =>
    REELS[mod(start + i, total)]
  )

  return (
    <section id="our-clients" className="py-24 lg:py-32 bg-background">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-16">
        {t.homeSections.customers}
      </h2>

      <div className="flex items-center gap-2 md:gap-3 px-4 md:px-8 lg:px-16 xl:px-24">
        <button
          onClick={prev}
          className="shrink-0 h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all"
          aria-label={t.homeSections.previous}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {visibleReels.map((src, i) => (
          <div
            key={src + i}
            className={
              i === 0
                ? 'flex flex-1 min-w-0'           // mobile: 1 card
                : i === 1
                ? 'hidden sm:flex flex-1 min-w-0'  // sm+: 2 cards
                : i === 2
                ? 'hidden md:flex flex-1 min-w-0'  // md+: 3 cards
                : 'hidden lg:flex flex-1 min-w-0'  // lg+: 5 cards
            }
          >
            <ReelCard src={src} />
          </div>
        ))}

        <button
          onClick={next}
          className="shrink-0 h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all"
          aria-label={t.homeSections.next}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {REELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === start ? 24 : 8,
              height: 8,
              background: i === start ? '#111' : '#ddd',
            }}
          />
        ))}
      </div>
    </section>
  )
}
