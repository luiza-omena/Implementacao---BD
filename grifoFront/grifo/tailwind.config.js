/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: "#1AB2C6",
        grey: "#FCFCFC",
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
      fontSize: {
        rem1: "1rem",
        rem1p15: "1.15rem",
        rem1p25: "1.25rem",
        rem1p5: "1.5rem",
      },
      animation: {
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97)",
        pulsefast: "pulsefast 0.75s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pingsmall: 'pingsmall 1s infinite'
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translateX(-1px)" },
          "20%, 80%": { transform: "translateX(2px)" },
          "30%, 50%, 70%": { transform: "translateX(-3px)" },
          "40%, 60%": { transform: "translateX(3px)" },
        },
        pulsefast: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.85 },
        },
        pingsmall: {
          "75%, 100%": { transform: 'scale(1.5, 1.05)', opacity: 0 }
        }
      },
    },
    fontFamily: {
      Josefin: 'Josefin Sans',
      Helvetica: 'Helvetica Neue',
      Avenir: 'Avenir',
      Inter: 'Inter, sans-serif',
      Noto: 'Noto Color Emoji, sans-serif',
    }
  },
  plugins: [],
}

