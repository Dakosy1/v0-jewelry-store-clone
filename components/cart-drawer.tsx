'use client'

import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useCart } from '@/context/CartContext'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useT } from '@/locales'

export function CartDrawer() {
    const { cart, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalPrice } =
        useCart()
    const t = useT()

    const whatsAppLink = buildWhatsAppLink(cart)

    const formattedTotal = new Intl.NumberFormat('ru-KZ', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0,
    }).format(totalPrice)

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-background border-l border-border rounded-none shadow-none">
                <SheetHeader className="px-8 py-6 border-b border-border">
                    <SheetTitle className="text-[10px] tracking-[0.3em] font-medium font-sans uppercase">
                        {t.cart.title} {totalItems > 0 && `(${totalItems})`}
                    </SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
                        <ShoppingBag strokeWidth={1} className="h-10 w-10 text-foreground/20" />
                        <p className="text-sm text-foreground/60 font-sans tracking-wide">
                            {t.cart.empty}
                        </p>
                        <button
                            onClick={closeCart}
                            className="text-[10px] tracking-[0.2em] text-foreground underline underline-offset-8 font-sans uppercase"
                        >
                            {t.cart.continueShopping}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                            {cart.map(({ product, quantity }) => {
                                const linePrice = new Intl.NumberFormat('ru-KZ', {
                                    style: 'currency',
                                    currency: 'KZT',
                                    maximumFractionDigits: 0,
                                }).format(product.price * quantity)

                                return (
                                    <div key={product.id} className="flex gap-6">
                                        {/* Image */}
                                        <div className="relative w-20 h-28 shrink-0 overflow-hidden bg-muted">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.nameRu}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-1 font-sans uppercase">
                                                    {product.purity} · {product.metal}
                                                </p>
                                                <h4 className="text-xs tracking-wide text-foreground font-sans font-light">
                                                    {product.nameRu}
                                                </h4>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Qty controls */}
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                        aria-label={t.cart.decrease}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-[11px] font-sans">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                        aria-label={t.cart.increase}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                <p className="text-sm text-foreground font-sans">
                                                    {linePrice}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="self-start text-muted-foreground hover:text-foreground transition-colors pt-1"
                                            aria-label={t.cart.remove}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Free shipping progress */}
                        {(() => {
                            const threshold = 50_000
                            const remaining = threshold - totalPrice
                            const progress = Math.min((totalPrice / threshold) * 100, 100)
                            const formattedRemaining = new Intl.NumberFormat('ru-KZ', {
                                style: 'currency',
                                currency: 'KZT',
                                maximumFractionDigits: 0,
                            }).format(remaining)
                            return (
                                <div className="px-8 py-5 border-t border-border space-y-3">
                                    {remaining > 0 ? (
                                        <p className="text-[10px] tracking-[0.15em] text-muted-foreground font-sans">
                                            До бесплатной доставки осталось{' '}
                                            <span className="text-foreground font-medium">{formattedRemaining}</span>
                                        </p>
                                    ) : (
                                        <p className="text-[10px] tracking-[0.15em] text-foreground font-sans font-medium">
                                            Ваша корзина с товарами приедет к вам бесплатно!
                                        </p>
                                    )}
                                    <div className="h-0.5 w-full bg-border overflow-hidden">
                                        <div
                                            className="h-full bg-foreground transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })()}

                        {/* Footer */}
                        <div className="border-t border-border px-8 py-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans uppercase">
                                    {t.cart.total}
                                </span>
                                <span className="text-xl text-foreground font-light font-sans">
                                    {formattedTotal}
                                </span>
                            </div>

                            {/* Checkout via WhatsApp */}
                            <a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-black text-white py-5 text-[10px] tracking-[0.3em] hover:bg-black/90 transition-colors flex items-center justify-center gap-2 font-sans uppercase shadow-lg shadow-black/10"
                                onClick={closeCart}
                            >
                                {t.cart.checkout}
                                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </a>

                            <button
                                onClick={closeCart}
                                className="w-full border border-border text-foreground py-4 text-[10px] tracking-[0.2em] hover:bg-muted transition-colors font-sans uppercase"
                            >
                                {t.cart.continueShopping}
                            </button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
