'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { Linkedin, Github, ArrowRight } from 'lucide-react'
import { PetWidget } from './pet-widget'
import { HeroField } from './hero-field'
import { ScrambleText } from './scramble-text'
import { Magnetic } from './magnetic'

const ROLES = [
  'Software Engineer',
  'Java / Spring Boot Dev',
  'ML Engineering Student',
  'Building AI Tools',
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/luistriana032006', Icon: Github },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function useTypewriter(words: string[], typingSpeed = 60, deletingSpeed = 35, pauseDuration = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex]

    if (phase === 'typing') {
      if (displayed.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pauseDuration)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('deleting'), 200)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, deletingSpeed)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return displayed
}

// Live Colombia time for the status line; null until mounted to avoid a
// server/client mismatch.
function useColombiaClock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Hero() {
  const typewritten = useTypewriter(ROLES)
  const time = useColombiaClock()
  const sectionRef = useRef<HTMLElement>(null)

  // Content drifts up and fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-background scanlines overflow-hidden"
    >
      <HeroField className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Label chip */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 border border-border bg-secondary/80 backdrop-blur-sm px-3 py-1 mb-8 font-mono text-xs text-muted-foreground tracking-widest uppercase"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-primary" />
          </span>
          Portfolio — 2026
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-foreground text-balance leading-none tracking-tight mb-6"
        >
          <ScrambleText text="Luis Miguel" delay={250} duration={900} />
          <br />
          <ScrambleText
            text="Triana Rueda"
            delay={550}
            duration={1100}
            className="text-primary cyan-glow-text"
          />
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={item} className="h-10 md:h-12 flex items-center justify-center mb-8">
          <p className="font-mono text-lg md:text-2xl text-muted-foreground">
            <span className="text-primary/70 mr-2" aria-hidden="true">&gt;</span>
            <span className="sr-only">{ROLES.join(' · ')}</span>
            <span className="text-foreground" aria-hidden="true">{typewritten}</span>
            <span className="cursor-blink text-primary ml-0.5">|</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Magnetic>
            <a
              href="#proyectos"
              onClick={() => {
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'ViewContent', {}, { eventID: `viewcontent-${Date.now()}-${Math.random()}` })
                }
              }}
              className="btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden border border-primary bg-primary text-primary-foreground font-sans font-semibold text-sm px-6 py-3 tracking-wide uppercase transition-shadow hover:cyan-glow"
            >
              Ver Proyectos
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Sígueme */}
        <motion.div variants={item} className="mt-6 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Sígueme</span>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-border bg-secondary/80 backdrop-blur-sm text-muted-foreground hover:border-primary hover:text-primary hover:cyan-glow transition-[color,border-color,box-shadow]"
                >
                  <Icon size={16} />
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          variants={item}
          href="#sobre-mi"
          aria-label="Ir a Sobre Mí"
          className="mt-20 inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <span className="relative block w-px h-12 bg-border overflow-hidden">
            <span className="scroll-hint-dot absolute left-0 top-0 w-px h-4 bg-primary" />
          </span>
        </motion.a>
      </motion.div>

      {/* Status line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-8 z-10 items-center gap-3 font-mono text-[11px] text-muted-foreground tracking-widest uppercase"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>lmtr.dev</span>
        <span className="text-border">/</span>
        <span>Socorro, CO</span>
        <span className="text-border">/</span>
        <span className="tabular-nums text-foreground/70 min-w-[8ch]">{time ?? '--:--:--'}</span>
      </motion.div>

      {/* Pair programmer pet widget */}
      <PetWidget />

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-border/40" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-border/40" aria-hidden="true" />
    </section>
  )
}
