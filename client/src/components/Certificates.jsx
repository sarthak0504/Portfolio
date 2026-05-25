import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { fadeUp, cardReveal, stagger, VP } from "../utils/motion.js";
import TiltCard from "./TiltCard.jsx";

function PdfModal({ cert, onClose }) {
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl overflow-hidden z-10"
        style={{ background: "var(--gl)", border: "1px solid var(--glb)" }}
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--glb)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">{cert.icon}</span>
            <div className="min-w-0">
              <h3 className="t1 font-bold text-sm leading-tight truncate">
                {cert.title}
              </h3>
              <p className="t3 text-xs">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <a
              href={cert.file}
              download
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-indigo/10 text-accent-indigo hover:bg-accent-indigo hover:text-white transition-all duration-200 hidden md:inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              ↓ Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full t3 hover:t1 hover:bg-[rgba(99,102,241,0.1)] transition-all duration-200 text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#525659] relative flex items-center justify-center">
          {/\.(jpe?g|png|gif|webp)$/i.test(cert.file) ? (
            <img
              src={cert.file}
              alt={cert.title}
              className="max-w-full max-h-full object-contain p-4"
            />
          ) : pdfError ? (
            <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-12">
              <span className="text-5xl">📄</span>
              <p className="text-white/70 text-sm">
                Your browser couldn't display the PDF inline.
              </p>
              <a
                href={cert.file}
                download
                className="px-5 py-2.5 bg-accent-indigo hover:bg-indigo-500 rounded-full text-white text-sm font-medium transition-colors"
              >
                Download PDF instead
              </a>
            </div>
          ) : (
            <iframe
              src={cert.file}
              title={cert.title}
              className="w-full h-full border-0"
              onError={() => setPdfError(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertCard({ cert, onView }) {
  return (
    <motion.div variants={cardReveal}>
      <TiltCard
        className="glass rounded-2xl p-6 gradient-border h-full flex flex-col"
        maxTilt={9}
        glare={true}
      >
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60"
          style={{
            background: `linear-gradient(90deg, ${cert.color}, transparent)`,
          }}
        />

        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `${cert.color}18`,
              border: `1px solid ${cert.color}30`,
            }}
          >
            {cert.icon}
          </div>
          <div className="flex flex-col items-end gap-1">
            {cert.topper && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-500 border border-amber-400/30 tracking-wide">
                🏅 TOPPER · Top 5%
              </span>
            )}
            <span
              className="text-xs font-mono t3 px-2 py-0.5 rounded"
              style={{ background: `${cert.color}12` }}
            >
              {cert.date}
            </span>
          </div>
        </div>

        <h3 className="t1 font-bold text-base leading-snug mb-1">
          {cert.title}
        </h3>
        <p className="text-sm font-medium mb-1" style={{ color: cert.color }}>
          {cert.issuer}
        </p>
        {cert.score && (
          <p className="text-xs font-mono mb-3 t3">
            Score:{" "}
            <span className="font-bold" style={{ color: cert.color }}>
              {cert.score}
            </span>
          </p>
        )}
        {!cert.score && <div className="mb-3" />}
        <p className="t2 text-sm leading-relaxed flex-1 mb-4">
          {cert.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {cert.skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{
                background: `${cert.color}10`,
                color: cert.color,
                borderColor: `${cert.color}30`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={onView}
          className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`,
          }}
        >
          View Certificate →
        </button>
      </TiltCard>
    </motion.div>
  );
}

const INITIAL_COUNT = 3;

export default function Certificates({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  const [activeCert, setActiveCert] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const handleClose = useCallback(() => setActiveCert(null), []);

  if (!data?.length) return null;

  const hidden = data.length - INITIAL_COUNT;

  return (
    <>
      <section
        id="certificates"
        ref={ref}
        className="section-padding bg-alt relative overflow-hidden"
      >
        <motion.div
          style={{ y: blobY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute top-[-5%] left-[12%] w-96 h-96 rounded-full blur-[130px]"
            style={{ background: "rgba(37,99,235,0.05)" }}
          />
          <div
            className="absolute bottom-[-5%] right-[8%] w-80 h-80 rounded-full blur-[120px]"
            style={{ background: "rgba(20,184,166,0.05)" }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            style={{ y: headerY }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 t1">
              My <span className="gradient-text">Certificates</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-indigo to-accent-cyan mx-auto rounded-full" />
            <p className="t3 mt-5 max-w-xl mx-auto text-sm">
              Verified credentials and course completions from leading
              platforms.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ y: gridY }}
            variants={stagger(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {data.slice(0, INITIAL_COUNT).map((cert) => (
              <CertCard
                key={cert.id}
                cert={cert}
                onView={() => setActiveCert(cert)}
              />
            ))}

            <AnimatePresence>
              {showAll &&
                data.slice(INITIAL_COUNT).map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.96 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <CertCard cert={cert} onView={() => setActiveCert(cert)} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          {hidden > 0 && (
            <motion.div
              className="flex justify-center mt-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <motion.button
                onClick={() => setShowAll((p) => !p)}
                className="group flex items-center gap-2.5 px-7 py-3 rounded-full glass gradient-border t1 font-semibold text-sm hover:text-accent-indigo transition-colors duration-200"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>
                  {showAll
                    ? "Show Less"
                    : `View All Certificates (${data.length})`}
                </span>
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-accent-indigo text-base leading-none"
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeCert && <PdfModal cert={activeCert} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
