import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import usePortfolioData from "./hooks/usePortfolioData.js";

function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      style={{
        left: pos.x - 14,
        top: pos.y - 14,
        width: 28,
        height: 28,
        border: "1.5px solid rgba(37,99,235,0.55)",
        transition: "left 0.07s linear, top 0.07s linear",
      }}
    />
  );
}

function BackgroundOrbs() {
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 2000], [0, -180]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, 120]);
  const orb3Y = useTransform(scrollY, [0, 2000], [0, -90]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden
    >
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[-8%] left-[8%] w-[520px] h-[520px] bg-[#2563eb]/[0.045] rounded-full blur-[130px]"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[38%] right-[4%] w-[420px] h-[420px] bg-[#0891b2]/[0.04] rounded-full blur-[110px]"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="absolute bottom-[8%] left-[28%] w-[370px] h-[370px] bg-[#14b8a6]/[0.035] rounded-full blur-[110px]"
      />
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.99 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 1.01,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
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
      {/* Header lives outside AnimatePresence so CSS filter on the page
          transition wrapper never traps it as a fixed-positioning containing block */}
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
