'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useActiveSection } from '@/hooks/use-active-section'

const POSES = {
  wave: '/mascota/03_pose3.webp',
  code: '/mascota/08_codigo.webp',
  lab: '/mascota/07_bata.webp',
}

const GUIDE: Record<string, { pose: keyof typeof POSES; msg: string }> = {
  'sobre-mi': { pose: 'wave', msg: 'Un poco sobre Luis 👋' },
  stack: { pose: 'code', msg: 'Su caja de herramientas' },
  proyectos: { pose: 'code', msg: 'Pasa el mouse por las cards' },
  research: { pose: 'lab', msg: 'Modo investigación: ON' },
  logros: { pose: 'wave', msg: 'Mira todo lo que ha recorrido' },
  contacto: { pose: 'wave', msg: '¡Escríbele! O prueba la terminal' },
}

const SECTION_IDS = ['hero', ...Object.keys(GUIDE)]
const DISMISS_KEY = 'mascot-guide-dismissed'

// Floating companion that takes over from the hero mascot once you scroll
// past it: it switches pose per section and pipes up with a short line.
export function MascotGuide() {
  const section = useActiveSection(SECTION_IDS)
  const [dismissed, setDismissed] = useState(true)
  const [talking, setTalking] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  // Speak for a few seconds every time the section changes.
  useEffect(() => {
    if (!section || section === 'hero') return
    setTalking(true)
    const id = setTimeout(() => setTalking(false), 3500)
    return () => clearTimeout(id)
  }, [section])

  const guide = section ? GUIDE[section] : undefined
  const visible = !dismissed && !!guide

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {}
  }

  return (
    <AnimatePresence>
      {visible && guide && (
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: 80, rotate: 12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="hidden md:flex fixed bottom-5 right-5 z-40 flex-col items-end gap-2 select-none"
          aria-hidden="true"
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {(talking || hovered) && (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative border border-primary/40 bg-card/95 backdrop-blur-sm px-3 py-2 font-mono text-[11px] text-foreground shadow-[0_0_20px_rgba(232,97,58,0.15)] origin-bottom-right"
              >
                {guide.msg}
                <span className="absolute -bottom-1.5 right-8 w-3 h-3 rotate-45 border-r border-b border-primary/40 bg-card" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <button
              type="button"
              onClick={dismiss}
              tabIndex={-1}
              className={`absolute -top-1 -left-1 z-10 w-5 h-5 flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary transition-opacity ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
              title="Ocultar mascota"
            >
              <X size={11} />
            </button>

            {/* Pose: hops out and back in when it changes */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={guide.pose}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div className="animate-float w-[128px] drop-shadow-[0_0_14px_rgba(232,97,58,0.35)]">
                  <Image src={POSES[guide.pose]} alt="" width={300} height={350} className="w-full h-auto" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
