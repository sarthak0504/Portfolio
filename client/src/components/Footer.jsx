export default function Footer({ name }) {
  return (
    <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid var(--glb)' }}>
      <p className="t3 text-sm">
        Designed &amp; Built by{' '}
        <span className="gradient-text font-semibold">{name || 'Sarthak Agrawal'}</span>
      </p>
      <p className="t4 text-xs mt-1">
        © {new Date().getFullYear()} · React + Three.js + Node.js
      </p>
    </footer>
  );
}
