/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark':    '#050508',
        'dark-2':  '#0d0d1a',
        'dark-3':  '#111128',
        'accent-indigo': '#6366f1',
        'accent-violet': '#8b5cf6',
        'accent-cyan':   '#06b6d4',
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
