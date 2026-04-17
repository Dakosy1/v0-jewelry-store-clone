'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/types/product'

export function NewArrivalsCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data.filter((p: Product) => p.isNew) : [])
        setLoading(false)
      })
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      })
    }
  }

  if (!loading && products.length === 0) return null

  return (
    <section id="new-arrivals" className="py-24 lg:py-32 bg-secondary/30">
      <div className="flex items-center justify-between px-6 lg:px-10 mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight">
          Новинки
        </h2>
        <div className="flex items-center gap-8">
          <a
            href="/catalog"
            className="hidden md:inline text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase underline underline-offset-8"
          >
            ВЕСЬ КАТАЛОГ
          </a>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:opacity-50 transition-all rounded-full"
              aria-label="Предыдущие товары"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:opacity-50 transition-all rounded-full"
              aria-label="Следующие товары"
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
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  )
}
