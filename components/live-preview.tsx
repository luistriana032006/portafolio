'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const FRAME_WIDTH = 1280
const FRAME_HEIGHT = 800

type LivePreviewProps = {
  href: string
  poster: string
}

// Muestra el sitio real dentro de la tarjeta (iframe escalado). La captura estática
// hace de respaldo mientras carga y evita un hueco si el iframe tarda en montarse.
export function LivePreview({ href, poster }: LivePreviewProps) {
  const containerRef = useRef<HTMLAnchorElement | null>(null)
  const [scale, setScale] = useState(0.25)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_WIDTH)
    })
    resizeObserver.observe(el)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          intersectionObserver.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    intersectionObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="relative block aspect-[16/10] overflow-hidden border border-border bg-secondary mb-5"
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={poster}
          alt=""
          width={800}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
        {visible && (
          <iframe
            src={href}
            title=""
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            className={`absolute top-0 left-0 max-w-none border-0 pointer-events-none bg-background transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </a>
  )
}
