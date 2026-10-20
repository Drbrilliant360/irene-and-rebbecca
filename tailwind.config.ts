import type { Config } from 'tailwindcss'

// Colours point at the CSS variables in src/styles/globals.css so the palette
// lives in one place.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          900: 'rgb(var(--blue-900-rgb) / <alpha-value>)',
          700: 'rgb(var(--blue-700-rgb) / <alpha-value>)',
          500: 'rgb(var(--blue-500-rgb) / <alpha-value>)',
          50: 'rgb(var(--blue-50-rgb) / <alpha-value>)',
        },
        accent: {
          yellow: 'rgb(var(--yellow-rgb) / <alpha-value>)',
          red: 'rgb(var(--red-rgb) / <alpha-value>)',
          green: 'rgb(var(--green-rgb) / <alpha-value>)',
          'green-dark': 'rgb(var(--green-700-rgb) / <alpha-value>)',
        },
        ink: 'rgb(var(--gray-600-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['"Nunito Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem)', { lineHeight: '1.08' }],
        h2: ['clamp(1.75rem, 1.3rem + 2vw, 2.75rem)', { lineHeight: '1.15' }],
        h3: ['clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)', { lineHeight: '1.25' }],
        mission: ['clamp(1.5rem, 1.1rem + 1.8vw, 2.5rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        card: '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 16px -4px rgb(15 45 92 / 0.12)',
        lift: '0 20px 40px -12px rgb(15 45 92 / 0.28)',
        header: '0 6px 24px -10px rgb(15 45 92 / 0.25)',
        chunky: '6px 6px 0 0 var(--blue-900)',
        'chunky-lg': '10px 10px 0 0 var(--blue-900)',
      },
      maxWidth: {
        measure: '70ch',
      },
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'bounce-once': 'bounce-once 0.6s ease-out 1',
      },
    },
  },
  plugins: [],
} satisfies Config
