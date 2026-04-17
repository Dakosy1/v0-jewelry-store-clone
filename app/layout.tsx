import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { PageTransition } from '@/components/page-transition'
import { SocialFloat } from '@/components/social-float'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
  weight: ['400', '500', '600'],
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'TOMIRIS COLLECTION — Ювелирные украшения',
  description: 'Ювелирные украшения ручной работы: кольца, серьги, браслеты, колье и цепочки из золота 585/750 пробы. Доставка по Казахстану.',
}

export const viewport: Viewport = {
  themeColor: '#1a1714',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <SocialFloat />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
