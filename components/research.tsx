'use client'

import { FileText } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

const PET_SIZE = 140
const SPEED = 40 // px per second

export function Research() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const distRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const [petStyle, setPetStyle] = useState<React.CSSProperties>({ left: 0, top: 0 })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tick = (time: number) => {
      const delta = lastTimeRef.current != null ? time - lastTimeRef.current : 0
      lastTimeRef.current = time

      const W = el.offsetWidth
      const H = el.offsetHeight
      const pathW = W - PET_SIZE
      const pathH = H - PET_SIZE
      const perimeter = 2 * (pathW + pathH)

      distRef.current = (distRef.current + SPEED * delta / 1000 + perimeter) % perimeter
      const d = distRef.current

      let x: number, y: number, flip: boolean

      if (d < pathW) {
        // top: izquierda → derecha
        x = d; y = 0; flip = false
      } else if (d < pathW + pathH) {
        // derecha: arriba → abajo
        x = pathW; y = d - pathW; flip = false
      } else if (d < 2 * pathW + pathH) {
        // fondo: derecha → izquierda
        x = pathW - (d - pathW - pathH); y = pathH; flip = true
      } else {
        // izquierda: abajo → arriba
        x = 0; y = pathH - (d - 2 * pathW - pathH); flip = true
      }

      setPetStyle({
        left: x,
        top: y,
        transform: flip ? 'scaleX(-1)' : 'scaleX(1)',
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-24 md:py-32 border-t border-border bg-background overflow-hidden"
    >
      {/* Mascota recorriendo el perímetro */}
      <div
        className="absolute pointer-events-none select-none z-10 hidden md:block"
        style={petStyle}
      >
        <Image
          src="/mascota/07_bata.webp"
          alt="mascota"
          width={PET_SIZE}
          height={PET_SIZE}
          style={{ imageRendering: 'auto' }}
          className="object-contain"
          priority
        />
      </div>

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
              <span className="font-mono text-xs text-muted-foreground/40 mb-4">{item.index}</span>
              <h3 className="font-sans font-bold text-lg text-foreground leading-tight mb-4">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {item.description}
              </p>
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors px-4 py-2 self-start"
              >
                <FileText size={13} />
                Read PDF
              </a>
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
