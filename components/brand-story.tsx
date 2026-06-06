'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useT } from '@/locales'

export function BrandStory() {
  const t = useT()
  const b = t.brand as any

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">

        {/* Image */}
        <div className="flex items-center justify-center bg-stone-50">
          <Image
            src="/images/photosession/webp/GK2A9729.webp"
            alt={b.imageAlt}
            width={800}
            height={1067}
            className="w-full h-auto object-contain"
            quality={74}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0">

          <p className="text-[10px] tracking-[0.4em] text-muted-foreground mb-6 font-sans uppercase">
            {b.label}
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.2] mb-4 tracking-tight font-serif">
            {b.heading}
          </h2>

          <p className="text-base text-muted-foreground mb-8 font-sans leading-relaxed">
            {b.subheading}
          </p>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/70 font-sans mb-10">
            <p>{b.p1}</p>
            <p>{b.p2}</p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {b.values.map((v: { title: string; text: string }) => (
              <div key={v.title}>
                <p className="text-[11px] tracking-[0.15em] font-sans font-medium uppercase text-foreground mb-1">
                  {v.title}
                </p>
                <p className="text-xs text-foreground/60 font-sans leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>


          <Link
            href="/catalog"
            className="self-start border border-black text-black px-10 py-4 text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 font-sans uppercase"
          >
            {b.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
