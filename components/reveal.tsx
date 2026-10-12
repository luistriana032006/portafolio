'use client'

import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
}

// Fades/lifts its content in the first time it scrolls into view.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={revealItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Container whose direct `RevealItem` children enter one after another.
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  )
}

// "01 ───────── Label" row: the rule draws itself in from the left.
export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span
        className="font-mono text-primary text-sm tracking-widest uppercase"
        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
      >
        {index}
      </motion.span>
      <motion.div
        className="flex-1 h-px bg-gradient-to-r from-primary/60 via-border to-border origin-left"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.1 } },
        }}
      />
      <motion.span
        className="font-mono text-muted-foreground text-xs tracking-widest uppercase"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: 0.6 } } }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
