'use client'

import { useEffect, useRef } from 'react'

// Page-wide backdrop shared by every section: a faint grid that lights up
// orange around the cursor, slow drifting glows, and a film-grain overlay so
// flat panels never look like flat fills. Cursor tracking writes CSS variables
// straight to the DOM (no React re-renders).
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let raf = 0
    let x = -1000
    let y = -1000

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={rootRef} className="ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="ambient-blob ambient-blob--a" />
        <div className="ambient-blob ambient-blob--b" />
        <div className="ambient-blob ambient-blob--c" />
        <div className="ambient-grid" />
        <div className="ambient-grid ambient-grid--lit" />
        <div className="ambient-cursor" />
      </div>
      <div className="grain pointer-events-none fixed -inset-[50%] z-30" aria-hidden="true" />
    </>
  )
}
