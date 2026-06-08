import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/techfest/Hero";
import { About } from "@/components/techfest/About";
import { Events } from "@/components/techfest/Events";
import { Speakers } from "@/components/techfest/Speakers";
import { Sponsors, Register, Footer } from "@/components/techfest/Outro";
import { Nav } from "@/components/techfest/Nav";
import { NeonCursor } from "@/components/techfest/NeonCursor";
import { Scene3D } from "@/components/techfest/Scene3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Techfest 26 — Echoes of Tomorrow" },
      {
        name: "description",
        content:
          "Three days inside the neon city. Robowars, hackathons, AI olympiads and speakers from CERN to SpaceX. Dec 12–14, 2026.",
      },
      { property: "og:title", content: "Techfest 26 — Echoes of Tomorrow" },
      {
        property: "og:description",
        content: "The festival that refuses to behave. Dec 12–14, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#07060f" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="scanlines noise relative">
      <Scene3D />
      <Nav />
      <NeonCursor />
      <main className="relative z-10">
        <Hero />
        <About />
        <Events />
        <Speakers />
        <Sponsors />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
