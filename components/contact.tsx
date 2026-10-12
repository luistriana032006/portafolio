import { ArrowUp, Linkedin } from 'lucide-react'
import { Magnetic } from './magnetic'
import { Reveal, SectionLabel } from './reveal'
import { Terminal } from './terminal'
import { SectionWatermark } from './section-watermark'

export function Contact() {
  return (
    <section id="contacto" className="relative isolate py-24 md:py-32 border-t border-border overflow-hidden">
      <SectionWatermark index="06" side="left" />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(232,97,58,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <SectionLabel index="06" label="Contacto" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — CTA */}
          <Reveal>
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-foreground text-balance leading-tight mb-6">
              Hablemos<span className="text-primary cyan-glow-text">.</span>
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted-foreground mb-8">
              Estoy abierto a colaboraciones, proyectos de investigación en ML/IA, y oportunidades que
              ayuden a crecer a las entidades.
            </p>
            <Magnetic className="inline-block">
              <a
                href="https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine relative overflow-hidden inline-flex items-center gap-2 border border-primary bg-primary text-primary-foreground font-sans font-semibold text-sm px-6 py-3 tracking-wide uppercase transition-shadow hover:cyan-glow"
              >
                <Linkedin size={14} />
                Conectar en LinkedIn
              </a>
            </Magnetic>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              <span className="text-primary">&gt;</span> o prueba la terminal{' '}
              <span className="hidden md:inline">→</span>
              <span className="md:hidden">↓</span>
            </p>
          </Reveal>

          {/* Right — terminal */}
          <Reveal delay={0.15}>
            <Terminal />
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div className="relative max-w-5xl mx-auto px-6 mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">© 2026 Luis Miguel Triana Rueda</span>
        <span className="font-mono text-xs text-muted-foreground">
          Socorro, Santander — Colombia
          <span className="text-primary ml-2">{'→'}</span>
          <span className="text-primary ml-1">Dubai 2027</span>
        </span>
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
        >
          Arriba
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  )
}
