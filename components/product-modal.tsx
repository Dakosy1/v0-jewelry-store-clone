'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useT } from '@/locales'
import { useLanguage } from '@/context/LanguageContext'
import type { Product } from '@/types/product'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()
  const t = useT()
  const { locale } = useLanguage()

  const displayName =
    (locale === 'kk' && product.nameKk) ? product.nameKk :
    (locale === 'en' && product.nameEn) ? product.nameEn :
    product.nameRu

  const displayDescription =
    (locale === 'kk' && product.descriptionKk) ? product.descriptionKk :
    (locale === 'en' && product.descriptionEn) ? product.descriptionEn :
    product.description

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

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
  const stoneLabel =
    product.stone && product.stone !== 'none'
      ? (t.stones[product.stone as keyof typeof t.stones] ?? product.stone)
      : null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 bg-background w-full max-w-3xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-8 w-8 flex items-center justify-center bg-background/90 hover:bg-secondary transition-colors"
          aria-label={t.product.close}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-square md:aspect-auto min-h-[300px] bg-secondary">
          <Image
            src={product.images[0]}
            alt={displayName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-0 left-0 flex flex-col gap-px">
            {product.isNew && (
              <span className="bg-black text-white text-[9px] tracking-[0.2em] px-2 py-1 uppercase">
                New
              </span>
            )}
            {product.oldPrice && (
              <span className="bg-destructive text-white text-[9px] tracking-[0.2em] px-2 py-1 uppercase">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col px-4 py-6 md:px-8 md:py-10 gap-5">
          {/* Meta */}
          {(metalLabel || purityLabel) && (
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-sans">
              {[metalLabel, purityLabel].filter(Boolean).join(' · ')}
            </p>
          )}

          {/* Name */}
          <h2 className="text-2xl font-light text-foreground tracking-tight font-serif leading-snug">
            {displayName}
          </h2>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl text-foreground font-normal font-sans">{formattedPrice}</span>
            {formattedOldPrice && (
              <span className="text-sm text-muted-foreground line-through font-sans">
                {formattedOldPrice}
              </span>
            )}
          </div>

          {/* Specs */}
          <div className="border border-border divide-y divide-border">
            <div className="flex justify-between px-4 py-3">
              <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                {t.product.barcode}
              </span>
              <span className="text-xs text-foreground font-sans">{product.barcode}</span>
            </div>
            {metalLabel && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  {t.product.specs.metal}
                </span>
                <span className="text-xs text-foreground font-sans">{metalLabel}</span>
              </div>
            )}
            {purityLabel && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  {t.product.specs.purity}
                </span>
                <span className="text-xs text-foreground font-sans">{purityLabel}</span>
              </div>
            )}
            {stoneLabel && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  {t.product.specs.stone}
                </span>
                <span className="text-xs text-foreground font-sans">{stoneLabel}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  {t.product.specs.weight}
                </span>
                <span className="text-xs text-foreground font-sans">{product.weight} {t.product.specs.grams}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-foreground/60 leading-relaxed font-sans line-clamp-3">
            {displayDescription}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-auto pt-2">
            {product.inStock ? (
              <button
                onClick={() => {
                  addToCart(product)
                  onClose()
                }}
                className="flex items-center justify-center gap-3 bg-black text-white py-4 text-[10px] tracking-[0.3em] hover:bg-black/80 transition-all font-sans uppercase"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                {t.product.addToCart}
              </button>
            ) : (
              <div className="py-4 text-center text-[10px] tracking-[0.2em] text-muted-foreground border border-border font-sans uppercase">
                {t.product.outOfStock}
              </div>
            )}

            <a
              href={`/product/${product.slug}`}
              className="flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase border border-border"
            >
              {t.product.details}
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
