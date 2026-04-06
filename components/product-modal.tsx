'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useT } from '@/locales'
import type { Product } from '@/types/product'

const metalColors: Record<string, string> = {
  gold: '#D4AF37',
  'rose-gold': '#C08080',
  silver: '#C0C0C0',
  platinum: '#E0E0E8',
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()
  const t = useT()

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

  const metalLabel = t.metals[product.metal as keyof typeof t.metals] ?? product.metal
  const stoneLabel =
    product.stone && product.stone !== 'none'
      ? (t.stones[product.stone as keyof typeof t.stones] ?? product.stone)
      : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
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
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-square md:aspect-auto min-h-[300px] bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.nameRu}
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
        <div className="flex flex-col px-8 py-10 gap-5">
          {/* Meta */}
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-sans">
            {metalLabel} · {product.purity}
          </p>

          {/* Name */}
          <h2 className="text-2xl font-light text-foreground tracking-tight font-serif leading-snug">
            {product.nameRu}
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

          {/* Metal color swatch */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Цвет металла
            </p>
            <div className="flex gap-2">
              <div
                className="w-6 h-6 rounded-full ring-2 ring-offset-2 ring-foreground border border-border/50"
                style={{ backgroundColor: metalColors[product.metal] ?? '#ccc' }}
                title={metalLabel}
              />
            </div>
          </div>

          {/* Specs */}
          <div className="border border-border divide-y divide-border">
            <div className="flex justify-between px-4 py-3">
              <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                Металл
              </span>
              <span className="text-xs text-foreground font-sans">{metalLabel}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                Проба
              </span>
              <span className="text-xs text-foreground font-sans">{product.purity}</span>
            </div>
            {stoneLabel && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  Камень
                </span>
                <span className="text-xs text-foreground font-sans">{stoneLabel}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex justify-between px-4 py-3">
                <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase font-sans">
                  Вес
                </span>
                <span className="text-xs text-foreground font-sans">{product.weight} г</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-foreground/60 leading-relaxed font-sans line-clamp-3">
            {product.description}
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
                В корзину
              </button>
            ) : (
              <div className="py-4 text-center text-[10px] tracking-[0.2em] text-muted-foreground border border-border font-sans uppercase">
                Нет в наличии
              </div>
            )}

            <a
              href={`/product/${product.slug}`}
              className="flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans uppercase border border-border"
            >
              Подробнее
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
