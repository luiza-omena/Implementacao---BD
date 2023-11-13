/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html", 
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            aqua: "#1AB2C6",
            grey: "#FCFCFC",
            greyLight: "#C7C7C7",
            grey1: "#242424",
            grey2: "#FAFAFA",
            grey3: "#EFF0F6",
            grey4: "#BCBCBC",
            grey5: "#606060",
            red1: "#FC0C46",
            green1: "#72E77E",
            orange1: "#FDAE39",
            white1 : "#EFF0F6"
          },
          backgroundColor : {
            grey1: "#FCFCFC",
            grey2: "#FAFAFA",
            grey3: "#EFF0F6",
            grey4: "#BCBCBC",
            grey5: "#606060",
            red1: "#FC0C46",
            green1: "#72E77E",
            orange1: "#FDAE39",
            white1 : "#EFF0F6",
            black1 : "#000000"
          },
      },
      fontFamily: {
        Josefin: 'Josefin Sans',
        Helvetica: 'Helvetica Neue',
        Avenir: 'Avenir',
        Inter: 'Inter, sans-serif',
        Noto: 'Noto Color Emoji, sans-serif',
        Medula: 'Medula One',
      }
    },
    plugins: [],
  }