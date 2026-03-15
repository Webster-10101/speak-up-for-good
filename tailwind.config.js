/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand — deep teal (existing, refined)
        primary: {
          DEFAULT: '#0C6173',
          light: '#0E7A8F',
          dark: '#094E5C',
          muted: 'rgba(12, 97, 115, 0.08)',
        },
        accent: {
          DEFAULT: '#2A8CA3',
          light: '#3BA0B8',
        },
        // Warm palette (from AW brand system)
        coral: {
          DEFAULT: '#E86A58',
          light: '#F08575',
          dark: '#D55A48',
          muted: 'rgba(232, 106, 88, 0.08)',
        },
        teal: {
          DEFAULT: '#4A9B9B',
          light: '#5FB5B5',
          muted: 'rgba(74, 155, 155, 0.1)',
        },
        charcoal: {
          DEFAULT: '#2D3436',
          light: '#4A5568',
          muted: '#718096',
        },
        cream: {
          DEFAULT: '#FFFBF7',
          warm: '#FFF5ED',
          dark: '#FFEFE3',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(165deg, #FFFBF7 0%, #FFF5ED 40%, #FFEFE3 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)',
        'gradient-hero': 'linear-gradient(135deg, #fefefe 0%, #f0f9ff 100%)',
        'gradient-section': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      },
      letterSpacing: {
        'extra-wide': '0.1em',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.03)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.06)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
