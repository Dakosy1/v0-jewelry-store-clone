import Image from "next/image"

export function BrandStory() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
        <div className="relative aspect-square lg:aspect-auto min-h-[400px]">
          <Image
            src="/images/brand.jpg"
            alt="Close-up of fine luxury jewelry"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-20 xl:px-32 py-20 lg:py-0">
          <p className="text-[10px] tracking-[0.4em] text-muted-foreground mb-8 font-sans uppercase">
            НАША ФИЛОСОФИЯ
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground leading-[1.2] mb-10 text-balance tracking-tight">
            Красота заслуживает того, чтобы быть замеченной
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-foreground/70 font-sans tracking-wide">
            <p>
              В Tomiris Collection мы верим, что каждое украшение рассказывает свою историю. 
              Наши мастера создают каждое изделие вручную, сочетая традиционные техники с современным минималистичным дизайном.
            </p>
            <p>
              Наша философия проста: продукт и ценность, которую он приносит нашим клиентам, стоят на первом месте. 
              Мы гордимся созданием украшений, которые помогают выразить вашу уникальную элегантность.
            </p>
          </div>
          <div className="mt-12">
            <a
              href="/catalog"
              className="inline-block border border-black text-black px-10 py-4 text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 font-sans uppercase"
            >
              ПОДРОБНЕЕ
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
