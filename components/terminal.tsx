'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { scrollToId } from './smooth-scroll'

const GITHUB = 'https://github.com/luistriana032006'
const LINKEDIN = 'https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2'
const PROMPT = 'luis@lmtr:~$'

type Line = { id: number; kind: 'cmd' | 'out'; content: ReactNode }

const SECTIONS: Record<string, string> = {
  sobre: 'sobre-mi',
  stack: 'stack',
  proyectos: 'proyectos',
  research: 'research',
  logros: 'logros',
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
      {children}
    </a>
  )
}

const CONTACT_LIST = (
  <div className="grid grid-cols-[6.5rem_1fr] gap-x-2 gap-y-1">
    <span className="text-muted-foreground">github</span>
    <span className="truncate">
      → <ExtLink href={GITHUB}>github.com/luistriana032006</ExtLink>
    </span>
    <span className="text-muted-foreground">linkedin</span>
    <span className="truncate">
      → <ExtLink href={LINKEDIN}>linkedin.com/in/luis-miguel-triana-rueda</ExtLink>
    </span>
    <span className="text-muted-foreground">ubicación</span>
    <span>→ Socorro, Santander, Colombia 🇨🇴</span>
  </div>
)

const HELP = (
  <div className="grid grid-cols-[8.5rem_1fr] gap-x-2 gap-y-0.5">
    {[
      ['whoami', 'quién soy'],
      ['contacto', 'dónde encontrarme'],
      ['github / linkedin', 'abre el perfil'],
      ['proyectos, stack…', 'te lleva a esa sección'],
      ['sudo contratar', '¿?'],
      ['clear', 'limpia la terminal'],
    ].map(([cmd, desc]) => (
      <div key={cmd} className="contents">
        <span className="text-primary">{cmd}</span>
        <span className="text-muted-foreground">{desc}</span>
      </div>
    ))}
  </div>
)

const WHOAMI = 'Luis Miguel Triana Rueda — Software Engineer · ML Engineering Student · QA Automation @ Rappi'

const INITIAL: Line[] = [
  { id: 0, kind: 'cmd', content: 'whoami' },
  { id: 1, kind: 'out', content: WHOAMI },
  { id: 2, kind: 'cmd', content: 'contacto --listar' },
  { id: 3, kind: 'out', content: CONTACT_LIST },
  {
    id: 4,
    kind: 'out',
    content: (
      <span className="text-muted-foreground">
        Escribe <span className="text-primary">help</span> para ver más comandos.
      </span>
    ),
  },
]

function run(raw: string): ReactNode | 'clear' | null {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!cmd) return null
  if (cmd === 'clear' || cmd === 'cls') return 'clear'
  if (cmd === 'help' || cmd === 'ayuda') return HELP
  if (cmd === 'whoami') return WHOAMI
  if (cmd.startsWith('contacto') || cmd.startsWith('contact')) return CONTACT_LIST
  if (cmd === 'github' || cmd === 'linkedin') {
    window.open(cmd === 'github' ? GITHUB : LINKEDIN, '_blank', 'noopener,noreferrer')
    return `Abriendo ${cmd === 'github' ? 'GitHub' : 'LinkedIn'}…`
  }
  const section = SECTIONS[cmd.replace(/^cd /, '')]
  if (section) {
    scrollToId(section)
    return `Navegando a #${section}…`
  }
  if (cmd.startsWith('sudo')) {
    return (
      <span>
        [sudo] contraseña para reclutador: ********
        <br />
        <span className="text-primary">✓ Acceso concedido.</span> Siguiente paso:{' '}
        <ExtLink href={LINKEDIN}>escríbele por LinkedIn</ExtLink>.
      </span>
    )
  }
  if (cmd === 'ls') return 'sobre  stack  proyectos  research  logros'
  if (cmd === 'date' || cmd === 'fecha') {
    return new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }) + ' (COT)'
  }
  return (
    <span>
      comando no encontrado: <span className="text-foreground">{raw.trim()}</span>. Prueba{' '}
      <span className="text-primary">help</span>.
    </span>
  )
}

// Fake shell for the contact section. The initial session (whoami + contact
// links) is server-rendered so the links exist without JS; typing commands is
// a bonus on top.
export function Terminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const nextId = useRef(INITIAL.length)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const submit = () => {
    const raw = input
    setInput('')
    setCursor(null)
    if (raw.trim()) setHistory((h) => [...h, raw])
    const result = run(raw)
    if (result === 'clear') {
      setLines([])
      return
    }
    const added: Line[] = [{ id: nextId.current++, kind: 'cmd', content: raw }]
    if (result !== null) added.push({ id: nextId.current++, kind: 'out', content: result })
    setLines((l) => [...l, ...added])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = cursor === null ? history.length - 1 : Math.max(cursor - 1, 0)
      setCursor(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown' && cursor !== null) {
      e.preventDefault()
      const i = cursor + 1
      if (i >= history.length) {
        setCursor(null)
        setInput('')
      } else {
        setCursor(i)
        setInput(history[i])
      }
    }
  }

  // Clicking anywhere in the window focuses the prompt, unless the user is
  // selecting text or clicked a link.
  const focusPrompt = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    if (window.getSelection()?.toString()) return
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div
      onClick={focusPrompt}
      className="group/term border border-border bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(232,97,58,0.05),0_20px_60px_-20px_rgba(232,97,58,0.25)] focus-within:border-primary/50 transition-colors cursor-text"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground tracking-wide">luis@lmtr: ~/contacto</span>
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/90"
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: line.id < INITIAL.length ? i * 0.25 : 0 }}
            className={line.kind === 'cmd' ? 'mt-3 first:mt-0' : 'mt-1'}
          >
            {line.kind === 'cmd' ? (
              <span>
                <span className="text-primary">{PROMPT}</span> {line.content}
              </span>
            ) : (
              line.content
            )}
          </motion.div>
        ))}

        <div className="mt-3 flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-primary shrink-0">
            {PROMPT}
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="help"
            aria-label="Escribe un comando"
            className="flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 caret-primary"
          />
        </div>
      </div>
    </div>
  )
}
