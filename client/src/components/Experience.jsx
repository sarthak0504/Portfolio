import { motion } from "framer-motion";
import { fadeUp, cardReveal, stagger, VP } from "../utils/motion.js";
import TiltCard from "./TiltCard.jsx";

export default function Experience({ data }) {
  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/3 right-[-8%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(8,145,178,0.06)" }}
        />
        <div
          className="absolute bottom-1/4 left-[-5%] w-72 h-72 rounded-full blur-[110px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={stagger(0.18, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {data?.map((exp, i) => (
            <motion.div key={exp.id} variants={cardReveal}>
              <TiltCard
                className="glass rounded-2xl p-7 gradient-border relative overflow-hidden"
                maxTilt={6}
                glare={true}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ backgroundColor: exp.color }}
                />

                <div
                  className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${exp.color}18, transparent 70%)`,
                  }}
                />

                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold t1">{exp.role}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-accent-cyan font-semibold text-sm">
                        {exp.company}
                      </span>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs t3 hover:text-accent-cyan transition-colors"
                        >
                          ↗ Visit
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono t3">{exp.period}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full ${
                        exp.type === "Ongoing"
                          ? "bg-green-500/15 text-green-600"
                          : "bg-accent-indigo/10 text-accent-indigo"
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {exp.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 t2 text-sm leading-relaxed"
                    >
                      <span className="text-accent-indigo mt-1 flex-shrink-0 text-xs">
                        ▸
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full glass border border-accent-indigo/20 t2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
