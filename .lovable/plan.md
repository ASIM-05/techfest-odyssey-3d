
# Techfest — Cyber Neon City

A single-page, scroll-driven experience with CSS pseudo-3D (perspective, translateZ, parallax layers) and tasteful motion. Lightweight, no WebGL.

## Concept

Neon-soaked skyline at night. The user falls *through* the city as they scroll — billboards, holograms, and grid floors slide past in parallax. Magenta/cyan on near-black, with chromatic-aberration text accents and scanline overlays.

## Visual System

- Palette: `--bg #07060f`, neon magenta `#ff2bd6`, electric cyan `#00f0ff`, acid violet `#7a3bff`, off-white `#f5f3ff`.
- Type: Space Grotesk (display) + JetBrains Mono (UI/labels). Big, tight, occasionally glitched.
- Motifs: scanlines, grid floor with horizon glow, neon outline buttons, holographic card sheen, animated noise.
- Tokens defined in `src/styles.css` under `@theme` + `:root`. Fonts loaded via `<link>` in `__root.tsx`.

## Sections (single page, snap-scroll optional)

1. **Hero** — "TECHFEST 26 · ECHOES OF TOMORROW". Layered parallax: grid floor + skyline silhouette + floating neon billboard cube that rotates with scroll/mouse. Glitch tagline, dual CTAs (Register / Explore). Scroll cue.
2. **About** — Split layout: large rotating wireframe orb (CSS 3D), copy on the right with stat counters (50K attendees, 200+ events, 3 days).
3. **Events** — Horizontal-scroll deck of interactive 3D cards (perspective tilt on hover, neon glow). 6 events: Robowars, Hackathon, AI Olympiad, Drone Racing, Cubing, Quantathon. Click → expands inline with details.
4. **Speakers & Schedule** — Speaker avatars in a holographic grid (hover lifts + glow). Below: 3-day schedule as a neon timeline with day tabs.
5. **Sponsors + Register** — Marquee of sponsor "logos" (stylized text plates). Big closing CTA with pulsing neon frame and email signup.
6. **Footer** — Mono links, social, year.

## Interactions

- Global: cursor-follow neon glow blob (subtle), animated noise overlay, scanline.
- Scroll: parallax layers via `transform: translate3d` driven by a single `useScroll` hook; section reveal with `IntersectionObserver` (fade + translateY).
- Hover: cards tilt with `rotateX/Y` from mouse position; neon edge intensifies.
- Transitions: section-to-section background hue shift; horizon glow brightens on event section.

## Tech

- TanStack Start routes:
  - `src/routes/index.tsx` — full landing page composed of section components.
- Components in `src/components/techfest/`: `Hero.tsx`, `About.tsx`, `Events.tsx`, `Speakers.tsx`, `Schedule.tsx`, `Sponsors.tsx`, `Register.tsx`, `Footer.tsx`, `NeonCursor.tsx`, `Scanlines.tsx`, `ParallaxLayer.tsx`, `TiltCard.tsx`.
- Hooks: `useScrollProgress`, `useMousePosition`, `useReveal`.
- Pure CSS pseudo-3D — `perspective`, `transform-style: preserve-3d`, `translateZ`, `rotateX/Y`. No three.js.
- All colors via semantic tokens in `src/styles.css`. No hardcoded hex in components.
- Update `__root.tsx` head: Space Grotesk + JetBrains Mono `<link>` tags, SEO title/desc/og for Techfest, theme-color meta.
- Update `index.tsx` head with Techfest-specific title/desc/og.

## SEO

- Title: "Techfest 26 — Echoes of Tomorrow" (<60).
- Description: festival pitch (<160).
- Single H1 in Hero, semantic `<section>` per block, alt text on any decorative svg (or `aria-hidden`).
- JSON-LD `Event` schema for the festival.

## Out of scope (this pass)

- Real registration backend, CMS, multi-page routes, WebGL/R3F.

## Placeholders used

Since no real content was provided: dates **Dec 12–14, 2026**, theme **Echoes of Tomorrow**, edition **Techfest 26**, fictional sponsors/speakers. Easy to swap later.
