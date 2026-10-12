import { Reveal, RevealGroup, RevealItem, SectionLabel } from './reveal'
import { SectionWatermark } from './section-watermark'

const SKILL_GROUPS = [
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'FastAPI', 'Python', 'SQL'],
  },
  {
    category: 'AI / ML',
    skills: ['Ollama', 'ChromaDB', 'scikit-learn', 'pandas', 'NumPy', 'Time Series', 'XGBoost'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'Linux', 'WSL2'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
]

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills)
const HALF = Math.ceil(ALL_SKILLS.length / 2)
const MARQUEE_ROWS = [ALL_SKILLS.slice(0, HALF), ALL_SKILLS.slice(HALF)]

// Infinite ticker: the list is rendered twice and the track slides by half its
// width, so the loop is seamless. Hovering the band pauses it.
function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`marquee-track flex shrink-0 gap-3 pr-3 ${reverse ? 'marquee-reverse' : ''}`}>
        {[...items, ...items].map((skill, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="flex items-center gap-3 font-sans font-bold text-2xl md:text-4xl uppercase tracking-tight text-foreground/15 whitespace-nowrap transition-colors duration-300 hover:text-primary"
          >
            {skill}
            <span className="text-primary/50 text-base md:text-xl" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="stack" className="relative isolate py-24 md:py-32 border-t border-border bg-card/50 overflow-hidden">
      <SectionWatermark index="02" side="left" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel index="02" label="Stack Técnico" />

        <Reveal>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-12">
            Herramientas del <span className="text-primary">oficio</span>
          </h2>
        </Reveal>
      </div>

      {/* Ticker band */}
      <div
        className="marquee group flex flex-col gap-3 py-6 mb-14 border-y border-border/60 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <MarqueeRow items={MARQUEE_ROWS[0]} />
        <MarqueeRow items={MARQUEE_ROWS[1]} reverse />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <RevealGroup className="flex flex-col gap-8" stagger={0.1}>
          {SKILL_GROUPS.map((group) => (
            <RevealItem key={group.category} className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-28 shrink-0 flex items-center gap-2">
                <span className="text-primary font-mono text-xs" aria-hidden="true">
                  &gt;
                </span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag font-mono text-xs border border-border bg-secondary text-muted-foreground px-3 py-1.5 tracking-wide uppercase transition-all duration-200 cursor-default hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
