import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  EASE_EXPO,
  EASE_SOFT,
  lineReveal,
  stagger,
  fadeIn,
} from "../utils/motion.js";

const TRUST_STATS = [
  { value: "3+", label: "Products Built" },
  { value: "2", label: "Internships" },
  { value: "700+", label: "Problems Solved" },
];

const MARQUEE_ITEMS = [
  "React",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "REST APIs",
  "Full Stack Dev",
  "Landing Pages",
  "Admin Dashboards",
  "API Integrations",
  "Web Applications",
  "Performance",
];

const HEADLINE_LINES = ["I Build Modern", "Web Products", "That Deliver."];

export default function Hero({ data }) {
  const email = data?.email ?? "agrawalsarthak0504@gmail.com";
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentOp = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <div className="hero-mesh" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute select-none pointer-events-none hidden xl:block"
        style={{
          right: "-1.5rem",
          top: "50%",
          transform: "translateY(-52%)",
          fontSize: "clamp(11rem, 19vw, 21rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(37,99,235,0.055)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "-0.06em",
          userSelect: "none",
        }}
      >
        {"</>"}
      </div>

      {/* Parallax wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 flex-1 flex items-center w-full"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-28 w-full">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <span className="badge">
              <span className="badge-dot" style={{ background: "#22c55e" }} />
              Open to New Projects
            </span>
          </motion.div>

          {/* Headline — staggered line reveal */}
          <motion.div
            variants={stagger(0.13, 0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            {HEADLINE_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={lineReveal}
                  className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.06] tracking-tight ${
                    i === 1 ? "gradient-text" : "t1"
                  }`}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Sub-headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.58, ease: EASE_EXPO }}
            className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14"
          >
            <p className="text-lg t2 leading-relaxed max-w-[440px]">
              Full-stack developer crafting fast, clean, and polished digital
              experiences — from landing pages to complex web apps.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => {
                  window.history.pushState(null, "", "/work");
                  document
                    .getElementById("client-work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 14px 40px rgba(37,99,235,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #0891b2)",
                  boxShadow: "0 0 28px rgba(37,99,235,0.3)",
                }}
              >
                View My Work
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm t1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                Let's Talk
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v5A1.5 1.5 0 0112.5 11H9l-3 2v-2H3.5A1.5 1.5 0 012 9.5v-5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            variants={stagger(0.12, 0.72)}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-8 pt-8 flex-wrap"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {TRUST_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: EASE_SOFT },
                  },
                }}
                className="flex items-center gap-8"
              >
                <div>
                  <div className="text-2xl font-bold t1 leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs t3 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
                {i < TRUST_STATS.length - 1 && (
                  <div
                    className="w-px h-7 flex-shrink-0"
                    style={{ background: "var(--border)" }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{ borderTop: "1px solid var(--border)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE_SOFT }}
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
