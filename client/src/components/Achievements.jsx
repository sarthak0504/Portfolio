import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, scaleUp, stagger, VP } from "../utils/motion.js";
import TiltCard from "./TiltCard.jsx";

export default function Achievements({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);

  return (
    <section
      id="achievements"
      ref={ref}
      className="section-padding bg-alt relative overflow-hidden"
    >
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-5%] left-[15%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[10%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={stagger(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {data?.map((ach) => (
            <motion.div key={ach.id} variants={scaleUp}>
              <TiltCard
                className="glass rounded-2xl p-7 gradient-border text-center relative overflow-hidden h-full"
                maxTilt={10}
              >
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${ach.color}14, transparent 70%)`,
                  }}
                />

                <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">
                  {ach.icon}
                </div>
                <div className="text-xs font-mono t3 mb-2">{ach.year}</div>
                <h3 className="t1 font-bold text-base mb-3 leading-tight">
                  {ach.title}
                </h3>
                <p className="t2 text-sm leading-relaxed">{ach.description}</p>
                <div className="mt-5 flex justify-center">
                  <div
                    className="w-8 h-0.5 rounded-full"
                    style={{ backgroundColor: ach.color }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
