import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts up from 0 to `to` when it enters the viewport.
 * `to` can include a suffix like "700+" or "7.91" or "3+".
 */
export default function AnimatedCounter({ to, duration = 1600 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  const raw     = to.replace(/[^0-9.]/g, '');
  const num     = parseFloat(raw);
  const suffix  = to.replace(/[0-9.]/g, '');
  const isFloat = raw.includes('.');
  const decimals = isFloat ? (raw.split('.')[1] || '').length : 0;

  useEffect(() => {
    if (!inView) return;
    let start     = 0;
    const step    = num / (duration / 16);
    const timer   = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplay(start.toFixed(decimals) + suffix);
      if (start >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num, duration, decimals, suffix]);

  return <span ref={ref}>{display}</span>;
}
