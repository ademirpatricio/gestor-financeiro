import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      
      colors: {
        white:        '#FBF8F5',
        terracotta:   '#a34630',
        rust:         '#C85A2A',
        rust_light:   '#e6865d',
        salmon:       '#E8A898',
        salmon_light: '#f9e4e0',
        brown:        '#3D2B1F',
        brown_dark:   '#2D1F17',
        brown_light:  '#8A7A70',
        olive:        '#5A6B3A',
        olive_light:  '#8A9B6A',
        blue:         '#5B7A96',
        blue_light:   '#8AAEC4',
      },

      fontFamily: {
        display: ['Maven Pro', 'system-ui', 'sans-serif'],
        sans: ['Maven Pro', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'h1':    ['clamp(2.8rem, 5vw, 4rem)',   { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'h2':    ['clamp(2rem, 4vw, 2.8rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h3':    ['clamp(1.4rem, 2.7vw, 2rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h4':    ['1.5rem',                     { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h5':    ['20px',                       { lineHeight: '1.25', letterSpacing: '-0.01em' }],

        'body':  ['16px',     { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['13px',     { lineHeight: '1.2' }],
        'micro': ['10px',     { lineHeight: '1.0'}],
      },

      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },

    },
  },
  plugins: [],
} satisfies Config
