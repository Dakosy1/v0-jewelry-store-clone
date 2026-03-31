import type { Metadata, Viewport } from 'next'
import { Commissioner, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const commissioner = Commissioner({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-commissioner',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${commissioner.variable} ${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
