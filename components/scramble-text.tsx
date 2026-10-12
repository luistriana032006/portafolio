'use client'

import { useEffect, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&01'

// Reveals `text` left-to-right, cycling random glyphs on the characters that
// haven't "decoded" yet. Screen readers always get the final text.
export function ScrambleText({
  text,
  delay = 0,
  duration = 1200,
  className,
}: {
  text: string
  delay?: number
  duration?: number
  className?: string
}) {
  const [output, setOutput] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let start = 0
    const step = (now: number) => {
      if (!start) start = now
      const elapsed = now - start - delay
      const progress = Math.min(Math.max(elapsed / duration, 0), 1)
      const revealed = Math.floor(progress * text.length)

      setOutput(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ' || i < revealed) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )

      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  )
}
