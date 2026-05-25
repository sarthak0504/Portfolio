import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    description: 'Deep-dive into your goals, audience, and requirements to align on what success looks like.',
    color: '#2563eb',
  },
  {
    num: '02',
    title: 'Planning',
    description: 'Define scope, architecture, and milestones. You get a clear roadmap before a line is written.',
    color: '#0891b2',
  },
  {
    num: '03',
    title: 'Development',
    description: 'Clean, iterative builds with daily updates. You see progress at every stage of the process.',
    color: '#14b8a6',
  },
  {
    num: '04',
    title: 'Testing',
    description: 'Cross-browser QA, performance checks, and mobile testing before anything goes live.',
    color: '#10b981',
  },
  {
    num: '05',
    title: 'Deployment',
    description: 'Smooth launch, documentation handoff, and post-deployment support to make sure it sticks.',
    color: '#f59e0b',
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="process" ref={ref} className="section-padding bg-alt">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="t2 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            A structured approach that keeps you informed and confident at every step.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="process-track">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="process-step"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
            >
              {/* Number circle */}
              <div
                className="process-num"
                style={inView ? { borderColor: step.color, color: step.color, background: `${step.color}12` } : {}}
              >
                {step.num}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-semibold t1 mb-1.5">{step.title}</h3>
                <p className="text-sm t3 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
