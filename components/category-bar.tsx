'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories } from '@/data/categories'
import { useT } from '@/locales'
import { useLanguage } from '@/context/LanguageContext'

export function CategoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = useT()
  const { locale } = useLanguage()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  const getCategoryName = (cat: typeof categories[number]) => {
    if (locale === 'kk') return cat.nameKk
    if (locale === 'en') return cat.nameEn
    return cat.nameRu
  }

  return (
    <section id="catalog" className="relative border-y border-border bg-background">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-0 bottom-0 z-10 px-4 bg-gradient-to-r from-background to-transparent text-foreground hover:opacity-70 transition-opacity"
        aria-label={t.catalog.scrollLeft}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide px-14 py-5 gap-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <a
          href="/catalog"
          className="shrink-0 text-[10px] tracking-[0.3em] text-foreground hover:text-muted-foreground transition-colors font-sans uppercase font-medium"
        >
          {t.catalog.all}
        </a>
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            className="shrink-0 text-[10px] tracking-[0.3em] text-foreground hover:text-muted-foreground transition-colors font-sans uppercase font-normal"
          >
            {getCategoryName(cat)}
          </a>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-0 bottom-0 z-10 px-4 bg-gradient-to-l from-background to-transparent text-foreground hover:opacity-70 transition-opacity"
        aria-label={t.catalog.scrollRight}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </section>
  )
}
