'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/context/CartContext'
import { useT } from '@/locales'
import type { Product, ProductColor } from '@/types/product'
import { useState, useEffect } from 'react'
import { getProductColorLabel, getProductColorSwatch } from '@/lib/product-colors'

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const t = useT()

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find((p: Product) => p.slug === slug) : null
        setProduct(found || null)
        setSelectedColor(found?.selectedColor ?? found?.colors?.[0] ?? null)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [slug])

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

    const metalLabel = product.metal ? (t.metals[product.metal as keyof typeof t.metals] ?? product.metal) : null
    const purityLabel = product.purity ? (t.purities[product.purity as keyof typeof t.purities] ?? product.purity) : null
    const stoneLabel = product.stone ? (t.stones[product.stone as keyof typeof t.stones] ?? product.stone) : null
    const getLocalizedColorLabel = (color: ProductColor) =>
        t.productColors[color as keyof typeof t.productColors] ?? getProductColorLabel(color)

    const specs = [
        { label: t.product.barcode, value: product.barcode },
        ...(selectedColor ? [{ label: t.product.selectedColor, value: getLocalizedColorLabel(selectedColor) }] : []),
        ...(metalLabel ? [{ label: t.product.specs.metal, value: metalLabel }] : []),
        ...(purityLabel ? [{ label: t.product.specs.purity, value: purityLabel }] : []),
        ...(product.stone && product.stone !== 'none'
            ? [{ label: t.product.specs.stone, value: stoneLabel ?? product.stone }]
            : []),
        ...(product.weight ? [{ label: t.product.specs.weight, value: `${product.weight} ${t.product.specs.grams}` }] : []),
    ]

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                {/* Breadcrumb */}
                <div className="px-6 lg:px-10 py-5 border-b border-border bg-background">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {t.product.backToCatalog}
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[80vh] bg-background">
                    {/* Images */}
                    <div className="flex flex-col lg:flex-row gap-0">
                        {/* Thumbnails — слева на десктопе, снизу на мобиле */}
                        {product.images.length > 1 && (
                            <div className="flex lg:flex-col gap-2 p-3 lg:p-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[80vh] order-2 lg:order-1">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveImage(i)}
                                        className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden border-2 transition-all ${activeImage === i ? 'border-foreground' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Main image */}
                        <div className="relative flex-1 min-h-[500px] bg-muted order-1 lg:order-2 flex items-center justify-center">
                            <Image
                                src={product.images[activeImage] ?? product.images[0]}
                                alt={product.nameRu}
                                fill
                                className="object-contain"
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
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center px-4 md:px-8 lg:px-20 xl:px-24 py-16 lg:py-0">
                        {/* Category */}
                        {(metalLabel || purityLabel) && (
                          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4 font-sans uppercase">
                            {[metalLabel, purityLabel].filter(Boolean).join(' · ')}
                          </p>
                        )}

                        {/* Name */}
                        <h1 className="text-4xl md:text-5xl font-light text-foreground leading-[1.2] mb-8 tracking-tight font-serif">
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
                        {product.colors.length > 0 && selectedColor && (
                            <div className="mb-8">
                                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-3">
                                    {t.product.colorOptions}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color) => {
                                        const active = selectedColor === color
                                        return (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setSelectedColor(color)}
                                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${active
                                                    ? 'border-foreground bg-foreground text-background'
                                                    : 'border-border text-foreground hover:border-foreground/50'
                                                    }`}
                                            >
                                                <span
                                                    className="h-4 w-4 rounded-full border border-black/10"
                                                    style={{ backgroundColor: getProductColorSwatch(color) }}
                                                />
                                                {getLocalizedColorLabel(color)}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="border border-border divide-y divide-border mb-10">
                            {specs.map(({ label, value }) => (
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
                        {product.inStock && product.status !== 'archived' ? (
                            <button
                                onClick={() => addToCart({ ...product, selectedColor: selectedColor ?? product.colors[0] })}
                                className="flex items-center justify-center gap-3 bg-black text-white py-5 text-[10px] tracking-[0.3em] hover:bg-black/80 transition-all duration-300 font-sans uppercase shadow-xl shadow-black/5"
                            >
                                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                                {t.product.addToCart}
                            </button>
                        ) : (
                            <div className="py-5 text-center text-[10px] tracking-[0.2em] text-muted-foreground border border-border font-sans uppercase">
                                {t.product.outOfStock}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
