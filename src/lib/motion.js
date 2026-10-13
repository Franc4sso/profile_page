// Shared, mutable motion state. The 3D scene writes to it every frame,
// scroll handlers write progress, and components read from it inside
// requestAnimationFrame loops. Kept outside React on purpose: these values
// change 60 times a second and must never trigger renders.
const canQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'

export const motion = {
  mouse: { x: 0, y: 0 },   // smoothed pointer, -0.5..0.5
  tmouse: { x: 0, y: 0 },  // raw pointer target
  clock: 0,                // seconds since the scene started
  progress: 0,             // 0..4 inside the story
  extra: 0,                // viewports scrolled past the story
  pulse: 0,
  pulseAt: 0,
  reduce: canQuery && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  hover: canQuery && window.matchMedia('(hover:hover)').matches,
}

export const smooth = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

export const rand = (a, b) => a + Math.random() * (b - a)
