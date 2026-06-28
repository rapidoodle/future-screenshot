import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0EA5E9',
          secondary: '#38BDF8',
          cta: '#F97316',
          bg: '#F0F9FF',
          text: '#0C4A6E',
          dark: '#0C4A6E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 50%, #8B5CF6 100%)',
        'gradient-card': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cta': 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(14, 165, 233, 0.12)',
        'card-hover': '0 8px 40px rgba(14, 165, 233, 0.22)',
        'cta': '0 8px 32px rgba(249, 115, 22, 0.35)',
      },
    },
  },
  plugins: [],
}
export default config
