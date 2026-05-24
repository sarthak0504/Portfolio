import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  );
}

function ClientCard({ project, delay, inView }) {
  const { gradientFrom, gradientTo, accentColor, url } = project;
  const domain = url.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <motion.div
      className="proj-card group"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease }}
    >
      {/* Gradient thumbnail */}
      <div
        className="proj-thumb relative"
        style={{ background: `linear-gradient(140deg, ${gradientFrom}, ${gradientTo})`, height: '10rem' }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 60% at 30% 40%, ${accentColor}35 0%, transparent 70%),
                              radial-gradient(ellipse 40% 50% at 75% 70%, ${accentColor}18 0%, transparent 60%)`,
          }}
        />

        {/* Browser chrome mockup */}
        <div
          className="absolute inset-4 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.45)',
            border: `1px solid ${accentColor}30`,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: `1px solid ${accentColor}20` }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <span key={c} className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c, opacity: 0.7 }} />
            ))}
            <span
              className="ml-2 flex-1 text-center rounded px-2 py-0.5"
              style={{
                background: 'rgba(255,255,255,0.06)',
                fontSize: '0.58rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {domain}
            </span>
          </div>
          <div className="flex items-center justify-center h-[calc(100%-2rem)]">
            <span style={{ color: `${accentColor}60`, fontSize: '1.4rem' }}>⬡</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Role badge + URL */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
          >
            {project.role}
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--c4)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {domain}
          </span>
        </div>

        {/* Title + tagline */}
        <div>
          <h3 className="text-base font-bold t1 leading-snug mb-1">{project.title}</h3>
          <p className="text-xs font-semibold" style={{ color: accentColor }}>{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm t2 leading-relaxed flex-1">{project.description}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: `${accentColor}10`,
                color: accentColor,
                border: `1px solid ${accentColor}25`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2" style={{ borderTop: '1px solid var(--border)' }}>
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            Visit Live Site
            <ExternalIcon />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientProjects({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  if (!data?.length) return null;

  return (
    <section id="client-work" ref={ref} className="section-padding bg-alt">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Real-World Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Client <span className="gradient-text">Projects</span>
          </h2>
          <p className="t2 mt-4 max-w-xl text-base leading-relaxed">
            Live websites built for real clients — currently active on the web.
          </p>
        </motion.div>

        {/* Cards — 3-column on large, 2 on md, 1 on sm */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((project, i) => (
            <ClientCard
              key={project.id}
              project={project}
              delay={i * 0.1}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
