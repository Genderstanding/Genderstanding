/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CF6F5A", 
        secondary: "#ECC5B1",
        background: "#FBF1EE",
        text: "#080302",
        accent: {
          1: "", 
          2: "",
        }, 
        bkg: "",
        userContent:"",
        ownerContent:"",
      },
    },
  },
  variants: {},
  plugins: [],
};
