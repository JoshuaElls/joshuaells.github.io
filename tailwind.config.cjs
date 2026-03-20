/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                    // your main HTML
    "./*.{html,js}",                   // any .html or .js in root
    "./**/*.{html,js}"                 // everything in subfolders
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
        '1500': '1500ms',
      },
      colors: {
        'primary-red': '#e30613',
        'dark-bg': '#1a1a1a',
        'accent-gray': '#f5f5f5',
        'buoy-red': '#c8102e',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        serif: ['Volkhov', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
