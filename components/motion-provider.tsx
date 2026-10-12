'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './smooth-scroll'
import { AmbientBackground } from './ambient-background'

// Site-wide animation setup: motion honours the OS "reduce motion" setting,
// Lenis provides inertial scrolling and the ambient layer sits behind it all.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <AmbientBackground />
      {children}
    </MotionConfig>
  )
}
