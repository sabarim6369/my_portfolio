const animatedcss=require("animated-tailwindcss")
const rombo=require("tailwindcss-motion")
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
   plugins: [rombo,animatedcss], 
};
