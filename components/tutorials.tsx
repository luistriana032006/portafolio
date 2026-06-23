export function Tutorials() {
  return (
    <section id="tutoriales" className="py-24 md:py-32 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">05</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">Tutoriales / Recursos</span>
        </div>

        <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground text-balance leading-tight mb-16">
          Cosas que estoy
          <span className="text-primary"> aprendiendo</span>
        </h2>

        {/* Resources grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <a
            href="https://glosario.luistriana.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover group relative flex flex-col border border-border bg-card p-6 no-underline"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

            {/* Icon + badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/10 text-primary font-mono text-lg font-bold">
                A
              </div>
              <span className="font-mono text-[10px] text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 uppercase tracking-widest">
                Disponible
              </span>
            </div>

            {/* Title */}
            <h3 className="font-sans font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
              Glosario de Programación
            </h3>

            {/* Description */}
            <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
              Términos clave del desarrollo de software explicados de forma clara y directa. Desde conceptos básicos hasta patrones y arquitecturas.
            </p>

            {/* Footer */}
            <div className="flex items-center gap-2 font-mono text-xs text-primary">
              <span>glosario.luistriana.dev</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true" />
          </a>
        </div>

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
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

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
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        </div>

      </div>
    </section>
  )
}
