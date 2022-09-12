/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        primary: "#4A3419",
        body: "#F3EDE2"
      },
      fontFamily: {
        'libreBaskerville': ['"Libre Baskerville"', 'sans-serif'],
        'avenir': ['"Avenir"', 'sans-serif']
      },
    },
    screens: {
      'sm': '480px',
      'sm2': '580px',
      'sm3': '680px',
      'md': '744px',
      'md2': '980px',
      'lg': '1024px',
      'lg2': '1120px',
      'xl': '1280px',
      'xl2': '1465px',
      '2xl': '1536px',
      '3xl': '1920px',
      'vw': "1921px",
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}