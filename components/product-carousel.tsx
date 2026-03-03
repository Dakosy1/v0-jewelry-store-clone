"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "CLASSIC GOLD HOOPS",
    price: "$340",
    image: "/images/product-1.jpg",
    category: "Earrings",
  },
  {
    id: 2,
    name: "CHAIN LINK BRACELET",
    price: "$520",
    image: "/images/product-2.jpg",
    category: "Bracelets",
  },
  {
    id: 3,
    name: "DIAMOND SOLITAIRE RING",
    price: "$1,280",
    image: "/images/product-3.jpg",
    category: "Rings",
  },
  {
    id: 4,
    name: "CIRCLE PENDANT NECKLACE",
    price: "$460",
    image: "/images/product-4.jpg",
    category: "Necklaces",
  },
  {
    id: 5,
    name: "LAYERED CHAIN NECKLACE",
    price: "$680",
    image: "/images/product-5.jpg",
    category: "Necklaces",
  },
  {
    id: 6,
    name: "STACKING RINGS SET",
    price: "$390",
    image: "/images/product-6.jpg",
    category: "Rings",
  },
  {
    id: 7,
    name: "MATTE GOLD CUFF",
    price: "$750",
    image: "/images/product-7.jpg",
    category: "Bracelets",
  },
  {
    id: 8,
    name: "PEARL DROP EARRINGS",
    price: "$420",
    image: "/images/product-8.jpg",
    category: "Earrings",
  },
  {
    id: 9,
    name: "SIGNET RING",
    price: "$560",
    image: "/images/product-9.jpg",
    category: "Rings",
  },
  {
    id: 10,
    name: "DIAMOND TENNIS BRACELET",
    price: "$2,100",
    image: "/images/product-10.jpg",
    category: "Bracelets",
  },
  {
    id: 11,
    name: "CHARM ANKLET",
    price: "$280",
    image: "/images/product-11.jpg",
    category: "Anklets",
  },
  {
    id: 12,
    name: "DIAMOND EAR CUFF",
    price: "$890",
    image: "/images/product-12.jpg",
    category: "Earrings",
  },
]

export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="bestsellers" className="py-16 lg:py-24">
      <div className="flex items-center justify-between px-6 lg:px-10 mb-10">
        <h2 className="text-3xl md:text-4xl font-light text-foreground">
          Bestsellers
        </h2>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:inline text-xs tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
          >
            VIEW ALL
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-6 lg:px-10 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <a
            key={product.id}
            href="#"
            className="group shrink-0 w-[260px] md:w-[300px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="300px"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="w-full py-3 bg-primary text-primary-foreground text-xs tracking-[0.15em] hover:bg-gold-dark transition-colors font-[family-name:var(--font-inter)]">
                  QUICK ADD
                </button>
              </div>
            </div>
            <p className="text-xs tracking-[0.1em] text-muted-foreground mb-1 font-[family-name:var(--font-inter)]">
              {product.category}
            </p>
            <h3 className="text-sm tracking-[0.05em] text-foreground mb-1 font-[family-name:var(--font-inter)]">
              {product.name}
            </h3>
            <p className="text-sm text-primary font-[family-name:var(--font-inter)]">
              {product.price}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
