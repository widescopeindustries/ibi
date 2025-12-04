import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          '"Playfair Display"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },
      colors: {
        // Elegant blush pink palette (primary)
        primary: {
          50: '#fdf7f8',
          100: '#faeef0',
          200: '#f5dce1',
          300: '#eec4cc',
          400: '#e4a3b0',
          500: '#d88494',
          600: '#c96b7c',
          700: '#a85465',
          800: '#8c4654',
          900: '#753d48',
        },
        // Sage green palette (secondary)
        secondary: {
          50: '#f6f7f4',
          100: '#e8ebe4',
          200: '#d3d9ca',
          300: '#b6c1a8',
          400: '#98a786',
          500: '#7b8d69',
          600: '#617152',
          700: '#4d5943',
          800: '#404a38',
          900: '#373f31',
        },
        // Warm cream/gold accent
        accent: {
          50: '#fdfbf7',
          100: '#faf6eb',
          200: '#f4ead3',
          300: '#ebdab5',
          400: '#e0c68e',
          500: '#d4b06a',
          600: '#c49a51',
          700: '#a37d43',
          800: '#85653c',
          900: '#6d5333',
        },
        // Warm neutrals for backgrounds
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf6ef',
          300: '#f5ede1',
          400: '#ede0ce',
          500: '#e2cfb8',
        },
      },
    },
  },
  plugins: [],
}
export default config
