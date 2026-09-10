import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: '#F5F3F0',
        surface: '#FFFFFF',
        income: '#1A6B45',
        expense: '#B54708',
        text: {
          primary: '#1C1917',
          secondary: '#78716C',
        },
        border: '#E8E3DC',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
