/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "transparent-white": "rgba(255, 255, 255, 0)",
      },
      fontFamily: {
        primary: [
          "Gotham",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "San Francisco",
          "Roboto",
          "Segoe UI",
          "Ubuntu",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
    plugins: [],
  },
};
