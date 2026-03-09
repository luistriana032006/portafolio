import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    index: '01',
    name: 'Trident-AI',
    description:
      'Asistente de IA local con FastAPI + Spring Boot + React. Tres pilares: Inteligencia Local (Ollama), Datos Estructurados (APIs), Búsqueda Web. Diseñado para correr 100% offline en hardware personal.',
    tags: ['Python', 'FastAPI', 'Ollama', 'React', 'Spring Boot'],
    link: null,
    stat: null,
  },
  {
    index: '02',
    name: 'Predicción de Precios Agrícolas',
    description:
      'Modelo de predicción de precios para cacaoteros y cafeteros en Santander, Colombia. Datos: SIPSA/DANE, Agronet, IDEAM, Fedecacao. Proyecto del programa GCI World del Matsuo-Iwasawa Lab, Universidad de Tokyo.',
    tags: ['ML', 'Python', 'SIPSA', 'Pandas', 'Time Series'],
    link: null,
    stat: 'GCI World · U. Tokyo',
  },
  {
    index: '03',
    name: 'SLAS',
    description:
      'Sistema de Liquidación de Aportes a Seguridad Social — REST API en Spring Boot para cálculo de contribuciones al sistema de seguridad social colombiano. Presentado a Aportes en Línea.',
    tags: ['Java', 'Spring Boot', 'REST API', 'Colombia'],
    link: null,
    stat: 'Presentado a Aportes en Línea',
  },
]

export function Projects() {
  return (
    <section id="proyectos" className="py-24 md:py-32 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">03</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Proyectos Destacados</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
          Cosas que he
          <span className="text-primary"> construido</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.index}
              className="card-hover group relative flex flex-col border border-border bg-background p-6"
            >
              {/* Index */}
              <span className="font-mono text-xs text-muted-foreground/40 mb-4">{project.index}</span>

              {/* Title row */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="font-sans font-bold text-lg text-foreground leading-tight">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Ver ${project.name}`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Stat badge */}
              {project.stat && (
                <div className="mb-5">
                  <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/10 px-2.5 py-1">
                    {project.stat}
                  </span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-muted-foreground border border-border bg-secondary px-2 py-0.5 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

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
