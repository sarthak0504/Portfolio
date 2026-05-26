import { motion } from "framer-motion";
import { fadeUp, scaleUp, stagger, VP } from "../utils/motion.js";

const SERVICES = [
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect React UIs with smooth animations, responsive layouts, and fast load times.",
    color: "#2563eb",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Full Stack Web Apps",
    description:
      "End-to-end web applications with React frontends, Node.js backends, and MongoDB databases.",
    color: "#0891b2",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Landing Pages",
    description:
      "High-converting, visually polished landing pages that tell your story and drive action.",
    color: "#14b8a6",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Admin Dashboards",
    description:
      "Feature-rich admin panels with data visualization, role-based access, and real-time updates.",
    color: "#10b981",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "API Integration",
    description:
      "Connect your product to any third-party service — payment gateways, CRMs, data APIs, and more.",
    color: "#f59e0b",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Website Optimization",
    description:
      "Audit and improve Core Web Vitals, bundle size, SEO, and Lighthouse scores for existing sites.",
    color: "#ef4444",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-[-5%] left-[10%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[8%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(8,145,178,0.05)" }}
        />
      </div>

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
            What I Build
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="t2 mt-4 max-w-xl text-base leading-relaxed">
            From polished UIs to scalable full-stack systems — everything you
            need to launch and grow your product online.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              className="svc-card"
              style={{ "--svc-color": svc.color }}
              variants={scaleUp}
            >
              <div
                className="svc-icon-wrap"
                style={{ background: `${svc.color}18`, color: svc.color }}
              >
                {svc.icon}
              </div>
              <h3 className="text-base font-semibold t1 mb-2">{svc.title}</h3>
              <p className="text-sm t3 leading-relaxed">{svc.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
