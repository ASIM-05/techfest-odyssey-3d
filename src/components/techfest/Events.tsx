import { useRef, useState } from "react";
import { useReveal } from "@/hooks/use-techfest";

const EVENTS = [
  { code: "01", name: "Robowars", tag: "Combat Arena", desc: "150kg of welded fury. Last bot standing takes the crown.", color: "magenta" },
  { code: "02", name: "Hackathon", tag: "48h Build", desc: "From idle terminal to working product. Sleep is optional.", color: "cyan" },
  { code: "03", name: "AI Olympiad", tag: "Model Wars", desc: "Train, fine-tune, deploy. Leaderboard updates live.", color: "violet" },
  { code: "04", name: "Drone Racing", tag: "FPV Circuit", desc: "Sub-200g machines threading a neon obstacle grid.", color: "cyan" },
  { code: "05", name: "Cubing", tag: "Speed Solve", desc: "World-record holders chasing single-digit times.", color: "magenta" },
  { code: "06", name: "Quantathon", tag: "Qubit Quest", desc: "Real quantum hardware. Real entanglement. Real prizes.", color: "violet" },
];

export function Events() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="events"
      ref={ref}
      className="relative px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-neon-magenta">// chapter_02</div>
            <h2 className="mt-3 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              <span className="text-neon-cyan">Events</span> <span className="text-foreground/40">/</span> 200+
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase tracking-widest text-muted-foreground">
            tilt · click · enter the arena
          </p>
        </header>

        <div
          className={`perspective-1000 grid gap-6 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {EVENTS.map((e, i) => (
            <TiltCard key={e.code} index={i} open={open === i} onClick={() => setOpen(open === i ? null : i)} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  event,
  open,
  onClick,
  index,
}: {
  event: (typeof EVENTS)[number];
  open: boolean;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 12, y: px * 12 });
  };

  const tone =
    event.color === "magenta"
      ? "neon-border text-neon"
      : event.color === "cyan"
      ? "neon-border-cyan text-neon-cyan"
      : "border border-accent text-accent";

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      className={`preserve-3d group relative cursor-pointer overflow-hidden rounded-lg bg-card/40 p-6 text-left backdrop-blur transition-all duration-300 ${tone}`}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent 40%, oklch(1 0 0 / 0.08) 50%, transparent 60%)",
        }}
      />
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          #{event.code}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {event.tag}
        </span>
      </div>
      <h3 className="mt-8 font-display text-3xl font-bold tracking-tight">{event.name}</h3>
      <p className="mt-3 text-sm text-foreground/70">{event.desc}</p>

      <div
        className={`grid overflow-hidden transition-all duration-500 ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 space-y-2 font-mono text-xs text-foreground/70">
          <div>› Prize pool: ₹5,00,000</div>
          <div>› Team size: 1–4</div>
          <div>› Venue: Arena {event.code}</div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
        <span>{open ? "collapse" : "expand"}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}
