/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'electrolux-blue': '#011E41',
        'electrolux-gray': '#F4F5F7',
        'electrolux-light-gray': '#DFE7EA',
        'electrolux-dark-gray': '#515253'
      },
    },
  },
  plugins: [],
};
