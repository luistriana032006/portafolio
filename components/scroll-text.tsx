'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

// Paragraph whose words light up one by one as it scrolls through the viewport.
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

// Number that counts up from `from` to `to` the first time it's seen. The
// final value is server-rendered so it's correct without JS.
export function CountUp({ to, from = 0, suffix = '', className }: { to: number; from?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(to)
  const [armed, setArmed] = useState(false)

  // Drop to the start value once hydrated so the count-up has somewhere to go.
  useEffect(() => {
    if (reduce) return
    setValue(from)
    setArmed(true)
  }, [from, reduce])

  useEffect(() => {
    if (!inView || !armed) return
    const controls = animate(from, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, armed, from, to])

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {value}
      {suffix}
    </span>
  )
}
