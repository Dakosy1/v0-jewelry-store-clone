import Image from "next/image"

export function BrandStory() {
  return (
    <section id="about" className="py-16 lg:py-24 border-t border-border">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative aspect-square lg:aspect-auto">
          <Image
            src="/images/brand.jpg"
            alt="Close-up of hands wearing fine gold rings"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0">
          <p className="text-xs tracking-[0.4em] text-primary mb-6 font-[family-name:var(--font-inter)]">
            OUR PHILOSOPHY
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight mb-8 text-balance">
            Beauty Deserves to Be Noticed
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-6 font-[family-name:var(--font-inter)]">
            At AURELIA, we believe that every piece of jewelry tells a story. Our
            artisans handcraft each creation using ethically sourced materials,
            blending traditional techniques with contemporary design.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground mb-10 font-[family-name:var(--font-inter)]">
            Our philosophy is simple: the product and the value it brings to
            our clients come first. We take pride in creating jewelry that helps
            you express your unique elegance and feel confident in every moment.
          </p>
          <a
            href="#"
            className="inline-block self-start border border-primary text-primary px-8 py-3 text-xs tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-[family-name:var(--font-inter)]"
          >
            LEARN MORE
          </a>
        </div>
      </div>
    </section>
  )
}
