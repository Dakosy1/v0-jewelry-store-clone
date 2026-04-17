'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const collections = [
  {
    slug: 'silver',
    title: 'Серебро',
    subtitle: '925 проба',
    image: '/images/photosession/GK2A9158.JPG',
  },
  {
    slug: 'medical-steel',
    title: 'Медицинская сталь',
    subtitle: 'Гипоаллергенно',
    image: '/images/photosession/GK2A9171.JPG',
  },
  {
    slug: 'toy-bastar',
    title: 'Той Бастар',
    subtitle: 'Подарочные наборы',
    image: '/images/photosession/GK2A9476.JPG',
  },
  {
    slug: 'kyz-uzatu',
    title: 'Кыз Узату',
    subtitle: 'Для невесты',
    image: '/images/photosession/GK2A9611.JPG',
  },
]

export function CollectionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground mb-4 font-sans uppercase">Каталог</p>
        <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight font-serif">
          Коллекции
        </h2>
      </div>

      <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {collections.map((col, i) => (
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
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
