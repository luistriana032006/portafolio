'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useActiveSection } from '@/hooks/use-active-section'

const NAV_LINKS = [
  { label: 'Sobre Mí', href: '/#sobre-mi' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Research', href: '/#research' },
  { label: 'Tutoriales/Recursos', href: '/tutoriales' },
  { label: 'Logros', href: '/#logros' },
  { label: 'Contacto', href: '/#contacto' },
]

const SECTION_IDS = NAV_LINKS.filter((l) => l.href.startsWith('/#')).map((l) => l.href.slice(2))

// Href of the link that matches what's on screen: the route itself on
// sub-pages, otherwise the section crossing the middle of the viewport.
function useActiveHref() {
  const pathname = usePathname()
  const sectionId = useActiveSection(SECTION_IDS, pathname === '/')
  if (pathname !== '/') return pathname
  return sectionId ? `/#${sectionId}` : null
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeHref = useActiveHref()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled || menuOpen ? 'border-border bg-background/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute left-0 right-0 bottom-[-1px] h-px bg-primary origin-left shadow-[0_0_8px_rgba(232,97,58,0.8)]"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <a href="/#hero" className="group font-mono text-sm text-primary tracking-widest uppercase">
          LMTR
          <span className="cursor-blink" aria-hidden="true">_</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const active = href === activeHref
            return (
              <li key={href} className="relative">
                <a
                  href={href}
                  aria-current={active ? 'true' : undefined}
                  className={`relative block px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 -bottom-px h-px bg-primary shadow-[0_0_10px_rgba(232,97,58,0.9)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <motion.ul
              className="flex flex-col py-4 px-6 gap-4"
              role="list"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.li
                  key={href}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm tracking-widest uppercase transition-colors ${
                      href === activeHref ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <span className="text-primary/60 mr-2" aria-hidden="true">&gt;</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
