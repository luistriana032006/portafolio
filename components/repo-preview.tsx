'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { GitBranch } from 'lucide-react'
import { LANGUAGE_COLORS, type RepoLang, type RepoPreviewData } from '@/lib/repo-previews'

const KEYWORDS: Record<RepoLang, Set<string>> = {
  python: new Set(
    'def class return if elif else for in is not and or None True False import from as async await with try except raise lambda self pass'.split(' '),
  ),
  tsx: new Set(
    'const let var function return if else for of in export default import from as new null undefined true false async await type interface typeof'.split(' '),
  ),
}

const TOKEN_RE: Record<RepoLang, RegExp> = {
  python:
    /(#.*$)|([rfb]?"(?:[^"\\]|\\.)*"|[rfb]?'(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)(?=\s*\()|\b([A-Za-z_]\w*)\b/g,
  tsx: /(\/\/.*$|^\s*\/?\*.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_$][\w$]*)(?=\s*[(<])|\b([A-Za-z_$][\w$]*)\b/g,
}

// Minimal one-line highlighter: enough to read as code, not a real parser.
function highlight(line: string, lang: RepoLang): ReactNode[] {
  const out: ReactNode[] = []
  const re = new RegExp(TOKEN_RE[lang])
  const kw = KEYWORDS[lang]
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const [text, comment, str, num, fn, ident] = m
    let cls = ''
    if (comment) cls = 'tok-com'
    else if (str) cls = 'tok-str'
    else if (num) cls = 'tok-num'
    else if (fn) cls = kw.has(fn) ? 'tok-kw' : 'tok-fn'
    else if (ident) cls = kw.has(ident) ? 'tok-kw' : /^[A-Z]/.test(ident) ? 'tok-type' : ''
    out.push(cls ? <span key={m.index} className={cls}>{text}</span> : text)
    last = m.index + text.length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

// Editor window shown in place of a screenshot for repo-only projects: file
// tree, a real snippet that types itself in when scrolled into view and pans
// down on hover, plus GitHub's language split.
export function RepoPreview({ href, data, accent }: { href: string; data: RepoPreviewData; accent: string }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const lines = data.code.split('\n')
  const fileName = data.path.split('/').pop()

  // How far the snippet has to travel on hover to show its last line.
  useEffect(() => {
    const viewport = viewportRef.current
    const code = codeRef.current
    if (!viewport || !code) return
    const measure = () => {
      const overflow = Math.max(code.scrollHeight - viewport.clientHeight + 8, 0)
      code.style.setProperty('--repo-scroll', `-${overflow}px`)
      code.style.setProperty('--repo-scroll-time', `${Math.max(overflow / 22, 1)}s`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="repo-preview @container relative block aspect-[16/10] overflow-hidden border border-border bg-[#0b0b0b] mb-5"
      style={{ '--repo-accent': accent } as CSSProperties}
    >
      {/* Accent wash from the top-right corner */}
      <div
        className="pointer-events-none absolute -top-1/2 -right-1/4 w-full h-full rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, color-mix(in srgb, ${accent} 18%, transparent), transparent 65%)` }}
      />

      <div className="relative h-full flex flex-col font-mono repo-text">
        {/* Title bar + tab */}
        <div className="flex items-stretch border-b border-border bg-[#0e0e0e] shrink-0">
          <div className="flex items-center gap-[0.35em] px-[0.8em]">
            <span className="w-[0.55em] h-[0.55em] rounded-full bg-primary/80" />
            <span className="w-[0.55em] h-[0.55em] rounded-full bg-muted" />
            <span className="w-[0.55em] h-[0.55em] rounded-full bg-muted" />
          </div>
          <div
            className="flex items-center gap-[0.4em] px-[0.9em] py-[0.45em] bg-[#0b0b0b] border-x border-border text-foreground/90 border-t-2"
            style={{ borderTopColor: accent }}
          >
            {fileName}
          </div>
          <div className="ml-auto hidden @[260px]:flex items-center px-[0.8em] text-muted-foreground truncate">
            {data.path.includes('/') ? data.path.split('/').slice(0, -1).join(' › ') : 'root'}
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* File tree */}
          <ul className="hidden @[220px]:block w-[34%] shrink-0 border-r border-border py-[0.5em] text-muted-foreground overflow-hidden">
            {data.tree.map((node, i) => (
              <li
                key={i}
                className={`flex items-center gap-[0.35em] whitespace-nowrap pr-[0.5em] py-[0.08em] ${
                  node.active ? 'text-foreground' : ''
                }`}
                style={{
                  paddingLeft: `${0.7 + (node.depth ?? 0) * 0.9}em`,
                  backgroundColor: node.active ? `color-mix(in srgb, ${accent} 16%, transparent)` : undefined,
                  boxShadow: node.active ? `inset 2px 0 0 ${accent}` : undefined,
                }}
              >
                <span className="shrink-0 opacity-70" style={node.dir ? { color: accent } : undefined}>
                  {node.dir ? '▸' : '·'}
                </span>
                <span className="truncate">{node.name}</span>
              </li>
            ))}
          </ul>

          {/* Code */}
          <div ref={viewportRef} className="relative flex-1 min-w-0 overflow-hidden">
            <motion.div
              ref={codeRef}
              className="repo-scroll py-[0.5em]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {lines.map((line, i) => (
                <div key={i} className="flex whitespace-pre">
                  <span className="w-[2.6em] shrink-0 pr-[0.8em] text-right text-muted-foreground/40 select-none">
                    {i + 1}
                  </span>
                  <motion.span
                    className="tok-base"
                    variants={{
                      hidden: { clipPath: 'inset(0 100% 0 0)' },
                      show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.35, ease: 'linear' } },
                    }}
                  >
                    {highlight(line, data.lang)}
                    {i === lines.length - 1 && <span className="cursor-blink text-primary">▍</span>}
                  </motion.span>
                </div>
              ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
          </div>
        </div>

        {/* Status bar with GitHub's language split */}
        <div className="shrink-0 border-t border-border bg-[#0e0e0e]">
          <div className="flex h-[3px]">
            {data.languages.map((l) => (
              <span
                key={l.name}
                style={{ width: `${l.pct}%`, backgroundColor: LANGUAGE_COLORS[l.name] ?? '#6b6b6b' }}
              />
            ))}
          </div>
          <div className="flex items-center gap-[0.9em] px-[0.8em] py-[0.35em] text-muted-foreground whitespace-nowrap overflow-hidden">
            <span className="flex items-center gap-[0.3em] text-foreground/80">
              <GitBranch className="w-[1.1em] h-[1.1em]" />
              {data.branch}
            </span>
            {data.languages.slice(0, 3).map((l) => (
              <span key={l.name} className="flex items-center gap-[0.35em]">
                <span
                  className="w-[0.6em] h-[0.6em] rounded-full"
                  style={{ backgroundColor: LANGUAGE_COLORS[l.name] ?? '#6b6b6b' }}
                />
                {l.name} {l.pct}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
