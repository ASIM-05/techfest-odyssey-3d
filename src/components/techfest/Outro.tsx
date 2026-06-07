import { useState } from "react";

const SPONSORS = [
  "NEXUS LABS", "QUANTUM/CO", "VOID INDUSTRIES", "HELIX AI",
  "PRISM CHIPS", "ORBIT WORKS", "NEON BANK", "ZERO STACK",
];

export function Sponsors() {
  return (
    <section className="relative overflow-hidden border-y border-border py-12">
      <div className="mb-6 px-6 text-center font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
        // powered_by
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-12 pr-12">
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <div
              key={i}
              className="flex h-16 min-w-[220px] items-center justify-center rounded border border-border bg-card/30 px-8 font-display text-xl font-bold tracking-widest text-foreground/60 backdrop-blur transition-all hover:border-neon-magenta hover:text-neon"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Register() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section
      id="register"
      className="perspective-1000 relative overflow-hidden px-6 py-32"
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.30 330 / 0.35), transparent 60%)",
        }}
      />
      {/* receding grid */}
      <div
        aria-hidden
        className="bg-grid-floor absolute bottom-0 left-1/2 h-[40vh] w-[200vw] -translate-x-1/2"
        style={{ transform: "translateX(-50%) rotateX(70deg)", transformOrigin: "50% 0%", maskImage: "linear-gradient(to bottom, oklch(0 0 0), transparent 80%)" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan">
          // final_call
        </div>
        <h2 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          Get on the
          <br />
          <span className="bg-gradient-to-r from-neon-magenta via-neon-violet to-neon-cyan bg-clip-text text-transparent">
            guest list.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-foreground/75">
          Drop your signal. We'll send the badge, the map, and three days of
          intel before the gates open.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setSent(true);
          }}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@signal.net"
            className="neon-border-cyan flex-1 rounded-md bg-card/60 px-5 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="neon-border animate-pulse-neon rounded-md bg-neon-magenta px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            {sent ? "✓ locked in" : "Register"}
          </button>
        </form>

        <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          early-bird closes oct 31 · 2026
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <div>
          <span className="text-neon">TECHFEST_26</span> · echoes of tomorrow
        </div>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-neon-cyan">twitter</a>
          <a href="#" className="transition-colors hover:text-neon-cyan">instagram</a>
          <a href="#" className="transition-colors hover:text-neon-cyan">discord</a>
          <a href="#" className="transition-colors hover:text-neon-cyan">github</a>
        </div>
        <div>© 2026 · made in the neon city</div>
      </div>
    </footer>
  );
}
