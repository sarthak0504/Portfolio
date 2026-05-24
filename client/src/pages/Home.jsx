import { useEffect }    from 'react';
import { useParams }    from 'react-router-dom';
import usePortfolioData from '../hooks/usePortfolioData.js';
import Header          from '../components/Header.jsx';

const SECTION_PATHS = {
  work:       'client-work',
  services:   'services',
  about:      'about',
  projects:   'academic-projects',
  experience: 'experience',
  contact:    'contact',
};
import Hero            from '../components/Hero.jsx';
import ClientProjects  from '../components/ClientProjects.jsx';
import Services        from '../components/Services.jsx';
import Process         from '../components/Process.jsx';
import About           from '../components/About.jsx';
import Skills          from '../components/Skills.jsx';
import Experience      from '../components/Experience.jsx';
import Projects        from '../components/Projects.jsx';
import Education       from '../components/Education.jsx';
import Certificates    from '../components/Certificates.jsx';
import Achievements    from '../components/Achievements.jsx';
import Contact         from '../components/Contact.jsx';
import Footer          from '../components/Footer.jsx';

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-[3px] border-accent-indigo border-t-transparent rounded-full animate-spin mx-auto mb-5" />
        <p className="t3 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Loading…</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { data, loading } = usePortfolioData();
  const { section }       = useParams();

  useEffect(() => {
    if (loading || !section) return;
    const id = SECTION_PATHS[section];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [loading, section]);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <main>
        <Hero            data={data?.personal}       />

        {/* Real client work — proof first */}
        <ClientProjects  data={data?.clientProjects} />

        {/* What I offer + how I work */}
        <Services />
        <Process />

        {/* About + technical profile */}
        <About           data={data?.personal}       />
        <Skills          data={data?.skills}         />
        <Experience      data={data?.experience}     />

        {/* Academic / credential sections */}
        <Projects        data={data?.projects}       />
        <Education       data={data?.education}      />
        <Certificates    data={data?.certificates}   />
        <Achievements    data={data?.achievements}   />

        <Contact         data={data?.personal}       />
      </main>
      <Footer name={data?.personal?.name} />
    </>
  );
}
