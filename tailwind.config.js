/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        tasktheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          secondary: "#1F2937",
          neutral: "#ffffff",
          "base-200": "#1F2937",
        }
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
