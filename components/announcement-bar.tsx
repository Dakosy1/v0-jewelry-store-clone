'use client'

import { useEffect, useState } from 'react'
import { useT } from '@/locales'

export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const t = useT()
  const messages = t.announcement

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [messages.length])

  // Каждая фраза — отдельный элемент в одной ячейке сетки, меняется только прозрачность.
  // Если менять текст в одном элементе, WebView Instagram на iOS оставляет куски старой фразы.
  // Новая фраза появляется с задержкой, когда старая уже погасла, — чтобы они не накладывались.
  return (
    <div className="h-9 bg-foreground text-background grid place-items-center overflow-hidden px-4">
      {messages.map((message, i) => (
        <p
          key={i}
          className="[grid-area:1/1] text-center text-[10px] leading-tight tracking-[0.25em] font-sans uppercase transition-opacity duration-400"
          style={{ opacity: i === index ? 1 : 0, transitionDelay: i === index ? '400ms' : '0ms' }}
          aria-hidden={i !== index}
        >
          {message}
        </p>
      ))}
    </div>
  )
}
