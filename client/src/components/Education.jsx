import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard.jsx';

export default function Education({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" ref={ref} className="section-padding bg-alt">
      <div className="max-w-4xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          {data?.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: isLeft ? -70 : 70, scale: 0.93 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.65, delay: i * 0.2, ease: [0.22,1,0.36,1] }}
                className={`relative flex mb-12 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Timeline dot with pulse ring */}
                <div className="absolute left-[18px] md:left-1/2 z-10 top-5 transform -translate-x-2 md:-translate-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-accent-indigo border-4 border-[var(--bg2)] glow-indigo relative">
                    <div className="absolute inset-0 rounded-full bg-accent-indigo/40 animate-ping" />
                  </div>
                </div>

                <div className={`ml-16 md:ml-0 w-full md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                  <TiltCard className="glass rounded-2xl p-6 gradient-border">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl flex-shrink-0">{edu.icon}</span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-mono bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded">
                            {edu.year}
                          </span>
                          <span className="text-xs font-bold text-accent-violet">{edu.grade}</span>
                        </div>
                        <h3 className="t1 font-bold text-base leading-tight">{edu.degree}</h3>
                        <p className="text-accent-indigo text-sm font-medium mt-0.5">{edu.field}</p>
                        <p className="t2 text-sm mt-1">{edu.institution}</p>
                        <p className="t3 text-xs mt-0.5">{edu.university}</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
