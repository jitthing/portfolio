/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "transparent-white": "rgba(255, 255, 255, 0)",
      },
    },
    plugins: [],
  },
};
