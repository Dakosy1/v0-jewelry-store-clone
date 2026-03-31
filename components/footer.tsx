'use client'

import { useT } from '@/locales'

export function Footer() {
  const t = useT()

  const columns = [
    t.footer.shop,
    t.footer.company,
    t.footer.support,
  ]

  return (
    <footer className="bg-black text-white">
      <div className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-xl tracking-[0.4em] font-light font-sans uppercase">
              TOMIRIS COLLECTION
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
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-white/80 hover:text-white transition-colors font-sans tracking-wide"
                    >
                      {item}
                    </a>
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
          {["Instagram", "Pinterest", "Facebook"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[10px] tracking-widest text-white/40 hover:text-white transition-colors font-sans uppercase"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
