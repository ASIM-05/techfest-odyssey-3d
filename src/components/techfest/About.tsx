import { useEffect, useState } from "react";
import { useReveal, useScrollY } from "@/hooks/use-techfest";

const STATS = [
  { value: 75, suffix: "K+", label: "Attendees" },
  { value: 200, suffix: "+", label: "Events" },
  { value: 3, suffix: "", label: "Days · Nights" },
  { value: 48, suffix: "h", label: "Hackathon" },
];

export function About() {
  const { ref, visible } = useReveal();
  const y = useScrollY();

  return (
    <section
      id="about"
      ref={ref}
      className="perspective-1000 relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2"
    >
      {/* Orb */}
      <div className="relative flex items-center justify-center">
        <div
          className="preserve-3d animate-spin-slow relative h-80 w-80 md:h-96 md:w-96"
          style={{ transform: `rotateX(${15 + y * 0.02}deg)` }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-neon-cyan/40"
              style={{
                transform: `rotateY(${(i * 180) / 16}deg)`,
                boxShadow: "0 0 20px oklch(0.85 0.18 200 / 0.25)",
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute inset-0 rounded-full border border-neon-magenta/40"
              style={{
                transform: `rotateX(90deg) rotateY(${(i * 180) / 8}deg)`,
                boxShadow: "0 0 20px oklch(0.72 0.30 330 / 0.25)",
              }}
            />
          ))}
          <div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.85 0.18 200), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>
      </div>

      {/* Copy */}
      <div
        className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan">
          // chapter_01
        </div>
        <h2 className="mt-3 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          The festival
          <br />
          <span className="text-neon">that refuses</span>
          <br />
          to behave.
        </h2>
        <p className="mt-6 max-w-md text-foreground/75">
          Techfest 26 is a controlled collision — robots clawing for arena
          supremacy, hackers wired on bad coffee, drones threading neon hoops,
          and speakers who actually have something to say. Three days, one city,
          zero apologies.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} active={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return (
    <div className="neon-border-cyan rounded-md bg-card/40 p-4 backdrop-blur">
      <div className="font-display text-4xl font-bold text-neon-cyan">
        {n}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
