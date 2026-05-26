// ─── Easing curves ───────────────────────────────────────────────────────────
export const EASE_EXPO  = [0.16, 1, 0.3, 1];
export const EASE_SOFT  = [0.22, 1, 0.36, 1];
export const EASE_BACK  = [0.34, 1.4, 0.64, 1];
export const SPRING_SNAPPY = { type: 'spring', stiffness: 320, damping: 22 };
export const SPRING_SOFT   = { type: 'spring', stiffness: 180, damping: 20 };

// ─── Viewport config ─────────────────────────────────────────────────────────
export const VP = { once: false, margin: '-80px' };

// ─── Base variants ────────────────────────────────────────────────────────────
// No filter:blur — it forces GPU layer promotion per-frame and causes jank

export const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.4, ease: EASE_SOFT } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO } },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO } },
};

export const scaleUp = {
  hidden:  { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.45, ease: EASE_BACK } },
};

export const cardReveal = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: EASE_SOFT } },
};

// ─── Stagger container factory ────────────────────────────────────────────────
export const stagger = (delay = 0.1, start = 0.05) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay, delayChildren: start } },
});

// ─── Text line reveal ─────────────────────────────────────────────────────────
export const lineReveal = {
  hidden:  { opacity: 0, y: '55%' },
  visible: { opacity: 1, y: '0%',
    transition: { duration: 0.6, ease: EASE_EXPO } },
};
