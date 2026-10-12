import { Reveal, RevealGroup, RevealItem, SectionLabel } from './reveal'
import { CountUp, ScrollText } from './scroll-text'
import { PaperPlaneText } from './paper-plane-text'
import { TiltCard } from './tilt-card'
import { SectionWatermark } from './section-watermark'

const STATS = [
  { to: 220, from: 0, suffix: '+', label: 'Estudiantes tutoreados' },
  { to: 2027, from: 2000, suffix: '', label: 'Target MBZUAI Dubai' },
]

export function About() {
  return (
    <section id="sobre-mi" className="relative isolate overflow-hidden py-24 md:py-32 border-t border-border">
      <SectionWatermark index="01" side="right" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel index="01" label="Sobre Mí" />

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left — stat block */}
          <RevealGroup className="flex flex-col gap-6" stagger={0.15}>
            {STATS.map((s) => (
              <RevealItem key={s.label}>
                <TiltCard className="card-glow border border-border bg-card p-6 overflow-hidden" maxTilt={8}>
                  <CountUp
                    to={s.to}
                    from={s.from}
                    suffix={s.suffix}
                    className="font-mono text-4xl font-bold text-primary cyan-glow-text"
                  />
                  <p className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</p>
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Right — paragraph */}
          <Reveal>
            <ScrollText
              className="font-sans text-lg md:text-xl leading-relaxed text-foreground mb-6"
              text="Estudiante de Ingeniería en Desarrollo de Software en la Corporación Universitaria Iberoamericana — actualmente en 5to semestre, modalidad virtual, con graduación estimada en 2028. Técnico SENA en proceso de grado (2026). Fui tutor en Dev Senior Code enseñando Java/Spring Boot a más de 220 estudiantes."
            />
            <ScrollText
              className="font-sans text-lg md:text-xl leading-relaxed text-foreground mb-6"
              text="Hoy hago mi práctica SENA como QA Automation en Rappi, y eso define cómo construyo IA: sistemas trazables, con humano en el loop y verificables."
            />
            <PaperPlaneText
              className="font-sans text-lg md:text-xl leading-relaxed text-foreground mb-8"
              segments={[
                { text: "Mi meta es el Master's en ML Engineering en " },
                { text: 'MBZUAI, Dubai — 2027.', highlight: true },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
