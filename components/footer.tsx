'use client'

import Link from 'next/link'
import { useT } from '@/locales'
import { INSTAGRAM_URL, TELEGRAM_URL, WHATSAPP_URL } from '@/lib/social-links'

export function Footer() {
  const t = useT()

  const columns = [
    {
      title: t.footer.shop.title,
      items: [
        { label: t.footer.shop.items[0], href: '/catalog' },
        { label: t.footer.shop.items[1], href: '/catalog' },
        { label: t.footer.shop.items[2], href: '/catalog' },
        { label: t.footer.shop.items[3], href: '/catalog' },
        { label: t.footer.shop.items[4], href: '/#new-arrivals' },
      ],
    },
    {
      title: t.footer.company.title,
      items: [
        { label: t.footer.company.items[0], href: '/#about' },
        { label: t.footer.company.items[1], href: '/#about' },
        { label: t.footer.company.items[2], href: '/career-with-tomyris' },
        { label: t.footer.company.items[3], href: '/ambassador' },
        { label: t.footer.company.items[4], href: '/#contact' },
      ],
    },
    {
      title: t.footer.support.title,
      items: [
        { label: t.footer.support.items[0], href: '/#contact' },
        { label: t.footer.support.items[1], href: '/catalog' },
        { label: t.footer.support.items[2], href: '/#about' },
        { label: t.footer.support.items[3], href: '/#contact' },
        { label: t.footer.support.items[4], href: '/#contact' },
      ],
    },
  ]

  const socials = [
    { label: 'Instagram', href: INSTAGRAM_URL },
    { label: 'WhatsApp', href: WHATSAPP_URL },
    { label: 'Telegram', href: TELEGRAM_URL },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-xl tracking-[0.4em] font-light font-sans uppercase">
              TOMIRIS COLLECTION ASTANA
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans tracking-wide max-w-[240px]">
              {t.footer.description}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-[10px] tracking-[0.25em] text-white/40 mb-6 font-sans uppercase">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-white/80 hover:text-white transition-colors font-sans tracking-wide"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] tracking-wider text-white/40 font-sans">
          {t.footer.copyright}
        </p>
        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest text-white/40 hover:text-white transition-colors font-sans uppercase"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
