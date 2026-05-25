import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const TRUST_STATS = [
  { value: '3+',   label: 'Products Built'   },
  { value: '2',    label: 'Internships'       },
  { value: '700+', label: 'Problems Solved'   },
];

const MARQUEE_ITEMS = [
  'React', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs',
  'Full Stack Dev', 'Landing Pages', 'Admin Dashboards',
  'API Integrations', 'Web Applications', 'Performance',
];

export default function Hero({ data }) {
  const email = data?.email ?? 'agrawalsarthak0504@gmail.com';

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Gradient mesh background */}
      <div className="hero-mesh" aria-hidden="true" />

      {/* Dot-grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.55,
        }}
      />

      {/* Decorative large code bracket — far right, very subtle */}
      <div
        aria-hidden="true"
        className="absolute select-none pointer-events-none hidden xl:block"
        style={{
          right: '-1.5rem',
          top: '50%',
          transform: 'translateY(-52%)',
          fontSize: 'clamp(11rem, 19vw, 21rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(37,99,235,0.055)',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '-0.06em',
          userSelect: 'none',
        }}
      >
        {'</>'}
      </div>

      {/* Main content — flex-1 centers vertically, pushes marquee to bottom */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-28 w-full">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8"
          >
            <span className="badge">
              <span className="badge-dot" style={{ background: '#22c55e' }} />
              Open to New Projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.06] tracking-tight mb-8"
          >
            <span className="t1 block">I Build Modern</span>
            <span className="gradient-text block">Web Products</span>
            <span className="t1 block">That Deliver.</span>
          </motion.h1>

          {/* Sub-headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14"
          >
            <p className="text-lg t2 leading-relaxed max-w-[440px]">
              Full-stack developer crafting fast, clean, and polished
              digital experiences — from landing pages to complex web apps.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => {
                  window.history.pushState(null, '', '/work');
                  document.getElementById('client-work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                  boxShadow: '0 0 28px rgba(37,99,235,0.35)',
                }}
              >
                View My Work
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm t1"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                Let's Talk
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v5A1.5 1.5 0 0112.5 11H9l-3 2v-2H3.5A1.5 1.5 0 012 9.5v-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="flex items-center gap-8 pt-8 flex-wrap"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold t1 leading-none mb-1">{stat.value}</div>
                  <div className="text-xs t3 font-medium tracking-wide">{stat.label}</div>
                </div>
                {i < TRUST_STATS.length - 1 && (
                  <div className="w-px h-7 flex-shrink-0" style={{ background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scrolling marquee strip pinned to bottom of section */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{ borderTop: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <div className="hero-marquee">
          <div className="hero-marquee-inner">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="hero-marquee-item">
                <span className="hero-marquee-dot">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
