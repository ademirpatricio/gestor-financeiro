import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: '#F5F0EB',
        surface: '#FBF8F5',
        income: '#8A9B6A',
        expense: '#C4604A',
        text: {
          primary: '#2D1F17',
          secondary: '#8A7A70',
        },
        border: '#E2D9D0',
        brand: {
          terracotta: '#C4604A',
          salmon: '#E8A898',
          salmon_light: '#fff6f4',
          brown: '#3D2B1F',
          rust: '#C85A2A',
          olive: '#5A6B3A',
          'olive-light': '#8A9B6A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
