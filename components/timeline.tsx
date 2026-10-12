'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { EASE_OUT, Reveal, SectionLabel } from './reveal'
import { SectionWatermark } from './section-watermark'

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
    year: '2026 · Actual',
    event: 'Práctica SENA — QA Automation · Rappi',
    detail: 'Automatización de pruebas de software en Rappi como etapa práctica del Técnico SENA. Ahí aprendo que un sistema vale lo que vale su verificación — la misma exigencia con la que construyo IA.',
    highlight: true,
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
    detail: 'Grado en Ingeniería en Desarrollo de Software · Corporación Universitaria Iberoamericana. Actualmente en 5to semestre, modalidad virtual.',
    highlight: true,
  },
]

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null)
  // The orange rule fills in as the list scrolls past the middle of the screen.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.6', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <section id="logros" className="relative isolate overflow-hidden py-24 md:py-32 border-t border-border">
      <SectionWatermark index="05" side="right" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel index="05" label="Logros" />

        <Reveal>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
            El camino
            <span className="text-primary"> recorrido</span>
          </h2>
        </Reveal>

        <div ref={listRef} className="relative">
          {/* Vertical line + scroll-driven fill */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />
          <motion.div
            className="absolute left-[27px] top-0 bottom-0 w-px bg-primary origin-top shadow-[0_0_10px_rgba(232,97,58,0.7)]"
            style={{ scaleY: fill }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={i}
                className="relative flex gap-8 items-start pl-16"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -40% 0px' }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-0.5 w-14 flex items-center justify-center" aria-hidden="true">
                  <motion.div
                    variants={{
                      hidden: { scale: 0.3, opacity: 0.3 },
                      show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 14 } },
                    }}
                    className={`relative w-3.5 h-3.5 rounded-full border-2 ${
                      m.highlight ? 'border-primary bg-primary timeline-dot' : 'border-muted-foreground bg-background'
                    }`}
                  >
                    {m.highlight && (
                      <motion.span
                        className="absolute -inset-1 rounded-full border border-primary"
                        variants={{
                          hidden: { scale: 1, opacity: 0 },
                          show: { scale: [1, 2.6], opacity: [0.9, 0], transition: { duration: 1.1, delay: 0.15 } },
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1"
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                    <span className={`font-mono text-sm font-bold ${m.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {m.year}
                    </span>
                    <h3 className="font-sans font-semibold text-base text-foreground">{m.event}</h3>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.detail}</p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
