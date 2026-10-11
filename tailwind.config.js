/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orbit: {
          bg: 'var(--orbit-bg)',
          surface: 'var(--orbit-surface)',
          text: 'var(--orbit-text)',
          muted: 'var(--orbit-muted)',
          line: 'var(--orbit-line)',
          violet: '#7C3AED',
          blue: '#3B82F6',
          aqua: '#5FE0FF',
          coral: '#FF8F6B',
          lime: '#BAF57D',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '1.75rem',
        panel: '2rem',
      },
      transitionDuration: {
        orbit: '300ms',
      },
    },
  },
  plugins: [],
};
