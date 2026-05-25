// ─── Easing curves ───────────────────────────────────────────────────────────
export const EASE_EXPO = [0.16, 1, 0.3, 1]; // sharp snap-in
export const EASE_SOFT = [0.22, 1, 0.36, 1]; // smooth glide
export const EASE_BACK = [0.34, 1.4, 0.64, 1]; // slight overshoot
export const SPRING_SNAPPY = { type: "spring", stiffness: 320, damping: 22 };
export const SPRING_SOFT = { type: "spring", stiffness: 180, damping: 20 };

// ─── Viewport config ─────────────────────────────────────────────────────────
export const VP = { once: false, margin: "-72px" };

// ─── Base variants ────────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_SOFT },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -44, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 44, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.88, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_BACK },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SOFT },
  },
};

// ─── Stagger container factory ────────────────────────────────────────────────
export const stagger = (delay = 0.1, start = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: start } },
});

// ─── Text line reveal (clip from bottom) ─────────────────────────────────────
export const lineReveal = {
  hidden: { opacity: 0, y: "60%", filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};
