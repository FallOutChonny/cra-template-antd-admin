const { colors } = require('tailwindcss/defaultTheme')
const path = require('path')
const theme = require('./theme')

const spaces = Array.from({ length: 400 }).map((_, idx) => idx)

module.exports = {
  important: true,
  darkMode: false,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    textColor: Object.assign(colors, theme),
    borderColor: Object.assign(colors, theme),
    backgroundColor: Object.assign(colors, theme),
    spacing: spaces.reduce(
      (result, s) => Object.assign(result, { [s]: `${s}px` }),
      {}
    ),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
