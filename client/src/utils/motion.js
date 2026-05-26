// ─── Easing curves ────────────────────────────────────────────────────────────
// GPU-safe: only opacity + transform animations. No filter/blur/box-shadow/layout.
export const EASE_EXPO = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.22, 1, 0.36, 1];

// ─── Viewport config ──────────────────────────────────────────────────────────
// once:true — IntersectionObserver disconnects after first trigger (cheaper)
// amount:0.1 — fires when 10% visible; no late pop-in on fast scrollers
export const VP = { once: true, amount: 0.10 };

// ─── Base variants ─────────────────────────────────────────────────────────────
// All use only opacity + translateY/X — compositor-only, zero layout impact.

export const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.38, ease: EASE_SOFT } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.5, ease: EASE_EXPO } },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.5, ease: EASE_EXPO } },
};

export const cardReveal = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.42, ease: EASE_SOFT } },
};

// No scale — keeps compositor layer count low for card grids
export const scaleUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.42, ease: EASE_SOFT } },
};

// ─── Stagger container factory ─────────────────────────────────────────────────
export const stagger = (delay = 0.08, start = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay, delayChildren: start } },
});

// ─── Text line reveal ──────────────────────────────────────────────────────────
// Pixel y (not %) — Framer Motion resolves % to px at paint time causing extra work
export const lineReveal = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.52, ease: EASE_EXPO } },
};
