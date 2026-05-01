'use client'

import { useEffect, useState } from 'react'
import { useT } from '@/locales'

export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const t = useT()
  const messages = t.announcement

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="h-9 bg-foreground text-background flex items-center justify-center overflow-hidden">
      <p
        className="text-[10px] tracking-[0.25em] font-sans uppercase transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[index]}
      </p>
    </div>
  )
}
