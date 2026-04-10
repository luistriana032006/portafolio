import { FileText } from 'lucide-react'

const RESEARCH = [
  {
    index: '01',
    title: 'Colombia & Artificial Intelligence: Five Actions for Real Digital Sovereignty',
    description:
      'A formal policy document distributed to presidential candidates for Colombia\'s 2026 elections, proposing concrete AI governance actions.',
    file: '/docs/analisis-ia-colombia.pdf',
  },
  {
    index: '02',
    title: 'Del Colegio a la Programación: Un Viaje de Desaprendizaje y Transformación Educativo',
    description:
      'Reflexión personal sobre lo que cuesta aprender tecnología viniendo de una educación formal en Colombia — y todo lo que hay que desaprender en el camino.',
    file: '/docs/analisis-educacion-colombia.pdf',
  },
  {
    index: '03',
    title: 'OpenClaw Setup on Ubuntu',
    description:
      'Guía técnica completa para instalar y configurar OpenClaw en Ubuntu 24 — agentes autónomos de IA con integración a Telegram, múltiples modelos vía OpenRouter y búsqueda web en tiempo real con Gemini.',
    file: '/docs/openclaw-setup-ubuntu-luis-triana (1).pdf',
  },
]

export function Research() {
  return (
    <section id="research" className="py-24 md:py-32 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">04</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Research & Analysis</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
          Cosas que he
          <span className="text-primary"> investigado</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {RESEARCH.map((item) => (
            <article
              key={item.index}
              className="card-hover group relative flex flex-col border border-border bg-card p-6"
            >
              {/* Index */}
              <span className="font-mono text-xs text-muted-foreground/40 mb-4">{item.index}</span>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg text-foreground leading-tight mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {item.description}
              </p>

              {/* Read PDF button */}
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors px-4 py-2 self-start"
              >
                <FileText size={13} />
                Read PDF
              </a>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
