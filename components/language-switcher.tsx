'use client'

import { useLanguage } from '@/context/LanguageContext'
import type { Locale } from '@/locales'

const locales: Locale[] = ['ru', 'kk', 'en']

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-1">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLocale(l)}
            className={`text-[10px] tracking-[0.15em] font-sans transition-colors uppercase ${
              locale === l
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {l}
          </button>
          {i < locales.length - 1 && (
            <span className="text-[10px] text-border mx-1 select-none">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
