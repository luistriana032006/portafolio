import { FileText } from 'lucide-react'
import Image from 'next/image'
import { Reveal, RevealGroup, RevealItem, SectionLabel } from './reveal'
import { TiltCard } from './tilt-card'
import { SectionWatermark } from './section-watermark'

const RESEARCH = [
  {
    index: '01',
    title: 'Colombia & Artificial Intelligence: Five Actions for Real Digital Sovereignty',
    description:
      'A formal policy document distributed to presidential candidates for Colombia\'s 2026 elections, proposing concrete AI governance actions.',
    file: '/docs/analisis-ia-colombia.pdf',
    preview: '/docs/previews/analisis-ia-colombia.jpg',
  },
  {
    index: '02',
    title: 'Del Colegio a la Programación: Un Viaje de Desaprendizaje y Transformación Educativo',
    description:
      'Reflexión personal sobre lo que cuesta aprender tecnología viniendo de una educación formal en Colombia — y todo lo que hay que desaprender en el camino.',
    file: '/docs/analisis-educacion-colombia.pdf',
    preview: '/docs/previews/analisis-educacion-colombia.jpg',
  },
  {
    index: '03',
    title: 'Educación Tecnológica e Investigación en Colombia: Propuestas desde la Periferia',
    description:
      'Documento de política pública elaborado desde Socorro, Santander — propone separar tres niveles de formación en IA (usar, construir con y construir IA), créditos de cómputo en la nube, la figura del Investigador Independiente Asociado y una hoja de ruta a 4 años para que el talento fuera de las capitales no se quede sin acceso.',
    file: '/docs/etapas-colombia-ia-first.pdf',
    preview: '/docs/previews/etapas-colombia-ia-first.jpg',
  },
]

export function Research() {
  return (
    <section id="research" className="relative isolate py-24 md:py-32 border-t border-border overflow-hidden">
      <SectionWatermark index="04" side="left" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel index="04" label="Research & Analysis" />

        <Reveal>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
            Cosas que he
            <span className="text-primary"> investigado</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.12}>
          {RESEARCH.map((item) => (
            <RevealItem key={item.index} className="h-full">
              <TiltCard className="card-glow h-full flex flex-col border border-border bg-card p-6">
                <span className="font-mono text-xs text-muted-foreground/40 mb-4">{item.index}</span>
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[4/3] overflow-hidden border border-border bg-white mb-5"
                >
                  <Image
                    src={item.preview}
                    alt=""
                    width={800}
                    height={1132}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent"
                    aria-hidden="true"
                  />
                </a>
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
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
