import { useState } from "react";
import { useReveal } from "@/hooks/use-techfest";

const SPEAKERS = [
  { name: "Dr. Aria Vex", role: "Quantum Architect", org: "CERN" },
  { name: "Kenji Mori", role: "Robotics Lead", org: "Boston Dynamics" },
  { name: "Lena Okafor", role: "AI Researcher", org: "DeepMind" },
  { name: "Ravi Shah", role: "Founder", org: "Neuralink × Open" },
  { name: "Mira Castel", role: "Chief Scientist", org: "SpaceX" },
  { name: "Yuki Tanaka", role: "Cryptographer", org: "Ethereum FN" },
];

const SCHEDULE = {
  "Day 01": [
    { time: "10:00", title: "Opening · Neon Drop", room: "Main Stage" },
    { time: "12:30", title: "Keynote — Aria Vex", room: "Hall A" },
    { time: "15:00", title: "Robowars Qualifiers", room: "Arena 01" },
    { time: "20:00", title: "Drone Light Show", room: "Skydeck" },
  ],
  "Day 02": [
    { time: "09:00", title: "Hackathon Kickoff", room: "Maker Lab" },
    { time: "13:00", title: "AI Olympiad — Round 1", room: "Hall B" },
    { time: "17:00", title: "Keynote — Mira Castel", room: "Main Stage" },
    { time: "22:00", title: "After-Dark Cypher", room: "Underground" },
  ],
  "Day 03": [
    { time: "10:00", title: "Quantathon Finals", room: "Hall C" },
    { time: "14:00", title: "Robowars Grand Final", room: "Arena 01" },
    { time: "18:00", title: "Closing Ceremony", room: "Main Stage" },
    { time: "21:00", title: "Headline Set · TBA", room: "Main Stage" },
  ],
} as const;

type DayKey = keyof typeof SCHEDULE;

export function Speakers() {
  const { ref, visible } = useReveal();
  const [day, setDay] = useState<DayKey>("Day 01");

  return (
    <section id="speakers" ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-accent">// chapter_03</div>
        <h2 className="mt-3 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Voices <span className="text-foreground/40">·</span> <span className="text-neon">Signals</span>
        </h2>

        {/* Speakers */}
        <div
          className={`mt-12 grid gap-5 transition-all duration-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {SPEAKERS.map((s, i) => (
            <div
              key={s.name}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md border border-border bg-card/40 backdrop-blur transition-transform duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* avatar gradient */}
              <div
                aria-hidden
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, oklch(0.30 0.10 ${280 + i * 12}), oklch(0.15 0.05 ${260 + i * 8}))`,
                }}
              />
              {/* glitch grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.85 0.18 200 / 0.35) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.30 330 / 0.35) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* initials */}
              <div className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-foreground/15 transition-all duration-500 group-hover:scale-110 group-hover:text-neon-cyan/40">
                {s.name.split(" ").map((p) => p[0]).join("")}
              </div>
              {/* meta */}
              <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/70 p-3 backdrop-blur">
                <div className="font-display text-sm font-semibold">{s.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                  {s.role}
                </div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">{s.org}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="mt-24">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              <span className="text-neon-cyan">Schedule</span>
            </h3>
            <div className="flex gap-2">
              {(Object.keys(SCHEDULE) as DayKey[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                    day === d
                      ? "neon-border bg-neon-magenta text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <ol className="mt-8 relative border-l border-border pl-6">
            {SCHEDULE[day].map((s, i) => (
              <li
                key={s.time}
                className="relative mb-6 grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-md border border-border bg-card/40 p-4 backdrop-blur transition-all hover:border-neon-cyan/60"
                style={{ animation: `fade-in 0.5s ease-out ${i * 80}ms backwards` }}
              >
                <span className="absolute -left-[31px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.85_0.18_200)]" />
                <span className="font-mono text-sm text-neon-cyan">{s.time}</span>
                <span className="font-display text-lg font-semibold">{s.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.room}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
