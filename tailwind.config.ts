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
        'h1':    ['clamp(45px, 5vw, 64px)',   { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'h2':    ['clamp(32px, 4vw, 45px)',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h3':    ['clamp(22px, 2.7vw, 32px)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h4':    ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],

        'body':  ['17px', { lineHeight: '1.75' }],
        'span':  ['clamp(10px, 3vw, 14px)', { letterSpacing: '0.2em', fontWeight: '500' }], // uppercase vem do index.css
        'small': ['13px', { lineHeight: '1.6' }],
        'label': ['11px', { lineHeight: '1.4',  letterSpacing: '0.15em' }],
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
