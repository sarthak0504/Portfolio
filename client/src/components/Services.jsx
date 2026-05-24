import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  {
    title: 'Frontend Development',
    description: 'Pixel-perfect React UIs with smooth animations, responsive layouts, and fast load times.',
    color: '#6366f1',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: 'Full Stack Web Apps',
    description: 'End-to-end web applications with React frontends, Node.js backends, and MongoDB databases.',
    color: '#8b5cf6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    title: 'Landing Pages',
    description: 'High-converting, visually polished landing pages that tell your story and drive action.',
    color: '#06b6d4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Admin Dashboards',
    description: 'Feature-rich admin panels with data visualization, role-based access, and real-time updates.',
    color: '#10b981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    title: 'API Integration',
    description: 'Connect your product to any third-party service — payment gateways, CRMs, data APIs, and more.',
    color: '#f59e0b',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    title: 'Website Optimization',
    description: 'Audit and improve Core Web Vitals, bundle size, SEO, and Lighthouse scores for existing sites.',
    color: '#ef4444',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            What I Build
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="t2 mt-4 max-w-xl text-base leading-relaxed">
            From polished UIs to scalable full-stack systems — everything you need to launch and grow your product online.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="svc-card"
              style={{ '--svc-color': svc.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
            >
              {/* Icon */}
              <div
                className="svc-icon-wrap"
                style={{
                  background: `${svc.color}18`,
                  color: svc.color,
                }}
              >
                {svc.icon}
              </div>

              {/* Text */}
              <h3 className="text-base font-semibold t1 mb-2">{svc.title}</h3>
              <p className="text-sm t3 leading-relaxed">{svc.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
