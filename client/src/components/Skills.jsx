import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger, VP } from "../utils/motion.js";

const CATEGORIES = [
  {
    key: "programmingLanguages",
    label: "Programming Languages",
    num: "01",
    accent: "#f59e0b",
  },
  {
    key: "webDevelopment",
    label: "Web Development",
    num: "02",
    accent: "#2563eb",
  },
  { key: "databases", label: "Databases", num: "03", accent: "#14b8a6" },
  { key: "tools", label: "Tools & Platforms", num: "04", accent: "#10b981" },
  { key: "ml", label: "ML & Data Science", num: "05", accent: "#0891b2" },
];

const rowVariant = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const pillVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.34, 1.4, 0.64, 1] },
  },
};

export default function Skills({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-24%", "24%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"]);
  const runwayY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-8%] left-[15%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[10%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="sk-wrap relative z-10">
        <motion.div
          className="sk-section-head"
          style={{ y: headerY }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <div className="sk-section-label">TECHNICAL PROFICIENCY</div>
          <h2 className="sk-section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          className="sk-runway"
          style={{ y: runwayY }}
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {CATEGORIES.map((cat) =>
            data?.[cat.key] ? (
              <motion.div
                key={cat.key}
                className="sk-row"
                style={{ "--row-accent": cat.accent }}
                variants={rowVariant}
              >
                <span className="sk-ghost-num" aria-hidden="true">
                  {cat.num}
                </span>

                <div className="sk-meta">
                  <span className="sk-num">{cat.num}</span>
                  <span className="sk-label">{cat.label}</span>
                </div>

                <span className="sk-vline" />

                <motion.div className="sk-pills" variants={stagger(0.07, 0.05)}>
                  {data[cat.key].map((skill) => (
                    <motion.span
                      key={skill.name}
                      className="sk-pill"
                      variants={pillVariant}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ) : null,
          )}
        </motion.div>
      </div>
    </section>
  );
}
