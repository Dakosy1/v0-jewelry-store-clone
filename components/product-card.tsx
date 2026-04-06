'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useT } from '@/locales'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'
import { ProductModal } from './product-modal'

interface ProductCardProps {
    product: Product
    /** Override to fill grid cell width (e.g. in catalog grid). Default: fixed carousel width */
    fullWidth?: boolean
    className?: string
}

export function ProductCard({ product, fullWidth, className }: ProductCardProps) {
    const { addToCart } = useCart()
    const t = useT()
    const [modalOpen, setModalOpen] = useState(false)

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

    return (
        <>
            <div
                onClick={() => setModalOpen(true)}
                className={cn(
                    'group relative block shrink-0 cursor-pointer',
                    fullWidth ? 'w-full' : 'w-[260px] md:w-[300px]',
                    className
                )}
            >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                    <Image
                        src={product.images[0]}
                        alt={product.nameRu}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="300px"
                    />

                    {/* Badges */}
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

                    {/* Quick Add */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                        }}
                        className="absolute bottom-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                        aria-label={t.cart.title}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.25em] text-muted-foreground font-sans uppercase">
                        {metalLabel} · {product.purity}
                    </p>
                    <h3 className="text-sm tracking-[0.05em] text-foreground font-sans font-light">
                        {product.nameRu}
                    </h3>
                    <div className="flex items-center gap-3 pt-1">
                        <p className="text-sm text-foreground font-normal font-sans">
                            {formattedPrice}
                        </p>
                        {formattedOldPrice && (
                            <p className="text-xs text-muted-foreground line-through font-sans">
                                {formattedOldPrice}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <ProductModal product={product} onClose={() => setModalOpen(false)} />
            )}
        </>
    )
}
