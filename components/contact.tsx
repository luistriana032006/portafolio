import { Github, Linkedin, MapPin } from 'lucide-react'

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

const LINKS = [
  {
    label: 'GitHub',
    value: 'github.com/luistriana032006',
    href: 'https://github.com/luistriana032006',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/luismigueltr',
    href: 'https://www.linkedin.com/in/luis-triana-2917202a2/',
    icon: Linkedin,
  },
  {
    label: 'TikTok',
    value: 'tiktok.com/@luisdotbit',
    href: 'https://www.tiktok.com/@luisdotbit',
    icon: TikTokIcon,
  },
  {
    label: 'Location',
    value: 'Socorro, Santander, Colombia \u{1F1E8}\u{1F1F4}',
    href: null,
    icon: MapPin,
  },
]

export function Contact() {
  return (
    <section id="contacto" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">05</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Contacto</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — CTA */}
          <div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-foreground text-balance leading-tight mb-6">
              Hablemos.
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted-foreground mb-8">
              Estoy abierto a colaboraciones, proyectos de investigación en ML/IA, y oportunidades que
              se alineen con mi camino hacia MBZUAI 2027.
            </p>
            <a
              href="https://www.linkedin.com/in/luis-triana-2917202a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary bg-primary text-primary-foreground font-sans font-semibold text-sm px-6 py-3 tracking-wide uppercase hover:bg-primary/90 transition-colors"
            >
              <Linkedin size={14} />
              Conectar en LinkedIn
            </a>
          </div>

          {/* Right — links */}
          <div className="flex flex-col gap-1">
            {LINKS.map(({ label, value, href, icon: Icon }) => (
              <div
                key={label}
                className="group flex items-center gap-4 border border-border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center border border-border bg-secondary group-hover:border-primary/40 group-hover:text-primary transition-colors text-muted-foreground">
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-foreground truncate block">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          © 2026 Luis Miguel Triana Rueda
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Socorro, Santander — Colombia
          <span className="text-primary ml-2">{'→'}</span>
          <span className="text-primary ml-1">Dubai 2027</span>
        </span>
      </div>
    </section>
  )
}
