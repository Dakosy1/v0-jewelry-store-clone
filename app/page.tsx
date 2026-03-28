import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { ProductCarousel } from "@/components/product-carousel"
import { BrandStory } from "@/components/brand-story"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <HeroBanner />
        <ProductCarousel />
        <BrandStory />
        <Newsletter />
        <Footer />
      </div>
    </main>
  )
}
