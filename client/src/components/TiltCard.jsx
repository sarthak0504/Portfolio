import { useRef, useCallback } from 'react';

/**
 * Wraps children in a div that tilts in 3D toward the mouse cursor.
 * Uses pure DOM transforms for performance — no re-renders on mousemove.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 11,
  glare = true,
  scale = 1.03,
  ...rest
}) {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px   = (e.clientX - rect.left) / rect.width;   // 0→1
    const py   = (e.clientY - rect.top)  / rect.height;  // 0→1
    const rotY =  (px - 0.5) * maxTilt * 2;
    const rotX = -(py - 0.5) * maxTilt * 2;

    el.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    el.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;

    if (glare && glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(circle at ${px*100}% ${py*100}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
    }
  }, [maxTilt, scale, glare]);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.03,0.98,0.52,0.99), box-shadow 0.4s ease';
    el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    if (glare && glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      {glare && (
        <div ref={glareRef} className="tilt-glare" />
      )}
    </div>
  );
}
