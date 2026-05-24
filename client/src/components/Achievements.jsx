import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard.jsx';

export default function Achievements({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" ref={ref} className="section-padding bg-alt">
      <div className="max-w-5xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {data?.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.82, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22,1,0.36,1] }}
            >
              <TiltCard className="glass rounded-2xl p-7 gradient-border text-center relative overflow-hidden h-full" maxTilt={10}>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${ach.color}14, transparent 70%)` }} />

                <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">{ach.icon}</div>
                <div className="text-xs font-mono t3 mb-2">{ach.year}</div>
                <h3 className="t1 font-bold text-base mb-3 leading-tight">{ach.title}</h3>
                <p className="t2 text-sm leading-relaxed">{ach.description}</p>
                <div className="mt-5 flex justify-center">
                  <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: ach.color }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
