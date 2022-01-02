module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
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
      colors: {
        rumc: {
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
      },
    },
  },
  plugins: [],
};
