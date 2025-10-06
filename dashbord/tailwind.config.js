/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading:["Risque", "sans-serif"],
        titles: ["Poppins", "sans-serif"],
        text: ["Rubik", "sans-serif"],
      },
      screens: {
        "mb-s": "319px",
        tab: "768px",
        lap: "1024px",
        desk: "1200px",
        "4k": "2560px",
      },
    },
  },
  plugins: [],
};

