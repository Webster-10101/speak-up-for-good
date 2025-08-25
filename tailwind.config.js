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
        primary: '#0C6173',
        accent: '#2A8CA3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)',
        'gradient-hero': 'linear-gradient(135deg, #fefefe 0%, #f0f9ff 100%)',
        'gradient-section': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      },
      letterSpacing: {
        'extra-wide': '0.1em',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} 