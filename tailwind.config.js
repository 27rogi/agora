const colors = require('tailwindcss/colors')
const themeSwapper = require('tailwindcss-theme-swapper')

module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      neutral: colors.neutral,
      orange: colors.orange,
      stone: colors.stone,
    },
    fontFamily: {
      sans: ["Commissioner", "sans-serif"],
    },
    extend: {
      transitionTimingFunction: {
        light: 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionProperty: {
        height: 'max-height'
      },
    },
  },
  plugins: [
    themeSwapper({
      themes: [
        {
          name: 'base',
          selectors: [':root'],
          theme: {
            colors: {
              stone: {
                50: "#f2f2f2",
                100: "#d5d4d4",
                200: "#878685",
                300: "#737271",
                400: "#605f5e",
                500: "#565554",
                600: "#424141",
                700: "#383837",
                800: "#2e2e2d",
                900: "#1a1a1a",
              },
              cave: {
                10: "#eaeef3",
                20: "#d1dbe5",
                30: "#9fb3c8",
                40: "#86a0ba",
                50: "#6182a4",
                100: "#587999",
                200: "#4a6580",
                300: "#3c5167",
                400: "#34485b",
                500: "#2d3e4e",
                600: "#1f2a35",
                700: "#182029",
                800: "#11171d",
                900: "#090d10",
              },
            }
          },
        },
        {
          name: 'mc-orange',
          selectors: ['.orange'],
          theme: {
            colors: {
              stone: {
                50: "#f2f2f2",
                100: "#d5d4d4",
                200: "#878685",
                300: "#737271",
                400: "#605f5e",
                500: "#565554",
                600: "#424141",
                700: "#383837",
                800: "#2e2e2d",
                900: "#1a1a1a",
              },
              cave: {
                10: "#fdf8f4",
                20: "#fbede3",
                30: "#f8e2d2",
                40: "#f5d7c1",
                50: "#faece2",
                100: "#f0c19f",
                200: "#e28a4a",
                300: "#dd7428",
                400: "#d06b21",
                500: "#bf621e",
                600: "#af591c",
                700: "#9e5119",
                800: "#8d4816",
                900: "#6b3711",
              },
            }
          },
        }
      ]
    })
  ],
};
