/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f4f9f6',
          100: '#e5f2eb',
          200: '#cbe4d6',
          300: '#a3d0b8',
          400: '#73b593',
          500: '#4e9772',
          600: '#3a7a5a',
          700: '#2f6149',
          800: '#284e3c',
          850: '#1e3c2e',
          900: '#142a20',
          950: '#0a1711',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        agri: {
          mint: '#10b981',
          lime: '#65a30d',
          brightLime: '#84cc16',
          amber: '#d97706',
          orange: '#ea580c',
          teal: '#0d9488',
          cyan: '#0891b2',
          danger: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
    },
  },
  plugins: [],
}
