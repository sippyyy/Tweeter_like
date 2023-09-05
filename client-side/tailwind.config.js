/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#1d9bf0',
      'black': {
        'full':'#000',
        '100':'rgba(0,0,0,0.5)',
      },
      'white': {
        'full': '#fff',
        '100':'#474747'
      },
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'transparent': 'transparent',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        'negative':"-15%"
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}

