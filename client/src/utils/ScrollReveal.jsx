import { useTransform, motion, useReducedMotion } from 'framer-motion';

// Scroll-linked reveal — tied directly to the section's scrollYProgress so
// animating backward on scroll-up is free (no re-trigger overhead).
// sp = useScroll scrollYProgress from the parent section
// i  = stagger index (each +1 adds 0.05 scroll offset)

export function Reveal({ sp, i = 0, children, className, style }) {
  const reduced = useReducedMotion();
  const s = Math.min(i * 0.05, 0.35);
  const opacity = useTransform(sp, [s, s + 0.16], [0, 1]);
  const y = useTransform(sp, [s, s + 0.16], [16, 0]);
  return (
    <motion.div
      style={reduced ? style : { opacity, y, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealLeft({ sp, i = 0, children, className, style }) {
  const reduced = useReducedMotion();
  const s = Math.min(i * 0.05, 0.35);
  const opacity = useTransform(sp, [s, s + 0.16], [0, 1]);
  const x = useTransform(sp, [s, s + 0.16], [-20, 0]);
  return (
    <motion.div
      style={reduced ? style : { opacity, x, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealRight({ sp, i = 0, children, className, style }) {
  const reduced = useReducedMotion();
  const s = Math.min(i * 0.05, 0.35);
  const opacity = useTransform(sp, [s, s + 0.16], [0, 1]);
  const x = useTransform(sp, [s, s + 0.16], [20, 0]);
  return (
    <motion.div
      style={reduced ? style : { opacity, x, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
