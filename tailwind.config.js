/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          950: '#1f0d07',
          900: '#32150c',
          800: '#4c1f12',
          700: '#6a2c18',
          600: '#87391f'
        },
        wrapper: {
          red: '#c91414',
          deep: '#8f0e10'
        },
        wafer: '#d7a660',
        cream: '#fff1d3',
        gold: '#f7d249',
        ink: '#20120c'
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Arial Rounded MT Bold"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        wrapper: '0 30px 80px rgba(95, 23, 11, 0.35)',
        glow: '0 20px 70px rgba(247, 210, 73, 0.32)'
      }
    }
  },
  plugins: []
}
