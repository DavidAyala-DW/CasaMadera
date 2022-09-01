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
        body: "#0C0A06"
      },
      fontFamily: {
        'sofia-pro': ['"Sofia Pro"', 'sans-serif'],
      },
    },
    screens: {
      'sm': '480px',
      'sm2': '580px',
      'sm3': '680px',
      'md': '768px',
      'md2': '980px',
      'lg': '1024px',
      'lg2': '1120px',
      'xl': '1280px',
      'vw': "1440px",
      'xl2': '1465px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}