/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--colors-primary))", 
        secondary:  "rgb(var(--colors-secondary))", 
      //   accent: "rgb(var(--color-accent) / <alpha-value>)",
      //   bkg: "rgb(var(--color-bkg) / <alpha-value>)",
      //   text: "rgb(var(--color-text) / <alpha-value>)",
      // },
      // userContent: "rgb(var(--userContent) / <alpha-value>)",
      // ownerContent: "rgb(var(--ownerContent) / <alpha-value>)",
    },
  }
  },
  plugins: [],
};
