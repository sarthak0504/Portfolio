import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "./TiltCard.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";
import {
  fadeUp,
  slideLeft,
  slideRight,
  scaleUp,
  stagger,
  VP,
} from "../utils/motion.js";

const STATS = [
  { value: "700+", label: "Problems Solved", sub: "LeetCode · CodeChef · CF" },
  { value: "7.91", label: "GPA", sub: "Computer Engineering" },
  { value: "2", label: "Internships", sub: "Industry Experience" },
  { value: "3+", label: "Products Built", sub: "Full-stack & ML" },
];

const STATUS = [
  { dot: "#22c55e", text: "Open to freelance projects" },
  { dot: "#14b8a6", text: "SWE Intern @ Neural Nurture" },
  { dot: "#0891b2", text: "CS Final Year · SGSITS Indore" },
  { dot: "#2563eb", text: "Building full-stack & ML products" },
];

export default function About({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-alt relative overflow-hidden"
    >
      {/* Parallax background blobs */}
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-1/4 left-[-5%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(37,99,235,0.06)" }}
        />
        <div
          className="absolute bottom-1/4 right-[-5%] w-64 h-64 rounded-full blur-[100px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Bio card */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Photo + Name + title */}
              <div
                className="mb-6 pb-6"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="mb-4">
                  <img
                    src="/photo.png"
                    alt={data?.name ?? "Sarthak Agrawal"}
                    className="w-24 h-24 rounded-full object-cover"
                    style={{
                      border: "2px solid var(--border)",
                      boxShadow: "0 0 0 4px rgba(37,99,235,0.15)",
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold t1 mb-1">
                  {data?.name ?? "Sarthak Agrawal"}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "#2563eb",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {data?.subtitle}
                </p>
              </div>

              {/* Bio */}
              <p className="t2 leading-relaxed text-sm mb-7">{data?.bio}</p>

              {/* Contact info */}
              <div className="space-y-2.5">
                {[
                  {
                    icon: (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    value: data?.location,
                    href: null,
                  },
                  {
                    icon: (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    value: data?.email,
                    href: `mailto:${data?.email}`,
                  },
                ].map(({ icon, value, href }) => (
                  <div
                    key={value}
                    className="flex items-center gap-2.5 text-sm t3"
                  >
                    <span
                      className="flex-shrink-0"
                      style={{ color: "#2563eb" }}
                    >
                      {icon}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-accent-indigo transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social links */}
              {data?.social && (
                <div
                  className="flex gap-2 flex-wrap mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {Object.entries(data.social).map(([key, href]) => (
                    <motion.a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium t2 capitalize transition-colors"
                      style={{
                        background: "var(--bg2)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {key}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Stats + status */}
          <motion.div
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {STATS.map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  variants={scaleUp}
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="text-2xl font-black gradient-text leading-none mb-1">
                    <AnimatedCounter to={value} />
                  </div>
                  <div className="text-sm font-semibold t1 mb-0.5">{label}</div>
                  <div className="text-xs t3">{sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Status card */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-xs font-semibold tracking-widest mb-4 uppercase"
                style={{
                  color: "#14b8a6",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                Current Status
              </p>
              <div className="space-y-3">
                {STATUS.map(({ dot, text }, i) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: dot,
                        boxShadow: `0 0 6px ${dot}80`,
                        animation: "glow-pulse 2s infinite",
                      }}
                    />
                    <span className="text-sm t2">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
