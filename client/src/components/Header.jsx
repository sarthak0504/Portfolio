import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.jsx';

const NAV = [
  { label: 'Home',       id: 'home',              path: '/'           },
  { label: 'Work',       id: 'client-work',       path: '/work'       },
  { label: 'Services',   id: 'services',          path: '/services'   },
  { label: 'About',      id: 'about',             path: '/about'      },
  { label: 'Experience', id: 'experience',        path: '/experience' },
  { label: 'Projects',   id: 'academic-projects', path: '/projects'   },
  { label: 'Contact',    id: 'contact',           path: '/contact'    },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const pushPath = (path) => window.history.pushState(null, '', path);

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"     x2="12" y2="3"/>
    <line x1="12" y1="21"    x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle }      = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const found = [...NAV].reverse().find(({ id }) => {
        const el = document.getElementById(id);
        return el && window.scrollY >= el.offsetTop - 220;
      });
      if (found) setActive(found.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg shadow-black/10' : 'py-5'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('home')}
          className="text-xl font-black font-mono gradient-text hover:opacity-75 transition-opacity"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {'<SA />'}
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map(({ label, id, path }) => {
            const isActive = active === id;
            return (
              <motion.button
                key={id}
                onClick={() => { pushPath(path); scrollTo(id); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-indigo text-white shadow-md shadow-indigo-500/30'
                    : 't3 hover:t1 hover:bg-[rgba(99,102,241,0.08)]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {label}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            className="p-2 rounded-full glass t3 hover:text-accent-indigo transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{    rotate:  45, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.28 }}
                className="block"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 t3 hover:t1"
            onClick={() => setMenuOpen(p => !p)}
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <div className={`w-5 h-0.5 bg-current my-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass border-t border-[rgba(99,102,241,0.1)] overflow-hidden"
          >
            {NAV.map(({ label, id, path }) => (
              <button
                key={id}
                onClick={() => { pushPath(path); setMenuOpen(false); setTimeout(() => scrollTo(id), 300); }}
                className={`w-full text-left px-6 py-3 text-sm transition-colors hover:bg-[rgba(99,102,241,0.06)] ${
                  active === id ? 'text-accent-indigo font-semibold' : 't2'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
