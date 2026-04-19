export function Tutorials() {
  return (
    <section id="tutoriales" className="py-24 md:py-32 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">05</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Tutoriales</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
          Cosas que estoy
          <span className="text-primary"> aprendiendo</span>
        </h2>

        {/* Coming soon banner */}
        <div className="relative overflow-hidden border border-border bg-card">

          {/* Subtle dot grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #222222 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Cyan top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Content */}
          <div className="relative flex flex-col items-center text-center py-20 px-8 gap-6">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">En construcción</span>
            </div>

            {/* Headline */}
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-foreground max-w-lg leading-tight">
              Próximamente tutoriales,<br />análisis y notas de campo.
            </h3>

            {/* Description */}
            <p className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed">
              Análisis de datos con Jupyter, configuración de agentes de IA, apuntes de ML Engineering
              y todo lo que voy descubriendo en el camino.
            </p>

            {/* Decorative separator */}
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px w-12 bg-border" />
              <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">LMTR</span>
              <div className="h-px w-12 bg-border" />
            </div>
          </div>

          {/* Cyan bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

      </div>
    </section>
  )
}
