"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 border-t border-border">
      <div className="max-w-xl mx-auto text-center px-6">
        <p className="text-xs tracking-[0.4em] text-primary mb-6 font-[family-name:var(--font-inter)]">
          STAY CONNECTED
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
          Be the First to Know
        </h2>
        <p className="text-base text-muted-foreground mb-10 font-[family-name:var(--font-inter)]">
          Subscribe to receive updates on new collections, exclusive offers, and
          the latest from AURELIA.
        </p>

        {submitted ? (
          <p className="text-primary text-sm tracking-[0.1em] font-[family-name:var(--font-inter)]">
            Thank you for subscribing.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-secondary border border-border px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-inter)]"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 hover:bg-gold-dark transition-colors flex items-center gap-2"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
