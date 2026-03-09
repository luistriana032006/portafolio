export function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">01</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Sobre Mí</span>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left — stat block */}
          <div className="flex flex-col gap-6">
            <div className="border border-border bg-card p-6">
              <span className="font-mono text-4xl font-bold text-primary">220+</span>
              <p className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                Estudiantes tutoreados
              </p>
            </div>
            <div className="border border-border bg-card p-6">
              <span className="font-mono text-4xl font-bold text-primary">2027</span>
              <p className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                Target MBZUAI Dubai
              </p>
            </div>
          </div>

          {/* Right — paragraph */}
          <div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-6">
              Primero en mi familia
              <br />
              <span className="text-primary">en ir a la universidad.</span>
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted-foreground mb-6">
              Estudiante de Ingeniería en Desarrollo de Software en la Corporación Universitaria
              Iberoamericana — actualmente en 4to semestre, modalidad virtual, con graduación estimada
              en 2028. Técnico SENA en proceso de grado (2026). Fui tutor en Dev Senior Code enseñando
              Java/Spring Boot a más de 220 estudiantes.
            </p>
            <p className="font-sans text-base leading-relaxed text-muted-foreground mb-8">
              Hoy construyo herramientas de IA y tengo como meta el Master's en ML Engineering en MBZUAI,
              Dubai — 2027. Mi enfoque actual es aplicar ML a problemas reales del agro colombiano.
            </p>
            <div className="flex items-center gap-3 border-l-2 border-primary pl-4">
              <p className="font-mono text-sm text-muted-foreground italic">
                "De Socorro, Santander — hacia el mundo."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
