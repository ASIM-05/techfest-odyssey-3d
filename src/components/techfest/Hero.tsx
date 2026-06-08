export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Content — 3D lives in the global Scene3D behind everything */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan" />
          Dec 12 — 14 · 2026
        </div>

        <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-[10rem]">
          <span className="block text-neon">TECH</span>
          <span className="block bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-violet bg-clip-text text-transparent">
            FEST 26
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-mono text-sm uppercase tracking-[0.4em] text-muted-foreground md:text-base">
          // Echoes of Tomorrow
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/80 md:text-lg">
          A three-day descent into the neon city where engineers, dreamers and
          machines collide. Build the future, then burn it down for fun.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#register"
            className="neon-border animate-pulse-neon pointer-events-auto group relative overflow-hidden rounded-md bg-neon-magenta px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Register →
          </a>
          <a
            href="#events"
            className="neon-border-cyan pointer-events-auto rounded-md bg-transparent px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-neon-cyan transition-transform hover:scale-105"
          >
            Explore Events
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-neon-cyan to-transparent" />
        scroll
      </div>
    </section>
  );
}
