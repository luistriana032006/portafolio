'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Oversized outlined section number behind the content, drifting slower than
// the page for a bit of depth. Parent section must be `relative`.
export function SectionWatermark({ index, side = 'right' }: { index: string; side?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, -120])

  return (
    <div
      ref={ref}
      className={`pointer-events-none select-none absolute top-10 ${side === 'right' ? '-right-6' : '-left-6'} -z-10 hidden sm:block`}
      aria-hidden="true"
    >
      <motion.span style={{ y }} className="watermark block font-sans font-bold leading-none tracking-tighter">
        {index}
      </motion.span>
    </div>
  )
}
