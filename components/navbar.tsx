'use client'

import { useState, useRef } from 'react'
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/cart-drawer'
import { LanguageSwitcher } from '@/components/language-switcher'
import { AnnouncementBar } from '@/components/announcement-bar'
import { useT } from '@/locales'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { totalItems, openCart } = useCart()
  const t = useT()

  const otherNavLinks = [
    { href: '/#bestsellers', label: t.nav.bestsellers },
    { href: '/#about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contacts },
  ]

  const otherMobileLinks = [
    { href: '/#bestsellers', label: t.nav.bestsellersMobile },
    { href: '/#about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contacts },
  ]

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCatalogDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setCatalogDropdownOpen(false), 120)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <AnnouncementBar />
        <nav className="flex items-center justify-between px-6 py-5 lg:px-10 h-20">
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a href="/" className="text-foreground tracking-[0.2em] text-sm font-medium font-sans">
              TOMIRIS COLLECTION
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Catalog with dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/catalog"
                className="flex items-center gap-1 text-[11px] tracking-[0.25em] text-foreground hover:text-muted-foreground transition-colors font-sans font-normal"
              >
                {t.nav.catalog}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${catalogDropdownOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </a>

              {/* Dropdown */}
              {catalogDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background border border-border shadow-lg min-w-[240px] py-2 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* pointer triangle */}
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background border-l border-t border-border rotate-45" />
                  {t.nav.collections.map(({ label, slug }) => (
                    <a
                      key={slug}
                      href={`/catalog?collection=${slug}`}
                      className="block px-6 py-3 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-sans uppercase"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {otherNavLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[11px] tracking-[0.25em] text-foreground hover:text-muted-foreground transition-colors font-sans font-normal"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <button aria-label={t.nav.search} className="text-foreground hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label={t.nav.profile} className="text-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              aria-label={t.nav.cart}
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
              {/* Catalog accordion */}
              <button
                className="flex items-center justify-between text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-sans text-left"
                onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
              >
                {t.nav.catalog}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${mobileCatalogOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
              {mobileCatalogOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l border-border">
                  {t.nav.collections.map(({ label, slug }) => (
                    <a
                      key={slug}
                      href={`/catalog?collection=${slug}`}
                      className="text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-sans"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}

              {otherMobileLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
