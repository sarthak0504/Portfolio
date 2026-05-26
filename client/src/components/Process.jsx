import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, cardReveal, stagger, VP } from "../utils/motion.js";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Deep-dive into your goals, audience, and requirements to align on what success looks like.",
    color: "#2563eb",
  },
  {
    num: "02",
    title: "Planning",
    description:
      "Define scope, architecture, and milestones. You get a clear roadmap before a line is written.",
    color: "#0891b2",
  },
  {
    num: "03",
    title: "Development",
    description:
      "Clean, iterative builds with daily updates. You see progress at every stage of the process.",
    color: "#14b8a6",
  },
  {
    num: "04",
    title: "Testing",
    description:
      "Cross-browser QA, performance checks, and mobile testing before anything goes live.",
    color: "#10b981",
  },
  {
    num: "05",
    title: "Deployment",
    description:
      "Smooth launch, documentation handoff, and post-deployment support to make sure it sticks.",
    color: "#f59e0b",
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="section-padding bg-alt relative overflow-hidden"
    >
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-5%] right-[10%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] left-[8%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="t2 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            A structured approach that keeps you informed and confident at every
            step.
          </p>
        </motion.div>

        <motion.div
          className="process-track"
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              className="process-step"
              variants={cardReveal}
            >
              <div
                className="process-num"
                style={{
                  borderColor: step.color,
                  color: step.color,
                  background: `${step.color}12`,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-semibold t1 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm t3 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
