import { useScrollY } from "@/hooks/use-techfest";

export function Hero() {
  const y = useScrollY();

  return (
    <section
      id="hero"
      className="perspective-2000 relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Sky glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, oklch(0.45 0.22 320 / 0.55), transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.85 0.18 200 / 0.35), transparent 60%)",
        }}
      />

      {/* Horizon line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
        style={{ top: "62%", boxShadow: "0 0 40px oklch(0.85 0.18 200 / 0.9)" }}
      />

      {/* Grid floor */}
      <div
        aria-hidden
        className="bg-grid-floor absolute bottom-0 left-1/2 h-[60vh] w-[220vw] -translate-x-1/2"
        style={{
          transform: `translateX(-50%) rotateX(70deg) translateY(${y * 0.2}px)`,
          transformOrigin: "50% 0%",
          maskImage:
            "linear-gradient(to bottom, oklch(0 0 0) 0%, transparent 80%)",
        }}
      />

      {/* Skyline silhouette */}
      <div
        aria-hidden
        className="absolute bottom-[38%] left-0 right-0 h-40"
        style={{ transform: `translateY(${-y * 0.15}px)` }}
      >
        <Skyline />
      </div>

      {/* Floating billboard cube */}
      <div
        className="perspective-1000 absolute right-[8%] top-[18%] hidden md:block"
        style={{ transform: `translateY(${-y * 0.4}px)` }}
      >
        <div className="preserve-3d animate-float-slow relative h-40 w-40">
          <CubeFace transform="translateZ(80px)" label="2026" tone="magenta" />
          <CubeFace transform="rotateY(180deg) translateZ(80px)" label="LIVE" tone="cyan" />
          <CubeFace transform="rotateY(90deg) translateZ(80px)" label="FEST" tone="violet" />
          <CubeFace transform="rotateY(-90deg) translateZ(80px)" label="TECH" tone="cyan" />
          <CubeFace transform="rotateX(90deg) translateZ(80px)" label="∞" tone="magenta" />
          <CubeFace transform="rotateX(-90deg) translateZ(80px)" label="∞" tone="violet" />
        </div>
      </div>

      {/* Floating shards */}
      <FloatingShard className="left-[10%] top-[20%]" delay={0} y={y * -0.3} />
      <FloatingShard className="left-[18%] top-[60%]" delay={2} y={y * -0.5} />
      <FloatingShard className="right-[22%] top-[70%]" delay={4} y={y * -0.25} />

      {/* Content */}
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
            className="neon-border animate-pulse-neon group relative overflow-hidden rounded-md bg-neon-magenta px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Register →
          </a>
          <a
            href="#events"
            className="neon-border-cyan rounded-md bg-transparent px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-neon-cyan transition-transform hover:scale-105"
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

function CubeFace({
  transform,
  label,
  tone,
}: {
  transform: string;
  label: string;
  tone: "magenta" | "cyan" | "violet";
}) {
  const map = {
    magenta: "neon-border text-neon",
    cyan: "neon-border-cyan text-neon-cyan",
    violet: "border border-accent text-accent",
  };
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-card/40 backdrop-blur-sm ${map[tone]}`}
      style={{ transform }}
    >
      <span className="font-display text-3xl font-bold tracking-wider">{label}</span>
    </div>
  );
}

function FloatingShard({
  className,
  delay,
  y,
}: {
  className: string;
  delay: number;
  y: number;
}) {
  return (
    <div
      aria-hidden
      className={`animate-float-slow absolute h-12 w-12 ${className}`}
      style={{ animationDelay: `${delay}s`, transform: `translateY(${y}px)` }}
    >
      <div className="neon-border-cyan h-full w-full rotate-45 bg-card/30 backdrop-blur" />
    </div>
  );
}

function Skyline() {
  // simple SVG silhouette
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.20 0.06 290)" />
          <stop offset="100%" stopColor="oklch(0.08 0.03 280)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#bld)"
        d="M0,160 L0,90 L40,90 L40,60 L80,60 L80,100 L120,100 L120,40 L160,40 L160,80 L200,80 L200,30 L240,30 L240,70 L290,70 L290,55 L330,55 L330,100 L380,100 L380,20 L420,20 L420,90 L460,90 L460,50 L510,50 L510,75 L560,75 L560,40 L600,40 L600,90 L650,90 L650,30 L700,30 L700,70 L740,70 L740,55 L790,55 L790,95 L830,95 L830,45 L880,45 L880,80 L930,80 L930,30 L970,30 L970,75 L1020,75 L1020,55 L1070,55 L1070,90 L1120,90 L1120,60 L1160,60 L1160,85 L1200,85 L1200,160 Z"
      />
      {/* window lights */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect
          key={i}
          x={20 + i * 30}
          y={100 + (i % 3) * 12}
          width="3"
          height="3"
          fill={i % 2 ? "oklch(0.85 0.18 200)" : "oklch(0.72 0.30 330)"}
          opacity="0.9"
        />
      ))}
    </svg>
  );
}
