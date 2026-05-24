import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard.jsx';

export default function Experience({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="section-padding">
      <div className="max-w-4xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {data?.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.2, ease: [0.22,1,0.36,1] }}
            >
              <TiltCard className="glass rounded-2xl p-7 gradient-border relative overflow-hidden" maxTilt={6} glare={true}>

                {/* Coloured left bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ backgroundColor: exp.color }} />

                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${exp.color}18, transparent 70%)` }} />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold t1">{exp.role}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-accent-cyan font-semibold text-sm">{exp.company}</span>
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer"
                          className="text-xs t3 hover:text-accent-cyan transition-colors">
                          ↗ Visit
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono t3">{exp.period}</p>
                    <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full ${
                      exp.type === 'Ongoing'
                        ? 'bg-green-500/15 text-green-600'
                        : 'bg-accent-indigo/10 text-accent-indigo'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-5">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-2.5 t2 text-sm leading-relaxed">
                      <span className="text-accent-indigo mt-1 flex-shrink-0 text-xs">▸</span>
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech}
                      className="text-xs px-3 py-1 rounded-full glass border border-accent-indigo/20 t2">
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
