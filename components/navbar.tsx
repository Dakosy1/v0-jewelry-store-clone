'use client'

import { useState } from 'react'
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/cart-drawer'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <nav className="flex items-center justify-between px-6 py-5 lg:px-10 h-20">
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a href="/" className="text-foreground tracking-[0.2em] text-sm font-medium font-sans">
              TOMIRIS COLLECTION
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {[
              { href: '/catalog', label: 'КАТАЛОГ' },
              { href: '/#bestsellers', label: 'ХИТЫ' },
              { href: '/#about', label: 'О НАС' },
              { href: '/#contact', label: 'КОНТАКТЫ' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] tracking-[0.25em] text-foreground hover:text-muted-foreground transition-colors font-sans font-normal"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button aria-label="Поиск" className="text-foreground hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Профиль" className="text-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              aria-label="Корзина"
              className="relative text-foreground hover:text-primary transition-colors"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-[family-name:var(--font-inter)]">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="flex flex-col px-6 py-6 gap-4">
              {[
                { href: '/catalog', label: 'КАТАЛОГ' },
                { href: '/#bestsellers', label: 'ХИТЫ ПРОДАЖ' },
                { href: '/#about', label: 'О НАС' },
                { href: '/#contact', label: 'КОНТАКТЫ' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
