/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        'primary-dark': '#0F172A',
        accent: '#10B981',
        'light-bg': '#F4F6FF',
        'neutral-dark': '#0F172A',
        'neutral-light': '#E2E8F0',
        'dark-bg': '#0A0E27',
        'dark-card': '#1E293B',
        'neon-blue': '#00D9FF',
        'neon-purple': '#D946EF',
        'neon-green': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(99, 102, 241, 0.08)',
        'soft-lg': '0 8px 32px rgba(99, 102, 241, 0.12)',
        'glow-blue': '0 0 20px rgba(0, 217, 255, 0.4)',
        'glow-purple': '0 0 30px rgba(217, 70, 239, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
        'neon': '0 0 40px rgba(99, 102, 241, 0.5)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
