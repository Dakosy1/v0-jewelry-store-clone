export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg tracking-[0.3em] text-foreground font-semibold mb-4">
              AURELIA
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-inter)]">
              Handcrafted luxury jewelry for those who appreciate timeless
              elegance and exceptional craftsmanship.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-foreground mb-4 font-[family-name:var(--font-inter)]">
              SHOP
            </h4>
            <ul className="flex flex-col gap-3">
              {["Rings", "Necklaces", "Bracelets", "Earrings", "New Arrivals"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-foreground mb-4 font-[family-name:var(--font-inter)]">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Our Story", "Careers", "Press", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-foreground mb-4 font-[family-name:var(--font-inter)]">
              SUPPORT
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Shipping & Returns",
                "Size Guide",
                "Care Instructions",
                "FAQ",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
          {'© 2026 AURELIA. All rights reserved.'}
        </p>
        <div className="flex items-center gap-6">
          {["Instagram", "Pinterest", "Facebook"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
