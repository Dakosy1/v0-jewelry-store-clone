'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useT } from '@/locales'

const collectionImages: Record<string, string> = {
  silver: '/images/photosession/webp/GK2A9158.webp',
  'medical-steel': '/images/photosession/webp/GK2A9171.webp',
  'toy-bastar': '/images/photosession/webp/GK2A9476.webp',
  'kyz-uzatu': '/images/photosession/webp/GK2A9611.webp',
}

const fallbackImages = [
  {
    slug: 'silver',
    image: '/images/photosession/webp/GK2A9158.webp',
  },
  {
    slug: 'medical-steel',
    image: '/images/photosession/webp/GK2A9171.webp',
  },
  {
    slug: 'toy-bastar',
    image: '/images/photosession/webp/GK2A9476.webp',
  },
  {
    slug: 'kyz-uzatu',
    image: '/images/photosession/webp/GK2A9611.webp',
  },
]

export function CollectionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const t = useT()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="px-6 lg:px-12 mb-12">
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground mb-4 font-sans uppercase">{t.homeSections.collectionsLabel}</p>
        <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight font-serif">
          {t.homeSections.collectionsHeading}
        </h2>
      </div>

      <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {t.homeSections.collections.map((col, i) => (
          <Link
            key={col.slug}
            href={`/catalog/${col.slug}`}
            className="group relative overflow-hidden bg-background block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-50px)',
              transition: visible
                ? `opacity 0.85s ease ${i * 0.18}s, transform 0.85s ease ${i * 0.18}s`
                : 'none',
            }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={collectionImages[col.slug] ?? fallbackImages[i]?.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={72}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-[9px] tracking-[0.3em] font-sans uppercase mb-1">
                  {col.subtitle}
                </p>
                <h3 className="text-white text-xl font-light font-serif leading-tight">
                  {col.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
