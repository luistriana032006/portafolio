import { Github, Linkedin, MapPin } from 'lucide-react'

const LINKS = [
  {
    label: 'GitHub',
    value: 'github.com/luistriana032006',
    href: 'https://github.com/luistriana032006',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/luis-miguel-triana-rueda-2917202a2',
    href: 'https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2',
    icon: Linkedin,
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
          <span className="font-mono text-primary text-sm tracking-widest uppercase">06</span>
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
              href="https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2"
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
