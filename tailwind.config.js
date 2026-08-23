/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F7',
        surface: '#FFFFFF',
        primary: '#1D1D1F',
        muted: '#6E6E73',
        border: '#D2D2D7',
        accent: '#0066CC',
        line: '#E5E5E7',
        surface2: '#FAFAFB',
        positive: '#1D8348',
        caution: '#B7791F'
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
