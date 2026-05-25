import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const ease = [0.22, 1, 0.36, 1];

/* SVG icons per category */
function ThumbIcon({ accentColor }) {
  return (
    <div className="proj-thumb-icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    </div>
  );
}

function ProjectCard({ project, delay, inView }) {
  const from    = project.gradientFrom  ?? '#0d0d1a';
  const to      = project.gradientTo    ?? '#111128';
  const accent  = project.accentColor   ?? '#2563eb';

  return (
    <motion.div
      className="proj-card"
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease }}
    >
      {/* Gradient thumbnail */}
      <div
        className="proj-thumb"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {/* Noise texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${accent}40 0%, transparent 55%),
                              radial-gradient(circle at 75% 70%, ${accent}25 0%, transparent 45%)`,
          }}
        />
        <ThumbIcon accentColor={accent} />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: project.status === 'Ongoing' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)',
              color: project.status === 'Ongoing' ? '#22c55e' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${project.status === 'Ongoing' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: accent, fontFamily: 'JetBrains Mono, monospace' }}>
            {project.category}
          </span>
          <span className="t4">·</span>
          <span className="t3">{project.period}</span>
        </div>

        {/* Title + desc */}
        <div>
          <h3 className="text-base font-bold t1 leading-snug mb-2">{project.title}</h3>
          <p className="text-sm t2 leading-relaxed">{project.shortDescription}</p>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                background: `${accent}15`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded-md t3" style={{ background: 'var(--border)' }}>
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-2 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg t2"
              style={{ border: '1px solid var(--border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </motion.a>
          )}

          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </motion.a>
          )}

          <Link
            to={`/projects/${project.id}`}
            className="ml-auto text-xs font-semibold flex items-center gap-1 t3 hover:t1 transition-colors"
          >
            Case Study
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="academic-projects" ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Academic Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Academic <span className="gradient-text">Projects</span>
          </h2>
          <p className="t2 mt-4 max-w-xl text-base leading-relaxed">
            Research and engineering projects from my degree — spanning ML systems, computer vision, and full-stack development.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {data?.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
