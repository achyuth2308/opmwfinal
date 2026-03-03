/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#09090B',
        surface: {
          1: '#0F0F12',
          2: '#111419',
          3: '#1A1F2E',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.055)',
          hover: 'rgba(255,255,255,0.11)',
        },
        text: {
          primary: '#F0F4F8',
          secondary: '#8A9BB0',
          muted: '#4A5568',
        },
        accent: {
          DEFAULT: '#6EE7FA',
          warm: '#FBB040',
          dim: 'rgba(110,231,250,0.1)',
          glow: 'rgba(110,231,250,0.06)',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(48px, 7.5vw, 96px)',
        'section': 'clamp(32px, 4vw, 52px)',
        'stat': 'clamp(36px, 5vw, 64px)',
        'label': '11px',
      },
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        700: '700',
        800: '800',
      },
      letterSpacing: {
        'label': '0.14em',
        'tagline': '0.2em',
        'display': '-0.04em',
        'heading': '-0.03em',
      },
      lineHeight: {
        body: '1.75',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.022'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'card-hover': '0 12px 48px rgba(110,231,250,0.12)',
        'glow-accent': '0 0 32px rgba(110,231,250,0.2)',
        'glow-warm': '0 0 60px rgba(255,200,80,0.9)',
      },
      animation: {
        'gradient-drift': 'gradient-drift 25s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
        'counter-in': 'counter-in 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'pendulum': 'pendulum 3s ease-in-out',
      },
      keyframes: {
        'gradient-drift': {
          '0%': { transform: 'translate(0%, 0%)' },
          '100%': { transform: 'translate(3%, 5%)' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(110,231,250,0.2))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(110,231,250,0.4))' },
        },
        'border-rotate': {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        'counter-in': {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pendulum': {
          '0%': { transform: 'rotate(-3deg)' },
          '33%': { transform: 'rotate(3deg)' },
          '66%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
