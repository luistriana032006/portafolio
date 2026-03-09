'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const ROLES = [
  'Software Engineer',
  'Java / Spring Boot Dev',
  'ML Engineering Student',
  'Building AI Tools',
  'Socorro, Colombia \u{1F1E8}\u{1F1F4}',
]

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

export function Hero() {
  const typewritten = useTypewriter(ROLES)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg scanlines overflow-hidden"
    >
      {/* Ambient amber glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Nav dots / section indicator */}
      <div className="absolute top-8 left-8 flex items-center gap-3" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          lmtr.dev
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Label chip */}
        <div className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-1 mb-8 font-mono text-xs text-muted-foreground tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Portfolio — 2026
        </div>

        {/* Name */}
        <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-foreground text-balance leading-none tracking-tight mb-6">
          Luis Miguel
          <br />
          <span className="text-primary cyan-glow-text">Triana Rueda</span>
        </h1>

        {/* Typewriter */}
        <div className="h-10 md:h-12 flex items-center justify-center mb-8">
          <p className="font-mono text-lg md:text-2xl text-muted-foreground">
            <span className="text-foreground">{typewritten}</span>
            <span className="cursor-blink text-primary ml-0.5">|</span>
          </p>
        </div>

        {/* Location */}
        <p className="font-mono text-sm text-muted-foreground mb-10 tracking-wide">
          <span className="text-primary">{'>'}</span> Socorro, Santander — Colombia
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground font-sans font-semibold text-sm px-6 py-3 tracking-wide uppercase hover:bg-primary/90 transition-colors"
          >
            Ver Proyectos
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-border/40" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-border/40" aria-hidden="true" />
    </section>
  )
}
