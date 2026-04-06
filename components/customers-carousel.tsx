'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { customerPhotos } from '@/data/customers'

export function CustomersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="our-clients" className="py-24 lg:py-32 bg-background">
      {/* Centered title */}
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight mb-12">
        Наши клиенты
      </h2>

      {/* Carousel with overlaid arrows */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Назад"
        >
          <ChevronLeft className="h-4 w-4 text-black" strokeWidth={1.5} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Вперёд"
        >
          <ChevronRight className="h-4 w-4 text-black" strokeWidth={1.5} />
        </button>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {customerPhotos.map((customer) => (
            <div key={customer.id} className="relative shrink-0 w-[calc(100%/2.2)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/5.2)]">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={customer.image}
                  alt={customer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  unoptimized={customer.image.endsWith('.gif')}
                />
                {/* Text overlay at bottom */}
                {customer.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-4">
                    <p className="text-white text-[9px] tracking-[0.15em] uppercase font-sans leading-tight">
                      {customer.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
