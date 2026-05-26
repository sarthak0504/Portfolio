import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import usePortfolioData from "./hooks/usePortfolioData.js";

// Ref-based cursor — no React re-render on mousemove, pure DOM transform.
// transform: translate() stays on the compositor layer (GPU-composited, zero layout).
function CursorGlow() {
  const dotRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      style={{
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        border: "1.5px solid rgba(37,99,235,0.55)",
        willChange: "transform",
        transition: "transform 0.08s linear",
      }}
    />
  );
}

// Static ambient glow — no scroll tracking, no JS animation.
// Large blurs on fixed elements + scroll-transform = constant GPU repaint. Removed.
function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden
    >
      <div className="absolute top-[-8%] left-[8%] w-[520px] h-[520px] bg-[#2563eb]/[0.045] rounded-full blur-[130px]" />
      <div className="absolute top-[38%] right-[4%] w-[420px] h-[420px] bg-[#0891b2]/[0.04] rounded-full blur-[110px]" />
      <div className="absolute bottom-[8%] left-[28%] w-[370px] h-[370px] bg-[#14b8a6]/[0.035] rounded-full blur-[110px]" />
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

function AppShell() {
  const location = useLocation();
  const { data } = usePortfolioData();

  return (
    <div className="min-h-screen font-inter transition-colors duration-350">
      <ScrollProgress />
      <CursorGlow />
      <BackgroundOrbs />
      <Header data={data?.personal} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/:section" element={<Home />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
