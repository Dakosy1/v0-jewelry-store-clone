import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Elegant gold necklace on model"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs tracking-[0.4em] text-gold-light mb-6 font-[family-name:var(--font-inter)]">
          NEW COLLECTION 2026
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-tight text-balance">
          Timeless Elegance
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 font-light max-w-lg text-pretty">
          Discover pieces crafted for those who appreciate the art of fine jewelry
        </p>
        <a
          href="#bestsellers"
          className="mt-10 inline-block border border-primary text-primary px-10 py-3 text-sm tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-[family-name:var(--font-inter)]"
        >
          EXPLORE COLLECTION
        </a>
      </div>
    </section>
  )
}
