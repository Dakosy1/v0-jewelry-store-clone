'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { categories } from '@/data/categories'
import { useT } from '@/locales'
import { useLanguage } from '@/context/LanguageContext'
import type { Category, Product } from '@/types/product'

export default function CollectionPage() {
  const params = useParams()
  const collectionSlug = params.collection as string

  const [products, setProducts] = useState<Product[]>([])
  const [collectionName, setCollectionName] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const t = useT()
  const { locale } = useLanguage()

  useEffect(() => {
    // Fetch collection info
    fetch('/api/collections')
      .then(res => res.json())
      .then((data: unknown) => {
        const cols = Array.isArray(data) ? data as Array<{ slug: string; nameRu: string; nameEn: string; nameKk: string }> : []
        const col = cols.find(c => c.slug === collectionSlug)
        if (col) {
          if (locale === 'kk') setCollectionName(col.nameKk)
          else if (locale === 'en') setCollectionName(col.nameEn)
          else setCollectionName(col.nameRu)
        }
      })

    // Fetch products for this collection
    fetch(`/api/products?collection=${collectionSlug}`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [collectionSlug, locale])

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory),
    [activeCategory, products]
  )

  const getCategoryName = (cat: typeof categories[number]) => {
    if (locale === 'kk') return cat.nameKk
    if (locale === 'en') return cat.nameEn
    return cat.nameRu
  }

  // Only show categories that have products in this collection
  const activeCategories = useMemo(
    () => categories.filter(cat => products.some(p => p.category === cat.id)),
    [products]
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* Header */}
        <section className="border-b border-border py-16 px-6 lg:px-10 text-center bg-background">
          <p className="text-[10px] tracking-[0.5em] text-muted-foreground mb-4 font-sans uppercase">
            {t.catalog.label}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight font-serif">
            {collectionName || collectionSlug}
          </h1>
        </section>

        {/* Category filter — only shown when collection has multiple categories */}
        {activeCategories.length > 1 && (
          <section className="border-b border-border bg-background px-6 lg:px-10 py-6 overflow-x-auto sticky top-20 z-40">
            <div className="flex justify-center gap-10 min-w-max">
              <button
                onClick={() => setActiveCategory('all')}
                className={`text-[10px] tracking-[0.25em] transition-all font-sans uppercase pb-2 border-b ${
                  activeCategory === 'all'
                    ? 'text-foreground border-black'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {t.catalog.all}
              </button>
              {activeCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] tracking-[0.25em] transition-all font-sans uppercase pb-2 border-b ${
                    activeCategory === cat.id
                      ? 'text-foreground border-black'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  {getCategoryName(cat)}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Grid */}
        <section className="px-6 lg:px-10 py-16 bg-background">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-24 font-sans tracking-wide">
              {t.catalog.empty}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} fullWidth />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}
