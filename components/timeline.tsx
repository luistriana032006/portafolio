const MILESTONES = [
  {
    year: '2025',
    event: 'Tutor — Dev Senior Code',
    detail: 'Formó a más de 220 estudiantes en Java y Spring Boot de forma virtual.',
    highlight: false,
  },
  {
    year: '2025',
    event: 'Desarrollo de Trident-AI',
    detail: 'Publicación de Trident-AI, herramienta de inteligencia artificial construida desde cero.',
    highlight: false,
  },
  {
    year: '2026',
    event: 'Graduado SENA — En proceso',
    detail: 'Técnico en desarrollo de software por el SENA. Graduación estimada: 2026.',
    highlight: false,
  },
  {
    year: '2026',
    event: 'Participante — GCI World · Matsuo-Iwasawa Lab',
    detail: 'Programa de investigación global en la Universidad de Tokyo.',
    highlight: true,
  },
  {
    year: '2027',
    event: "Meta → Master's en ML Engineering · MBZUAI, Dubai",
    detail: "Mohamed bin Zayed University of Artificial Intelligence — el objetivo final.",
    highlight: true,
  },
  {
    year: '2028',
    event: 'Ingeniero en Desarrollo de Software — Iberoamericana',
    detail: 'Grado en Ingeniería en Desarrollo de Software · Corporación Universitaria Iberoamericana. Actualmente en 4to semestre, modalidad virtual.',
    highlight: true,
  },
]

export function Timeline() {
  return (
    <section id="logros" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">04</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Logros</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
          El camino
          <span className="text-primary"> recorrido</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <ol className="flex flex-col gap-10">
            {MILESTONES.map((m, i) => (
              <li key={i} className="relative flex gap-8 items-start pl-16">
                {/* Dot */}
                <div
                  className="absolute left-0 top-0.5 w-14 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      m.highlight
                        ? 'border-primary bg-primary timeline-dot'
                        : 'border-muted-foreground bg-background'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                    <span
                      className={`font-mono text-sm font-bold ${
                        m.highlight ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {m.year}
                    </span>
                    <h3 className="font-sans font-semibold text-base text-foreground">{m.event}</h3>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
