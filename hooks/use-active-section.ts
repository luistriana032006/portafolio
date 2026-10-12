'use client'

import { useEffect, useState } from 'react'

// Id of the section (from `ids`) crossing the middle of the viewport, or null.
// When several match, the first in `ids` order wins.
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled) return
    const list = key.split('|')
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        setActive(list.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of list) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [key, enabled])

  return enabled ? active : null
}
