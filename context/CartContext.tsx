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

function getCartItemKey(productId: string) {
    return productId
}

function isProductLike(value: unknown): value is Partial<Product> & Pick<Product, 'id' | 'nameRu' | 'price'> {
    if (!value || typeof value !== 'object') return false
    const product = value as Record<string, unknown>
    return (
        typeof product.id === 'string' &&
        typeof product.nameRu === 'string' &&
        typeof product.price === 'number'
    )
}

function sanitizeCart(value: unknown): CartItem[] {
    if (!Array.isArray(value)) return []

    return value.flatMap((item) => {
        if (!item || typeof item !== 'object') return []

        const candidate = item as { product?: unknown; quantity?: unknown }
        if (!isProductLike(candidate.product)) return []

        const product = candidate.product
        const quantity =
            typeof candidate.quantity === 'number' && Number.isFinite(candidate.quantity) && candidate.quantity > 0
                ? Math.floor(candidate.quantity)
                : 1

        return [{
            product: {
                ...product,
                barcode: typeof product.barcode === 'string' ? product.barcode : '',
                slug: typeof product.slug === 'string' ? product.slug : product.id,
                name: typeof product.name === 'string' ? product.name : product.nameRu,
                category: typeof product.category === 'string' ? product.category : 'rings',
                metal: typeof product.metal === 'string' ? product.metal as Product['metal'] : 'gold',
                purity: typeof product.purity === 'string' ? product.purity as Product['purity'] : '585',
                images: Array.isArray(product.images) ? product.images.filter((image): image is string => typeof image === 'string') : [],
                description: typeof product.description === 'string' ? product.description : '',
                inStock: typeof product.inStock === 'boolean' ? product.inStock : true,
                isNew: typeof product.isNew === 'boolean' ? product.isNew : false,
                isBestseller: typeof product.isBestseller === 'boolean' ? product.isBestseller : false,
                oldPrice: typeof product.oldPrice === 'number' ? product.oldPrice : undefined,
                stone: typeof product.stone === 'string' ? product.stone as Product['stone'] : undefined,
                weight: typeof product.weight === 'number' ? product.weight : undefined,
                tags: Array.isArray(product.tags) ? product.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
            } as Product,
            quantity,
        }]
    })
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // Загружаем корзину из localStorage при монтировании
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY)
            if (stored) setCart(sanitizeCart(JSON.parse(stored)))
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
            const cartKey = getCartItemKey(product.id)
            const existing = prev.find((item) => getCartItemKey(item.product.id) === cartKey)
            if (existing) {
                return prev.map((item) =>
                    getCartItemKey(item.product.id) === cartKey
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
