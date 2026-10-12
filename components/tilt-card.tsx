'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const SPRING = { stiffness: 260, damping: 22, mass: 0.5 }

// Card that tilts toward the cursor, lifts on hover and carries a soft
// spotlight (in `glowRgb`, "r, g, b") that follows the pointer. Mouse only:
// touch devices get a plain card.
export function TiltCard({
  children,
  className = '',
  style,
  glowRgb = '232, 97, 58',
  maxTilt = 5,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  glowRgb?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, SPRING)
  const rotateY = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(${glowRgb}, 0.13), transparent 65%)`

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
    if (reduce) return
    rotateX.set((0.5 - py) * maxTilt * 2)
    rotateY.set((px - 0.5) * maxTilt * 2)
    y.set(-4)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ...style, rotateX, rotateY, y, transformPerspective: 1000 }}
      className={`group relative isolate ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.article>
  )
}

export function hexToRgb(hex: string): string {
  const n = hex.replace('#', '')
  return `${parseInt(n.slice(0, 2), 16)}, ${parseInt(n.slice(2, 4), 16)}, ${parseInt(n.slice(4, 6), 16)}`
}
