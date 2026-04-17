'use client'

import Image from "next/image"
import Link from "next/link"
import { useT } from "@/locales"

export function BrandStory() {
  const t = useT()

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
        <div className="flex items-center justify-center bg-stone-50">
          <Image
            src="/images/photosession/GK2A9729.JPG"
            alt={t.brand.imageAlt}
            width={800}
            height={1067}
            className="w-full h-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-20 xl:px-32 py-20 lg:py-0">
          <p className="text-[10px] tracking-[0.4em] text-muted-foreground mb-8 font-sans uppercase">
            {t.brand.label}
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground leading-[1.2] mb-10 text-balance tracking-tight font-serif">
            {t.brand.heading}
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-foreground/70 font-sans tracking-wide">
            <p>{t.brand.p1}</p>
            <p>{t.brand.p2}</p>
          </div>
          <div className="mt-12">
            <Link
              href="/catalog"
              className="inline-block border border-black text-black px-10 py-4 text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 font-sans uppercase"
            >
              {t.brand.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
