import { useState, useEffect, useRef } from 'react';
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

export default function Header({ data }) {
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState('home');
  const [menuOpen, setMenuOpen]     = useState(false);
  const [cardOpen, setCardOpen]     = useState(false);
  const { isDark, toggle }          = useTheme();
  const cardRef                     = useRef(null);

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

        {/* Logo + profile dropdown */}
        <div
          ref={cardRef}
          className="relative"
          onMouseEnter={() => setCardOpen(true)}
          onMouseLeave={() => setCardOpen(false)}
        >
          <motion.button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/photo.png"
              alt={data?.name ?? 'Sarthak Agrawal'}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              style={{ border: '1.5px solid rgba(99,102,241,0.5)' }}
            />
            <span className="text-sm font-bold t1 hidden md:block">{data?.name ?? 'Sarthak Agrawal'}</span>
          </motion.button>

          {/* Profile card dropdown */}
          <AnimatePresence>
            {cardOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute left-0 top-full mt-3 w-72 rounded-2xl p-5 z-50"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                }}
              >
                {/* Arrow */}
                <div
                  className="absolute -top-[6px] left-5 w-3 h-3 rotate-45"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: 'none', borderRight: 'none' }}
                />

                {/* Photo + name */}
                <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <img
                    src="/photo.png"
                    alt={data?.name ?? 'Sarthak Agrawal'}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    style={{ border: '2px solid rgba(99,102,241,0.4)', boxShadow: '0 0 0 4px rgba(99,102,241,0.1)' }}
                  />
                  <div>
                    <p className="font-bold t1 text-sm leading-tight">{data?.name ?? 'Sarthak Agrawal'}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>
                      {data?.title ?? 'Software Engineer'}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5">
                  {[
                    {
                      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                      label: data?.email,
                      href: `mailto:${data?.email}`,
                    },
                    {
                      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                      label: data?.phone,
                      href: `tel:${data?.phone}`,
                    },
                    {
                      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                      label: 'LinkedIn',
                      href: data?.social?.linkedin,
                    },
                    {
                      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                      label: data?.location,
                      href: null,
                    },
                  ].map(({ icon, label, href }) => label && (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className="flex-shrink-0" style={{ color: '#6366f1' }}>{icon}</span>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-xs t2 hover:text-accent-indigo transition-colors truncate">{label}</a>
                        : <span className="text-xs t2 truncate">{label}</span>
                      }
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
