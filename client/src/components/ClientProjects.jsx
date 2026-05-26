import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, cardReveal, stagger, VP } from "../utils/motion.js";

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function ClientCard({ project }) {
  const { gradientFrom, gradientTo, accentColor, url } = project;
  const domain = url.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <motion.div
      className="proj-card group"
      variants={cardReveal}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Gradient thumbnail */}
      <div
        className="proj-thumb relative"
        style={{
          background: `linear-gradient(140deg, ${gradientFrom}, ${gradientTo})`,
          height: "10rem",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 60% at 30% 40%, ${accentColor}35 0%, transparent 70%),
                              radial-gradient(ellipse 40% 50% at 75% 70%, ${accentColor}18 0%, transparent 60%)`,
          }}
        />

        {/* Browser chrome mockup */}
        <div
          className="absolute inset-4 rounded-xl overflow-hidden"
          style={{
            background: "rgba(0,0,0,0.45)",
            border: `1px solid ${accentColor}30`,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-2"
            style={{ borderBottom: `1px solid ${accentColor}20` }}
          >
            {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
              <span
                key={c}
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: c, opacity: 0.7 }}
              />
            ))}
            <span
              className="ml-2 flex-1 text-center rounded px-2 py-0.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                fontSize: "0.58rem",
                fontFamily: "JetBrains Mono, monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {domain}
            </span>
          </div>
          <div className="flex items-center justify-center h-[calc(100%-2rem)]">
            <span style={{ color: `${accentColor}60`, fontSize: "1.4rem" }}>
              ⬡
            </span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {project.role}
          </span>
          <span
            className="text-xs font-mono"
            style={{
              color: "var(--c4)",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {domain}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold t1 leading-snug mb-1">
            {project.title}
          </h3>
          <p className="text-xs font-semibold" style={{ color: accentColor }}>
            {project.tagline}
          </p>
        </div>

        <p className="text-sm t2 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: `${accentColor}10`,
                color: accentColor,
                border: `1px solid ${accentColor}25`,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            Visit Live Site
            <ExternalIcon />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientProjects({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);

  if (!data?.length) return null;

  return (
    <section
      id="client-work"
      ref={ref}
      className="section-padding bg-alt relative overflow-hidden"
    >
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-5%] right-[8%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] left-[5%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            Real-World Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Client <span className="gradient-text">Projects</span>
          </h2>
          <p className="t2 mt-4 max-w-xl text-base leading-relaxed">
            Live websites built for real clients — currently active on the web.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger(0.13, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {data.map((project) => (
            <ClientCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
