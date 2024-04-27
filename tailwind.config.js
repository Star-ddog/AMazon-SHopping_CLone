/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        bgHeader: '#131921',
        seachIcon: '#cd9042',
        buttonBg: '#f0c14b',
        boderColor: '#a88734 #9c7e31 #846a29',
        buttonCol: '#111',
        subtotalBakCol: '#f3f3f3',
        subtotalBorderCol: '#dddddd',
        subtotalButtonback: ' #f0c14b',
        subtotalButtoncol: ' #111',
        subtotalButtonborder: ' #a88734 #9c7e31 #846a29',
        ckeckColor: ' rgb(234, 237, 237)',
        ckeckBdColor: ' lightgray',
 
      },
    },
  },
  plugins: [],
}