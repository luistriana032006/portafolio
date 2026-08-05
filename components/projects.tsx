'use client'

import { Check, FileText, Globe, Sparkles } from 'lucide-react'
import { useState } from 'react'

type ProjectType = 'deployed' | 'case-study'
type QualityKey = 'human-loop' | 'local-first' | 'latam-real'

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
  accentColor?: string
  patterns?: QualityKey[]
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
    accentColor: '#E9FF7B',
    patterns: ['human-loop', 'latam-real'],
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
    accentColor: '#0891B2',
    patterns: ['human-loop', 'local-first'],
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
    accentColor: '#38BDF8',
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
    accentColor: '#F97316',
    patterns: ['latam-real'],
  },
  {
    index: '05',
    type: 'case-study',
    name: 'Propuesta técnica — Onboarding del reto de 21 días',
    description:
      'Research aplicado a un problema real de producto: fricción en el onboarding de un reto de 21 días. Propuesta técnica documentada — bot de WhatsApp con IA construido sobre el stack ya existente del negocio analizado.',
    tags: ['Research', 'WhatsApp Bot', 'IA', 'Producto'],
    pdfLink: '/docs/propuesta_onboarding_lab10.pdf',
    accentColor: '#E9FF7B',
    patterns: ['latam-real'],
  },
  {
    index: '06',
    type: 'case-study',
    name: 'Zolvo — Estrategia de expansión a México',
    description:
      'Research y propuesta estratégica para el lanzamiento de Zolvo en México — perfiles de cliente ideal, arquitectura de un agente de ventas con IA, secuencia de contacto y análisis de ROI del cliente. Elaborado para el Makers Admission Challenge 2026.',
    tags: ['Research', 'Ventas', 'IA', 'Estrategia'],
    pdfLink: '/docs/Zolvo_Estrategia_LuisMiguel.pdf',
    accentColor: '#FDBA74',
    patterns: ['latam-real'],
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
    stat: 'Open Source',
    inDev: true,
    accentColor: '#4A7C59',
    patterns: ['local-first'],
  },
  {
    index: '08',
    type: 'deployed',
    name: 'Siwar — App móvil para enseñar programación en Latinoamérica',
    description:
      'App móvil offline-first para enseñar programación en Latinoamérica — no es un curso genérico, es mi propia bitácora de aprendizaje, abierta para que cualquiera la siga. Incluye un intérprete de Java escrito a mano en TypeScript y persistencia local con SQLite.',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Educación'],
    link: null,
    repoLink: 'https://github.com/luistriana032006/siwar-app',
    stat: 'Open Source',
    inDev: true,
    accentColor: '#F07660',
    patterns: ['local-first', 'latam-real'],
  },
  {
    index: '09',
    type: 'deployed',
    name: 'Motor de Recomendación de Seguros — Colsubsidio',
    description:
      'Dado el perfil de una persona, recomienda hasta 3 productos de seguros de Colsubsidio ordenados por qué tan bien encajan, cada uno con su score, nivel de confianza y la hipótesis de negocio exacta que lo disparó. No es caja negra: las hipótesis las firma un humano, el motor solo pesa su evidencia estadística, y cada recomendación queda registrada y trazable en una base de datos consultable con dashboards en vivo.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'SQLite', 'MCP', 'ML'],
    link: null,
    repoLink: 'https://github.com/luistriana032006/seguros_colsubsidio',
    stat: null,
    inDev: false,
    accentColor: '#8B5CF6',
    patterns: ['human-loop', 'latam-real'],
  },
  {
    index: '10',
    type: 'case-study',
    name: 'Idilio TV — Cómo construir una empresa de streaming cultural',
    description:
      'Research independiente de tres meses sobre Idilio TV, plataforma de streaming cultural latinoamericano — identifica la métrica que nadie está midiendo (finalización completa de series, no clicks ni tiempo en pantalla), propone registro obligatorio como base de datos honesta y una apuesta de foco en una sola "serie estrella". Traduce el análisis en prioridades concretas para los cuatro roles técnicos que la empresa contrataba en agosto.',
    tags: ['Research', 'Producto', 'Growth', 'Streaming', 'LatAm'],
    pdfLink: '/docs/idilio-streaming-cultural.pdf',
    accentColor: '#EC4899',
    patterns: ['latam-real'],
  },
]

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '')
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function GithubIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const FILTERS: Array<{ key: 'all' | ProjectType; label: string }> = [
  { key: 'all', label: 'Todos' },
  { key: 'deployed', label: 'Desplegados' },
  { key: 'case-study', label: 'Casos de estudio' },
]

