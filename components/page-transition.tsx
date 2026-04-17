'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useLayoutEffect } from 'react'

const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicEffect(() => {
    const el = ref.current
    if (!el) return
    // Reset and replay animation on every route change
    el.style.opacity = '0'
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s ease'
        el.style.opacity = '1'
      })
    })
    return () => {
      cancelAnimationFrame(raf)
      el.style.transition = ''
    }
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
