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
      keyframes: {
        scroll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
      },
    },
    plugins: [],
  },
};
