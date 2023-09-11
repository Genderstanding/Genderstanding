/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["Mulish", "sans"],
      },
      colors: {
        primary: "rgb(var(--colors-primary))",
        secondary: "rgb(var(--colors-secondary))",
        accent: "rgb(var(--colors-accent) / <alpha-value>)",
        bkg: "rgb(var(--colors-bkg) / <alpha-value>)",
        text: "rgb(var(--colors-text) / <alpha-value>)",
        userContent: "rgb(var(--colors-userContent) / <alpha-value>)",
        ownerContent: "rgb(var(--colors-ownerContent) / <alpha-value>)",
        hearts: "rgb(var(--colors-hearts) / <alpha-value>)",
        textarea: "rgb(var(--colors-textarea) / <alpha-value>)",
        gray:"rgb(var(--colors-gray) / <alpha-value>)",
        main:"rgb(var(--colors-main) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

