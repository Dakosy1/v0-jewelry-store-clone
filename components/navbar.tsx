"use client"

import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <a href="#" className="text-foreground tracking-[0.3em] text-lg font-semibold font-sans">
            AURELIA
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <a href="#catalog" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]">
            CATALOG
          </a>
          <a href="#bestsellers" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]">
            BESTSELLERS
          </a>
          <a href="#about" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]">
            ABOUT
          </a>
          <a href="#contact" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]">
            CONTACT
          </a>
        </div>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="text-foreground hover:text-primary transition-colors">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-[family-name:var(--font-inter)]">
              0
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="flex flex-col px-6 py-6 gap-4">
            <a href="#catalog" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]" onClick={() => setMobileMenuOpen(false)}>
              CATALOG
            </a>
            <a href="#bestsellers" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]" onClick={() => setMobileMenuOpen(false)}>
              BESTSELLERS
            </a>
            <a href="#about" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]" onClick={() => setMobileMenuOpen(false)}>
              ABOUT
            </a>
            <a href="#contact" className="text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-inter)]" onClick={() => setMobileMenuOpen(false)}>
              CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
