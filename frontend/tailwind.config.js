/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: 'rgba(15, 23, 42, 0.75)',
        'surface-border': 'rgba(255, 255, 255, 0.08)',
        accent: '#00d2ff',
        'accent-glow': 'rgba(0, 210, 255, 0.15)',
        brand: '#3b82f6',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        courgette: ['Courgette', 'cursive', 'sans-serif'],
        accent: ['Courgette', 'cursive', 'sans-serif'],
      },



      boxShadow: {
        'glass-glow': '0 0 25px -5px rgba(0, 210, 255, 0.15)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
