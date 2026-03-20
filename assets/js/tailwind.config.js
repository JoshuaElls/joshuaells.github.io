/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'buoy-red': '#c8102e',
        'dark-bg': '#000',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        serif: ['Volkhov', 'serif'],
      }
    }
  },
  plugins: [],
}