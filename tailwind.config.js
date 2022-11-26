/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 800ms linear infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#44403c",

          secondary: "#d9f99d",

          accent: "#0284c7",

          neutral: "#57534e",

          "base-100": "#111827",

          info: "#22d3ee",

          success: "#4ade80",

          warning: "#fde68a",

          error: "#fda4af",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
