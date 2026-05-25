import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';

function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      style={{
        left: pos.x - 14, top: pos.y - 14,
        width: 28, height: 28,
        border: '1.5px solid rgba(37,99,235,0.55)',
        transition: 'left 0.07s linear, top 0.07s linear',
      }}
    />
  );
}

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div className="absolute top-[-8%]  left-[8%]  w-[520px] h-[520px] bg-[#2563eb]/[0.045] rounded-full blur-[130px] transition-opacity duration-500" />
      <div className="absolute top-[38%] right-[4%] w-[420px] h-[420px] bg-[#0891b2]/[0.04]  rounded-full blur-[110px] transition-opacity duration-500" />
      <div className="absolute bottom-[8%] left-[28%] w-[370px] h-[370px] bg-[#14b8a6]/[0.035] rounded-full blur-[110px] transition-opacity duration-500" />
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -14, transition: { duration: 0.25, ease: 'easeIn'  } },
};

function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-inter transition-colors duration-350">
      <ScrollProgress />
      <CursorGlow />
      <BackgroundOrbs />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/"             element={<Home />}          />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/:section"     element={<Home />}          />
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
