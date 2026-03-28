'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { CartItem, Product } from '@/types/product'

interface CartContextValue {
    cart: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = 'tomiris_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // Загружаем корзину из localStorage при монтировании
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY)
            if (stored) setCart(JSON.parse(stored))
        } catch {
            // ignore
        }
    }, [])

    // Сохраняем в localStorage при каждом изменении
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
        } catch {
            // ignore
        }
    }, [cart])

    const addToCart = useCallback((product: Product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { product, quantity }]
        })
        setIsOpen(true)
    }, [])

    const removeFromCart = useCallback((productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId))
    }, [])

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.product.id !== productId))
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            )
        }
    }, [])

    const clearCart = useCallback(() => setCart([]), [])
    const openCart = useCallback(() => setIsOpen(true), [])
    const closeCart = useCallback(() => setIsOpen(false), [])

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
    return ctx
}
