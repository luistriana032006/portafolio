const SKILL_GROUPS = [
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'FastAPI', 'Python'],
  },
  {
    category: 'AI / ML',
    skills: ['Ollama', 'ChromaDB', 'scikit-learn', 'pandas', 'NumPy', 'Time Series'],
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
    skills: ['PostgreSQL', 'MySQL'],
  },
]

export function Skills() {
  return (
    <section id="stack" className="py-24 md:py-32 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">02</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Stack Técnico</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-12">
          Herramientas del{' '}
          <span className="text-primary">oficio</span>
        </h2>

        <div className="flex flex-col gap-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-28 shrink-0">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag font-mono text-xs border border-border bg-secondary text-muted-foreground px-3 py-1.5 tracking-wide uppercase transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
