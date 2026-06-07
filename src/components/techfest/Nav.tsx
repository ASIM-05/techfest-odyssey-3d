import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#speakers", label: "Speakers" },
  { href: "#register", label: "Register" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-lg font-bold tracking-widest">
          <span className="text-neon">T</span>F<span className="text-neon-cyan">26</span>
        </a>
        <ul className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-neon-cyan">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#register"
          className="neon-border rounded-md bg-neon-magenta px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-foreground"
        >
          Get pass
        </a>
      </div>
    </nav>
  );
}
