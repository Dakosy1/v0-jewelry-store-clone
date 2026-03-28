'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types/product'
import { useState, useEffect } from 'react'

const metalLabels: Record<string, string> = {
  gold: 'Жёлтое золото',
  'rose-gold': 'Розовое золото',
  silver: 'Серебро',
  platinum: 'Платина',
}

const stoneLabels: Record<string, string> = {
  diamond: 'Бриллиант',
  ruby: 'Рубин',
  sapphire: 'Сапфир',
  emerald: 'Изумруд',
  pearl: 'Жемчуг',
  'cubic-zirconia': 'Фианит',
  none: '—',
}

interface Props {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.slug === params.slug)
        setProduct(found || null)
        setLoading(false)
      })
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) notFound()

    const formattedPrice = new Intl.NumberFormat('ru-KZ', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0,
    }).format(product.price)

    const formattedOldPrice = product.oldPrice
        ? new Intl.NumberFormat('ru-KZ', {
            style: 'currency',
            currency: 'KZT',
            maximumFractionDigits: 0,
        }).format(product.oldPrice)
        : null

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                {/* Breadcrumb */}
                <div className="px-6 lg:px-10 py-5 border-b border-border bg-background">
                    <a
                        href="/catalog"
                        className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                        НАЗАД В КАТАЛОГ
                    </a>
                </div>
 
                <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[80vh] bg-background">
                    {/* Image */}
                    <div className="relative aspect-square lg:aspect-auto min-h-[500px] bg-muted">
                        <Image
                            src={product.images[0]}
                            alt={product.nameRu}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute top-0 left-0 flex flex-col gap-px">
                            {product.isNew && (
                                <span className="bg-black text-white text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">
                                    New
                                </span>
                            )}
                            {product.oldPrice && (
                                <span className="bg-destructive text-white text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">
                                    Sale
                                </span>
                            )}
                        </div>
                    </div>
 
                    {/* Details */}
                    <div className="flex flex-col justify-center px-8 lg:px-20 xl:px-24 py-16 lg:py-0">
                        {/* Category */}
                        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4 font-sans uppercase">
                            {metalLabels[product.metal]} · {product.purity} проба
                        </p>
 
                        {/* Name */}
                        <h1 className="text-4xl md:text-5xl font-light text-foreground leading-[1.2] mb-8 tracking-tight">
                            {product.nameRu}
                        </h1>
 
                        {/* Price */}
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-2xl text-foreground font-normal font-sans">
                                {formattedPrice}
                            </span>
                            {formattedOldPrice && (
                                <span className="text-lg text-muted-foreground line-through font-sans">
                                    {formattedOldPrice}
                                </span>
                            )}
                        </div>
 
                        {/* Specs */}
                        <div className="border border-border divide-y divide-border mb-10">
                            {[
                                { label: 'Металл', value: metalLabels[product.metal] },
                                { label: 'Проба', value: `${product.purity}` },
                                ...(product.stone && product.stone !== 'none'
                                    ? [{ label: 'Камень', value: stoneLabels[product.stone] ?? product.stone }]
                                    : []),
                                ...(product.weight ? [{ label: 'Вес', value: `${product.weight} г` }] : []),
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between px-5 py-4">
                                    <span className="text-[10px] tracking-[0.1em] text-muted-foreground font-sans uppercase">
                                        {label}
                                    </span>
                                    <span className="text-xs text-foreground font-sans font-light">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
 
                        {/* Description */}
                        <p className="text-sm text-foreground/70 leading-relaxed mb-12 font-sans tracking-wide">
                            {product.description}
                        </p>
 
                        {/* Add to cart */}
                        {product.inStock ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center justify-center gap-3 bg-black text-white py-5 text-[10px] tracking-[0.3em] hover:bg-black/80 transition-all duration-300 font-sans uppercase shadow-xl shadow-black/5"
                            >
                                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                                ДОБАВИТЬ В КОРЗИНУ
                            </button>
                        ) : (
                            <div className="py-5 text-center text-[10px] tracking-[0.2em] text-muted-foreground border border-border font-sans uppercase">
                                НЕТ В НАЛИЧИИ
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
