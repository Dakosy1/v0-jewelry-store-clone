"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useT } from "@/locales"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const t = useT()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="max-w-xl mx-auto text-center px-6">
        <p className="text-[10px] tracking-[0.5em] text-muted-foreground mb-8 font-sans uppercase">
          {t.newsletter.label}
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 text-balance tracking-tight">
          {t.newsletter.heading}
        </h2>
        <p className="text-sm text-foreground/60 mb-12 font-sans tracking-wide">
          {t.newsletter.description}
        </p>

        {submitted ? (
          <p className="text-foreground text-sm tracking-[0.1em] font-sans">
            {t.newsletter.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 border-b border-black pb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              required
              className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-sans tracking-wide"
            />
            <button
              type="submit"
              className="text-foreground px-4 py-2 hover:opacity-50 transition-opacity flex items-center gap-2"
              aria-label={t.newsletter.subscribeLabel}
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
