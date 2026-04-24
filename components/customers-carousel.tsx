'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const REELS = [
  'DNVxZAiM35J',
  'DNibXgMsuUk',
  'DJR4X1gM-Qe',
  'DJPeELPsnth',
  'DIqHRiFz1Oi',
  'DVd2iDCjFdB',
]

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function CustomersCarousel() {
  const [start, setStart] = useState(0)
  const total = REELS.length

  const next = () => setStart(s => mod(s + 1, total))
  const prev = () => setStart(s => mod(s - 1, total))

  const visibleReels = Array.from({ length: 5 }, (_, i) =>
    REELS[mod(start + i, total)]
  )

  return (
    <section id="our-clients" className="py-24 lg:py-32 bg-background">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-16">
        Наши клиенты
      </h2>

      <div className="flex items-center gap-3 px-16 xl:px-24">
        <button
          onClick={prev}
          className="shrink-0 h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all"
          aria-label="Назад"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {visibleReels.map((reelId) => (
          <div
            key={reelId}
            className="flex-1 rounded-2xl overflow-hidden shadow-md"
            style={{ aspectRatio: '9/16' }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reelId}/embed/`}
              className="w-full h-full border-0"
              scrolling="no"
              allowFullScreen
              title={`Reel ${reelId}`}
            />
          </div>
        ))}

        <button
          onClick={next}
          className="shrink-0 h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all"
          aria-label="Вперёд"
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
