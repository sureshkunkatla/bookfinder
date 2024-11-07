/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', // For Firefox
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', // For Chrome, Safari, and Edge
        },
      });
    },
  ],
}

