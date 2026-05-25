import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';

const STATS = [
  { value: '700+', label: 'Problems Solved',      sub: 'LeetCode · CodeChef · CF' },
  { value: '7.91', label: 'GPA',                  sub: 'Computer Engineering'     },
  { value: '2',    label: 'Internships',           sub: 'Industry Experience'      },
  { value: '3+',   label: 'Products Built',        sub: 'Full-stack & ML'          },
];

const STATUS = [
  { dot: '#22c55e',  text: 'Open to freelance projects' },
  { dot: '#06b6d4',  text: 'SWE Intern @ Neural Nurture' },
  { dot: '#8b5cf6',  text: 'CS Final Year · SGSITS Indore' },
  { dot: '#6366f1',  text: 'Building full-stack & ML products' },
];

const ease = [0.22, 1, 0.36, 1];

export default function About({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" ref={ref} className="section-padding bg-alt">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* Photo + Name + title */}
              <div className="mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="mb-4">
                  <img
                    src="/photo.png"
                    alt={data?.name ?? 'Sarthak Agrawal'}
                    className="w-24 h-24 rounded-full object-cover"
                    style={{ border: '2px solid var(--border)', boxShadow: '0 0 0 4px rgba(99,102,241,0.15)' }}
                  />
                </div>
                <h3 className="text-2xl font-bold t1 mb-1">{data?.name ?? 'Sarthak Agrawal'}</h3>
                <p className="text-sm font-medium" style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>
                  {data?.subtitle}
                </p>
              </div>

              {/* Bio */}
              <p className="t2 leading-relaxed text-sm mb-7">{data?.bio}</p>

              {/* Contact info */}
              <div className="space-y-2.5">
                {[
                  {
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    value: data?.location,
                    href: null,
                  },
                  {
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    value: data?.email,
                    href: `mailto:${data?.email}`,
                  },
                ].map(({ icon, value, href }) => (
                  <div key={value} className="flex items-center gap-2.5 text-sm t3">
                    <span className="flex-shrink-0" style={{ color: '#6366f1' }}>{icon}</span>
                    {href
                      ? <a href={href} className="hover:text-accent-indigo transition-colors">{value}</a>
                      : <span>{value}</span>}
                  </div>
                ))}
              </div>

              {/* Social links */}
              {data?.social && (
                <div className="flex gap-2 flex-wrap mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  {Object.entries(data.social).map(([key, href]) => (
                    <motion.a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium t2 capitalize transition-colors"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                    >
                      {key}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Stats + status */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {STATS.map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="text-2xl font-black gradient-text leading-none mb-1">
                    <AnimatedCounter to={value} />
                  </div>
                  <div className="text-sm font-semibold t1 mb-0.5">{label}</div>
                  <div className="text-xs t3">{sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Status card */}
            <div
              className="rounded-xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p
                className="text-xs font-semibold tracking-widest mb-4 uppercase"
                style={{ color: '#06b6d4', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Current Status
              </p>
              <div className="space-y-3">
                {STATUS.map(({ dot, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.38, ease }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: dot, boxShadow: `0 0 6px ${dot}80`, animation: 'glow-pulse 2s infinite' }}
                    />
                    <span className="text-sm t2">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
