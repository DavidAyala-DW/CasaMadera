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
      fontSize: {
        'heading-xl': [
          '48px',
          {
            lineHeight: '1.375em',
            fontWeight: '300',
          },
        ],
        'heading-lg': [
          '40px',
          {
            lineHeight: '1.2em',
            fontWeight: '300',
          },
        ],
        'heading-md': [
          '32px',
          {
            lineHeight: '1.2em',
            fontWeight: '300',
          },
        ],
        'heading-sm': [
          '24px',
          {
            lineHeight: '1.375em',
            fontWeight: '300',
          },
        ],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-quotes': 'inherit',
            color: 'rgba(74, 52, 25, 0.85)',
            'h1, h2, h3, h4, h5': {
              fontWeight: '300',
              color: '#4A3419',
              '&:first-child': {
                marginTop: 0,
              },
            },
            p: {
              '&:first-child': {
                marginTop: 0,
              },
              '&:last-child': {
                marginBottom: 0,
              },
            },
            blockquote: {
              display: 'flex',
              gap: 16,
              padding: 0,
              border: 0,
              fontSize: 20,
              fontStyle: 'normal',
              '&::before': {
                content: '"“"',
                fontSize: 56,
                lineHeight: 1.25,
              },
            }
          },
        },
      }),
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
    require('@tailwindcss/typography'),
  ],
}