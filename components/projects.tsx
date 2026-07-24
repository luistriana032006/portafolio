'use client'

import { FileText, Github, Globe } from 'lucide-react'
import { useState } from 'react'

type ProjectType = 'deployed' | 'case-study'

const PROJECTS: Array<{
  index: string
  type: ProjectType
  name: string
  description: string
  tags: string[]
  link?: string | null
  repoLink?: string | null
  stat?: string | null
  inDev?: boolean
  pdfLink?: string
}> = [
  {
    index: '01',
    type: 'deployed',
    name: 'Salón de Contenido — Dashboard de Operaciones de Contenido',
    description:
      'Dashboard de operaciones de contenido para una media company de LatAm — genera contenido con APIs de IA para creación de contenido, con aprobación humana en cada paso antes de publicar.',
    tags: ['Next.js', 'Operaciones de Contenido', 'Kanban', 'Producto'],
    link: 'https://propuesta30x.luistriana.dev/',
    repoLink: null,
    stat: 'Propuesta interna · 30X',
    inDev: false,
  },
  {
    index: '02',
    type: 'deployed',
    name: 'Trident-AI',
    description:
      'Asistente de IA local con FastAPI + Spring Boot + React. Tres pilares: Inteligencia Local (Ollama), Datos Estructurados (APIs), Búsqueda Web. Diseñado para correr 100% offline en hardware personal.',
    tags: ['Python', 'FastAPI', 'Ollama', 'React', 'Spring Boot'],
    link: null,
    repoLink: 'https://github.com/luistriana032006/trident-ai',
    stat: null,
    inDev: true,
  },
  {
    index: '03',
    type: 'deployed',
    name: 'Análisis de Churn en Telecomunicaciones',
    description:
      'Proyecto final del curso GCI World 2026: a partir de datos reales de una empresa de telecomunicaciones se hace un análisis completo de ciencia de datos (EDA, feature engineering y modelo predictivo) para entender por qué los clientes cancelan el servicio. El resultado se traduce en una propuesta de negocio con presentación dirigida a un cliente, como una consultoría real.',
    tags: ['ML', 'Python', 'EDA', 'Feature Engineering', 'Churn'],
    link: null,
    repoLink: 'https://github.com/luistriana032006/telecom-churn-analysis',
    stat: 'GCI World · U. Tokyo',
    inDev: false,
  },
  {
    index: '04',
    type: 'deployed',
    name: 'SLAS',
    description:
      'Sistema de Liquidación de Aportes a Seguridad Social — REST API en Spring Boot para cálculo de contribuciones al sistema de seguridad social colombiano. Presentado a Aportes en Línea.',
    tags: ['Java', 'Spring Boot', 'REST API', 'Colombia'],
    link: 'https://slas.luistriana.dev/',
    repoLink: 'https://github.com/luistriana032006/slas-sistema-de-liquidacion-de-aportes',
    stat: 'Presentado a Aportes en Línea',
    inDev: false,
  },
  {
    index: '05',
    type: 'case-study',
    name: 'Propuesta técnica — Onboarding del reto de 21 días',
    description:
      'Research aplicado a un problema real de producto: fricción en el onboarding de un reto de 21 días. Propuesta técnica documentada — bot de WhatsApp con IA construido sobre el stack ya existente del negocio analizado.',
    tags: ['Research', 'WhatsApp Bot', 'IA', 'Producto'],
    pdfLink: '/docs/propuesta_onboarding_lab10.pdf',
  },
  {
    index: '06',
    type: 'case-study',
    name: 'Zolvo — Estrategia de expansión a México',
    description:
      'Research y propuesta estratégica para el lanzamiento de Zolvo en México — perfiles de cliente ideal, arquitectura de un agente de ventas con IA, secuencia de contacto y análisis de ROI del cliente. Elaborado para el Makers Admission Challenge 2026.',
    tags: ['Research', 'Ventas', 'IA', 'Estrategia'],
    pdfLink: '/docs/Zolvo_Estrategia_LuisMiguel.pdf',
  },
  {
    index: '07',
    type: 'deployed',
    name: 'Helecho — Editor de apuntes técnicos para Linux',
    description:
      'Editor de escritorio para tomar apuntes técnicos sin LaTeX — símbolos matemáticos con clics, planos cartesianos, KaTeX en tiempo real y exportación a PDF/Word/Excel/PowerPoint. Gratis, local, sin telemetría. Código abierto.',
    tags: ['Electron', 'React', 'TypeScript', 'TipTap', 'KaTeX'],
    link: 'https://helecho.luistriana.dev',
    repoLink: 'https://github.com/luistriana032006/Helecho',
    stat: null,
    inDev: false,
  },
]

const FILTERS: Array<{ key: 'all' | ProjectType; label: string }> = [
  { key: 'all', label: 'Todos' },
  { key: 'deployed', label: 'Desplegados' },
  { key: 'case-study', label: 'Casos de estudio' },
]

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all')
  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)

  return (
    <section id="proyectos" className="py-24 md:py-32 border-t border-border bg-card">
      <div className="w-full px-6 lg:px-10 xl:px-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">03</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Proyectos Destacados</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-10">
          Cosas que he
          <span className="text-primary"> construido</span>
        </h2>

        {/* Tabs de filtro */}
        <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Filtrar proyectos por tipo">
          {FILTERS.map((f) => {
            const count = f.key === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.type === f.key).length
            const active = filter === f.key
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`font-mono text-xs tracking-widest uppercase px-3.5 py-2 border transition-colors ${
                  active
                    ? 'text-primary border-primary/40 bg-primary/10'
                    : 'text-muted-foreground border-border bg-secondary hover:text-foreground hover:border-foreground/40'
                }`}
              >
                {f.label} <span className="opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {filteredProjects.map((project) => (
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
                {project.type === 'deployed' && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-all duration-300 filter-[drop-shadow(0_0_6px_rgba(232,97,58,0.65))] hover:filter-[drop-shadow(0_0_14px_rgba(232,97,58,1))] hover:scale-110"
                        aria-label={`Repositorio de ${project.name}`}
                      >
                        <Github size={22} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.type === 'case-study' && (
                  <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/10 px-2.5 py-1">
                    Caso de estudio
                  </span>
                )}
                {project.inDev && (
                  <span className="font-mono text-xs text-amber-400 border border-amber-400/30 bg-amber-400/10 px-2.5 py-1">
                    En desarrollo
                  </span>
                )}
                {project.stat && (
                  <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/10 px-2.5 py-1">
                    {project.stat}
                  </span>
                )}
              </div>

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

              {/* Acciones */}
              <div className="flex flex-wrap gap-2 self-start mt-5">
                {project.type === 'case-study' && project.pdfLink && (
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors px-4 py-2"
                  >
                    <FileText size={13} />
                    Ver propuesta
                  </a>
                )}
                {project.type === 'deployed' && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors px-4 py-2"
                  >
                    <Globe size={13} />
                    Ver en el navegador
                  </a>
                )}
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
