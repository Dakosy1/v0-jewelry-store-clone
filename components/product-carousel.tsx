'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { useT } from '@/locales'
import type { Product } from '@/types/product'

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = useT()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data.filter((p: Product) => p.isBestseller) : [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="bestsellers" className="py-24 lg:py-32 bg-background">
      <div className="flex items-center justify-between px-6 lg:px-10 mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
          {t.homeSections.bestsellers}
        </h2>
        <div className="flex items-center gap-8">
          <a
            href="/catalog"
            className="hidden md:inline text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase underline underline-offset-8"
          >
            {t.homeSections.allCatalog}
          </a>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:opacity-50 transition-all rounded-full"
              aria-label={t.homeSections.previousProducts}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:opacity-50 transition-all rounded-full"
              aria-label={t.homeSections.nextProducts}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-6 lg:px-10 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="w-[300px] h-[400px] bg-secondary animate-pulse" />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="px-6 text-muted-foreground">{t.homeSections.noProducts}</p>
        )}
      </div>
    </section>
  )
}