const QUALITIES: Array<{ key: QualityKey; label: string }> = [
  { key: 'human-loop', label: 'IA con humano en el loop' },
  { key: 'local-first', label: 'Local-first / privacidad' },
  { key: 'latam-real', label: 'Negocios reales de LatAm' },
]

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all')
  const [activeQualities, setActiveQualities] = useState<QualityKey[]>([])

  const toggleQuality = (key: QualityKey) => {
    setActiveQualities((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesType = filter === 'all' || project.type === filter
    const matchesQuality =
      activeQualities.length === 0 || activeQualities.some((q) => project.patterns?.includes(q))
    return matchesType && matchesQuality
  })

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

        {/* Tabs de filtro por tipo */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtrar proyectos por tipo">
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

        {/* Filtro por cualidad */}
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-2.5 mb-4">
          <Sparkles size={14} className="text-primary shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs text-primary tracking-wide">
            Filtra según la cualidad que quieras ver
          </span>
        </div>

        <div
          className="flex flex-wrap items-center gap-2 mb-12"
          role="group"
          aria-label="Filtrar proyectos por cualidad"
        >
          {QUALITIES.map((q) => {
            const active = activeQualities.includes(q.key)
            const count = PROJECTS.filter((p) => p.patterns?.includes(q.key)).length
            return (
              <button
                key={q.key}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggleQuality(q.key)}
                className={`inline-flex items-center gap-2 font-mono text-xs tracking-wide px-3.5 py-2 border transition-colors ${
                  active
                    ? 'text-primary border-primary/50 bg-primary/10'
                    : 'text-muted-foreground border-border bg-secondary hover:text-foreground hover:border-foreground/40'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-3.5 h-3.5 border shrink-0 ${
                    active ? 'border-primary bg-primary' : 'border-muted-foreground/40'
                  }`}
                  aria-hidden="true"
                >
                  {active && <Check size={10} className="text-background" strokeWidth={3} />}
                </span>
                {q.label} <span className="opacity-60">({count})</span>
              </button>
            )
          })}
          {activeQualities.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveQualities([])}
              className="font-mono text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground px-2 py-2"
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {filteredProjects.map((project) => (
            <article
              key={project.index}
              className={`card-hover group relative flex flex-col border border-border bg-background p-6${
                project.accentColor ? ' card-hover--accent' : ''
              }`}
              style={
                project.accentColor
                  ? ({
                      '--accent-border-color': project.accentColor,
                      '--accent-glow-color': hexToRgba(project.accentColor, 0.18),
                    } as React.CSSProperties)
                  : undefined
              }
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
                        <GithubIcon size={22} />
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

              {/* Cualidades */}
              {project.patterns && project.patterns.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.patterns.map((key) => {
                    const quality = QUALITIES.find((q) => q.key === key)
                    if (!quality) return null
                    const highlighted = activeQualities.includes(key)
                    return (
                      <span
                        key={key}
                        className={`font-mono text-[11px] px-2 py-0.5 border tracking-wide transition-colors ${
                          highlighted
                            ? 'text-primary border-primary/50 bg-primary/10'
                            : 'text-muted-foreground/80 border-border/70'
                        }`}
                      >
                        {quality.label}
                      </span>
                    )
                  })}
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
