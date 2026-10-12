'use client'

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

const SPEED = 420 // px/s while writing a line
const LAG = 26 // text appears this far behind the plane's nose
const SWOOP_MS = 480 // pause while the plane swoops to the next line

type Segment = { text: string; highlight?: boolean }
type WordBox = { start: number; width: number; line: number }
type LineBox = { left: number; width: number; y: number; offset: number }
type Layout = { words: WordBox[]; lines: LineBox[]; total: number }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

function PlaneWord({
  index,
  text,
  highlight,
  layout,
  inputs,
  wordRef,
}: {
  index: number
  text: string
  highlight?: boolean
  layout: React.RefObject<Layout | null>
  inputs: MotionValue<number>[]
  wordRef: (el: HTMLSpanElement | null) => void
}) {
  // 0 → hidden, 1 → written. Lines the plane has already left are forced to 1.
  const raw = useTransform(inputs, ([progress, flushed]: number[]) => {
    const w = layout.current?.words[index]
    if (!w) return 0
    if (w.line <= flushed) return 1
    return clamp01((progress - LAG - w.start) / Math.max(w.width, 24))
  })
  const reveal = useSpring(raw, { stiffness: 220, damping: 30 })
  const opacity = reveal
  const y = useTransform(reveal, [0, 1], [8, 0])
  const filter = useTransform(reveal, (r) => `blur(${(1 - r) * 6}px)`)

  return (
    <>
      <motion.span
        ref={wordRef}
        style={{ opacity, y, filter }}
        className={`inline-block ${highlight ? 'text-primary cyan-glow-text' : ''}`}
      >
        {text}
      </motion.span>{' '}
    </>
  )
}

// A paper plane flies along the sentence and "writes" it as it goes: words
// fade in just behind it, it swoops down at each line break and flies off at
// the end. Runs once, when the sentence scrolls into view.
export function PaperPlaneText({ segments, className }: { segments: Segment[]; className?: string }) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLParagraphElement>(null)
  const wordEls = useRef<(HTMLSpanElement | null)[]>([])
  const layout = useRef<Layout | null>(null)
  const inView = useInView(containerRef, { once: true, margin: '0px 0px -20% 0px' })

  const words = useMemo(
    () =>
      segments.flatMap((seg) =>
        seg.text
          .split(' ')
          .filter(Boolean)
          .map((text) => ({ text, highlight: seg.highlight })),
      ),
    [segments],
  )

  const progress = useMotionValue(0) // px travelled along the text
  const flushed = useMotionValue(-1) // last line fully written
  const flight = useMotionValue(-1) // -1 approaching, 0 on the text, 1 gone
  const version = useMotionValue(0) // bumped on re-measure so transforms recompute

  const posAt = (p: number) => {
    const L = layout.current
    if (!L || !L.lines.length) return { x: 0, y: 0 }
    const line = L.lines.find((l) => p <= l.offset + l.width) ?? L.lines[L.lines.length - 1]
    return { x: line.left + Math.min(Math.max(p - line.offset, 0), line.width), y: line.y }
  }

  const targetX = useTransform([progress, flight, version], ([p, f]: number[]) => posAt(p).x + (f < 0 ? f * 90 : f * 320))
  const targetY = useTransform([progress, flight, version], ([p, f]: number[]) => posAt(p).y + (f < 0 ? -f * 30 : -f * 50))
  const x = useSpring(targetX, { stiffness: 900, damping: 42 })
  const y = useSpring(targetY, { stiffness: 260, damping: 22 })
  const opacity = useTransform(flight, [-1, -0.5, 0.5, 1], [0, 1, 1, 0])
  const rotate = useMotionValue(0)

  // Point the plane where it's heading.
  useAnimationFrame(() => {
    const vx = x.getVelocity()
    const vy = y.getVelocity()
    if (Math.hypot(vx, vy) < 40) return
    const target = (Math.atan2(vy, vx) * 180) / Math.PI
    const current = rotate.get()
    const diff = ((target - current + 540) % 360) - 180
    rotate.set(current + diff * 0.18)
  })

  const measure = () => {
    const els = wordEls.current
    const lines: LineBox[] = []
    const boxes: Array<{ left: number; width: number; line: number }> = []
    for (const el of els) {
      if (!el) continue
      const top = el.offsetTop
      let line = lines.findIndex((l) => Math.abs(l.y - (top + el.offsetHeight / 2)) < 4)
      if (line === -1) {
        lines.push({ left: el.offsetLeft, width: 0, y: top + el.offsetHeight / 2, offset: 0 })
        line = lines.length - 1
      }
      const l = lines[line]
      l.left = Math.min(l.left, el.offsetLeft)
      l.width = Math.max(l.width, el.offsetLeft + el.offsetWidth - l.left)
      boxes.push({ left: el.offsetLeft, width: el.offsetWidth, line })
    }
    let offset = 0
    for (const l of lines) {
      l.offset = offset
      offset += l.width
    }
    layout.current = {
      lines,
      total: offset,
      words: boxes.map((b) => ({ start: lines[b.line].offset + (b.left - lines[b.line].left), width: b.width, line: b.line })),
    }
    version.set(version.get() + 1)
  }

  useLayoutEffect(() => {
    if (reduce) return
    measure()
    x.jump(targetX.get())
    y.jump(targetY.get())
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  useEffect(() => {
    if (!inView || reduce) return
    let cancelled = false
    const run = async () => {
      await animate(flight, 0, { duration: 0.6, ease: 'easeOut' })
      const lines = layout.current?.lines ?? []
      for (let i = 0; i < lines.length && !cancelled; i++) {
        const line = layout.current!.lines[i]
        if (i > 0) {
          progress.set(line.offset + 0.01)
          await sleep(SWOOP_MS)
        }
        await animate(progress, line.offset + line.width, { duration: line.width / SPEED, ease: 'linear' })
        flushed.set(i)
      }
      if (cancelled) return
      await sleep(120)
      animate(flight, 1, { duration: 0.9, ease: 'easeIn' })
    }
    run()
    return () => {
      cancelled = true
    }
  }, [inView, reduce, flight, progress, flushed])

  if (reduce) {
    return (
      <p className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.highlight ? 'text-primary' : undefined}>
            {s.text}
          </span>
        ))}
      </p>
    )
  }

  return (
    <p ref={containerRef} className={`relative ${className ?? ''}`}>
      <span className="sr-only">{segments.map((s) => s.text).join('')}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <PlaneWord
            key={i}
            index={i}
            text={w.text}
            highlight={w.highlight}
            layout={layout}
            inputs={[progress, flushed, version]}
            wordRef={(el) => {
              wordEls.current[i] = el
            }}
          />
        ))}
      </span>

      {/* The plane (nose at its origin) with a fading trail behind it */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10"
        style={{ x, y, rotate, opacity }}
      >
        <span className="absolute right-[0.9em] top-1/2 -translate-y-1/2 h-px w-16 bg-gradient-to-l from-primary/70 to-transparent" />
        <svg
          viewBox="0 0 24 24"
          className="absolute -translate-y-1/2 -translate-x-[85%] w-[1.15em] h-[1.15em] text-primary drop-shadow-[0_0_8px_rgba(232,97,58,0.8)]"
          fill="currentColor"
        >
          {/* Paper plane pointing right */}
          <path d="M2.5 3.2 22 12 2.5 20.8l3.2-7.6L14 12l-8.3-1.2z" />
          <path d="M5.7 13.2 14 12l-6 5.2z" opacity="0.55" />
        </svg>
      </motion.span>
    </p>
  )
}
