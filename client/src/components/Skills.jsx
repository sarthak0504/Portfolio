import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CATEGORIES = [
  { key: 'programmingLanguages', label: 'Programming Languages', num: '01', accent: '#f59e0b' },
  { key: 'webDevelopment',       label: 'Web Development',       num: '02', accent: '#6366f1' },
  { key: 'databases',            label: 'Databases',             num: '03', accent: '#06b6d4' },
  { key: 'tools',                label: 'Tools & Platforms',     num: '04', accent: '#10b981' },
  { key: 'ml',                   label: 'ML & Data Science',     num: '05', accent: '#8b5cf6' },
];

export default function Skills({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref} className="section-padding">
      <div className="sk-wrap">

        {/* ── Section header ── */}
        <motion.div
          className="sk-section-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="sk-section-label">TECHNICAL PROFICIENCY</div>
          <h2 className="sk-section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* ── Runway rows ── */}
        <div className="sk-runway">
          {CATEGORIES.map((cat, ci) =>
            data?.[cat.key] ? (
              <motion.div
                key={cat.key}
                className="sk-row"
                style={{ '--row-accent': cat.accent }}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ghost watermark number */}
                <span className="sk-ghost-num" aria-hidden="true">{cat.num}</span>

                {/* Left: meta */}
                <div className="sk-meta">
                  <span className="sk-num">{cat.num}</span>
                  <span className="sk-label">{cat.label}</span>
                </div>

                {/* Vertical rule */}
                <span className="sk-vline" />

                {/* Right: pills */}
                <div className="sk-pills">
                  {data[cat.key].map((skill, si) => (
                    <motion.span
                      key={skill.name}
                      className="sk-pill"
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.28,
                        delay: ci * 0.1 + si * 0.06 + 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : null
          )}
        </div>

      </div>
    </section>
  );
}
