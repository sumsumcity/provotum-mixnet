/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "logobrown": {
          900: "#684e46",
          800: "#7a5b51",
          700: "#8b685d",
          600: "#9d7568",
          500: "#ae8274",
          400: "#b68f82",
          300: "#be9b90",
          200: "#c6a89e",
          100: "#ceb4ac"
        },
        "logodblue": {
          100:"#777c8f",
          200:"#60667c",
          300:"#495069",
          400:"#333a57",
          500:"#1c2444",
          600:"#19203d",
          700:"#161d36",
          800:"#141930",
          900:"#111629"
        },
        "logored": {
          100:"#b88088",
          200:"#ac6b74",
          300:"#a05560",
          400:"#94404c",
          500:"#882b38",
          600:"#7a2732",
          700:"#6d222d",
          800:"#5f1e27",
          900:"#521a22"
        },
        "logolblue": {
          100:"#a7bbc6",
          200:"#98b0bd",
          300:"#89a5b3",
          400:"#7b99aa",
          500:"#6c8ea0",
          600:"#618090",
          700:"#567280",
          800:"#4c6370",
          900:"#415560"
        },
        "logowine": {
          100:"#a4838e",
          200:"#956f7b",
          300:"#865a69",
          400:"#774656",
          500:"#683143",
          600:"#5e2c3c",
          700:"#532736",
          800:"#49222f",
          900:"#3e1d28"
        }
      }
    },
  },
  plugins: [],
}
