import { useMouse } from "@/hooks/use-techfest";

export function NeonCursor() {
  const { x, y } = useMouse();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-40 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl transition-transform duration-300 ease-out"
      style={{
        transform: `translate3d(${x - 210}px, ${y - 210}px, 0)`,
        background:
          "radial-gradient(circle, oklch(0.72 0.30 330 / 0.35), transparent 60%)",
      }}
    />
  );
}
