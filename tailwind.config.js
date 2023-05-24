/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-purple": "#5C6BC0",
        "light-orange": "#FFB74D"
      },
    },
  },
  plugins: [],
}

