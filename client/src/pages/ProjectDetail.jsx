import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById } from '../utils/api.js';
import TiltCard from '../components/TiltCard.jsx';

function Badge({ children, variant = 'default' }) {
  const cls = {
    green:   'bg-green-500/15 text-green-600',
    blue:    'bg-accent-cyan/10 text-accent-cyan',
    cyan:    'bg-accent-cyan/10 text-accent-cyan',
    default: 'bg-accent-indigo/10 text-accent-indigo',
  }[variant];
  return <span className={`text-xs px-3 py-1 rounded-full ${cls}`}>{children}</span>;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [project,  setProject]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getProjectById(id)
      .then(res => setProject(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-6xl mb-6">🔍</p>
          <h2 className="text-2xl font-bold t1 mb-3">Project not found</h2>
          <p className="t3 mb-8 text-sm">The project you're looking for doesn't exist or was removed.</p>
          <Link to="/"
            className="px-6 py-3 bg-accent-indigo hover:bg-indigo-500 rounded-full text-white text-sm font-medium transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-accent-indigo/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link to="/"
            className="inline-flex items-center gap-2 t3 hover:text-accent-indigo transition-colors text-sm group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <TiltCard className="glass rounded-3xl p-8 md:p-10 gradient-border" maxTilt={4} glare={true}>
            <div className="flex flex-wrap items-start gap-6">
              <div className="text-7xl md:text-8xl animate-float">{project.thumbnail}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={project.status === 'Ongoing' ? 'green' : 'blue'}>{project.status}</Badge>
                  <Badge variant="cyan">{project.period}</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black t1 mb-2 leading-tight">
                  {project.title}
                </h1>
                <p className="text-accent-cyan font-mono text-sm mb-1">{project.category}</p>
                {project.guide && (
                  <p className="t3 text-xs">Guide: {project.guide}</p>
                )}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Main column */}
          <div className="md:col-span-2 space-y-5">

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TiltCard className="glass rounded-2xl p-6 gradient-border" maxTilt={4} glare={false}>
                <h2 className="t1 font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-accent-indigo">▸</span> Overview
                </h2>
                <p className="t2 leading-relaxed text-sm">{project.fullDescription}</p>
              </TiltCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <TiltCard className="glass rounded-2xl p-6 gradient-border" maxTilt={4} glare={false}>
                <h2 className="t1 font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-accent-cyan">▸</span> Key Features
                </h2>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 t2 text-sm leading-relaxed">
                      <span className="text-accent-indigo flex-shrink-0 mt-0.5">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.section>

            {(project.challenges || project.outcome) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {project.challenges && (
                  <TiltCard className="glass rounded-2xl p-5 gradient-border" maxTilt={6} glare={false}>
                    <h3 className="text-yellow-600 font-semibold text-sm mb-3">⚡ Challenges</h3>
                    <p className="t2 text-sm leading-relaxed">{project.challenges}</p>
                  </TiltCard>
                )}
                {project.outcome && (
                  <TiltCard className="glass rounded-2xl p-5 gradient-border" maxTilt={6} glare={false}>
                    <h3 className="text-green-600 font-semibold text-sm mb-3">✅ Outcome</h3>
                    <p className="t2 text-sm leading-relaxed">{project.outcome}</p>
                  </TiltCard>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TiltCard className="glass rounded-2xl p-5 gradient-border" maxTilt={6}>
                <h3 className="t1 font-semibold text-sm mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => (
                    <span key={t}
                      className="text-xs px-3 py-1.5 rounded-lg bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {project.methodology && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <TiltCard className="glass rounded-2xl p-5 gradient-border" maxTilt={6}>
                  <h3 className="t1 font-semibold text-sm mb-2">Methodology</h3>
                  <p className="text-accent-cyan text-sm">{project.methodology}</p>
                </TiltCard>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Link to="/"
                className="block w-full text-center py-3 rounded-xl border border-accent-indigo/30 text-accent-indigo hover:bg-accent-indigo hover:text-white transition-all duration-300 text-sm font-medium">
                ← All Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
