'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

const NAV_OFFSET = -56

let instance: Lenis | null = null

// Scrolls to a section by id, through Lenis when it's running.
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: NAV_OFFSET })
  else el.scrollIntoView({ behavior: 'smooth' })
}

// Inertial scrolling for the whole page. Lenis disables itself when the user
// prefers reduced motion, and `anchors` routes in-page links (e.g. /#stack)
// through the same smooth scroll.
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: NAV_OFFSET },
      lerp: 0.1,
    })
    instance = lenis
    return () => {
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}
