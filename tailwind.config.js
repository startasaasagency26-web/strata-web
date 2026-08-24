/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)',
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface2) / <alpha-value>)',
        surface3: 'rgb(var(--surface3) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        borderStrong: 'rgb(var(--border-strong) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        text2: 'rgb(var(--text2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        goldHover: 'rgb(var(--gold-hover) / <alpha-value>)',
        goldActive: 'rgb(var(--gold-active) / <alpha-value>)',
        champagne: 'rgb(var(--champagne) / <alpha-value>)',
        bronze: 'rgb(var(--bronze) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        positive: 'rgb(var(--positive) / <alpha-value>)',
        positiveSoft: 'rgb(var(--positive-soft) / <alpha-value>)',
        caution: 'rgb(var(--caution) / <alpha-value>)',
        cautionSoft: 'rgb(var(--caution-soft) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        dangerSoft: 'rgb(var(--danger-soft) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        infoSoft: 'rgb(var(--info-soft) / <alpha-value>)',
        focus: 'rgb(var(--focus) / <alpha-value>)',
        focusOffset: 'rgb(var(--focus-offset) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Text',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Inter',
          'SF Pro Display',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Space Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
