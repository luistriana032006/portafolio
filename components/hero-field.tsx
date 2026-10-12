'use client'

import { useEffect, useRef } from 'react'

const ORANGE = '232, 97, 58'
const LIGHT = '232, 232, 232'
const RADIUS = 170 // cursor influence radius (px)
const PUSH = 22 // max dot displacement from the cursor (px)
const RIPPLE_SPEED = 0.6 // px per ms
const RIPPLE_LIFE = 1600 // ms
const IDLE_RIPPLE_EVERY = 6000 // ms without pointer before an ambient ripple

type Ripple = { x: number; y: number; t0: number }

// Interactive dot grid behind the hero: dots breathe in a slow wave, get pushed
// and lit orange around the cursor, and clicks/taps send out a ripple. The loop
// only runs while the canvas is on screen and the tab is visible.
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dots: { x: number; y: number }[] = []
    const ripples: Ripple[] = []
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, strength: 0, lastMove: 0 }
    let lastIdleRipple = 0
    let onScreen = true
    let raf = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const spacing = w < 640 ? 32 : 28
      const ox = (w % spacing) / 2
      const oy = (h % spacing) / 2
      dots = []
      for (let y = oy; y <= h; y += spacing) {
        for (let x = ox; x <= w; x += spacing) dots.push({ x, y })
      }
      if (reduce) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * 0.08

      if (pointer.strength > 0.01) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, RADIUS * 2.2)
        g.addColorStop(0, `rgba(${ORANGE}, ${0.1 * pointer.strength})`)
        g.addColorStop(1, `rgba(${ORANGE}, 0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        if (t - ripples[i].t0 > RIPPLE_LIFE) ripples.splice(i, 1)
      }

      for (const d of dots) {
        let ox = 0
        let oy = 0
        let glow = 0

        if (pointer.strength > 0.01) {
          const dx = d.x - pointer.x
          const dy = d.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < RADIUS && dist > 0.001) {
            let f = 1 - dist / RADIUS
            f = f * f * (3 - 2 * f) * pointer.strength
            ox += (dx / dist) * f * PUSH
            oy += (dy / dist) * f * PUSH
            glow = f
          }
        }

        for (const r of ripples) {
          const age = t - r.t0
          const dx = d.x - r.x
          const dy = d.y - r.y
          const dist = Math.hypot(dx, dy)
          const band = 1 - Math.abs(dist - age * RIPPLE_SPEED) / 50
          if (band > 0 && dist > 0.001) {
            const f = band * (1 - age / RIPPLE_LIFE)
            ox += (dx / dist) * f * 12
            oy += (dy / dist) * f * 12
            glow = Math.max(glow, f * 0.8)
          }
        }

        const size = 1.5 + glow * 1.5
        if (glow > 0.03) {
          ctx.fillStyle = `rgba(${ORANGE}, ${0.2 + glow * 0.8})`
        } else {
          const wave = 0.5 + 0.5 * Math.sin(d.x * 0.011 + d.y * 0.007 + t * 0.0011)
          ctx.fillStyle = `rgba(${LIGHT}, ${0.06 + wave * 0.08})`
        }
        ctx.fillRect(d.x + ox - size / 2, d.y + oy - size / 2, size, size)
      }
    }

    const loop = (t: number) => {
      if (!pointer.inside && t - Math.max(pointer.lastMove, lastIdleRipple) > IDLE_RIPPLE_EVERY) {
        lastIdleRipple = t
        ripples.push({ x: w * (0.2 + Math.random() * 0.6), y: h * (0.25 + Math.random() * 0.5), t0: t })
      }
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduce || raf || !onScreen || document.hidden) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const p = toLocal(e)
      if (!pointer.inside && p.inside) {
        pointer.x = p.x
        pointer.y = p.y
      }
      pointer.tx = p.x
      pointer.ty = p.y
      pointer.inside = p.inside
      pointer.lastMove = performance.now()
    }
    const onPointerDown = (e: PointerEvent) => {
      const p = toLocal(e)
      if (p.inside) ripples.push({ x: p.x, y: p.y, t0: performance.now() })
    }
    const onLeave = () => {
      pointer.inside = false
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    ripples.push({ x: w / 2, y: h / 2, t0: performance.now() + 300 })

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
