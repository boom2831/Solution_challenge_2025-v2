/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#1e40af',  // blue-800
        },
        secondary: {
          light: '#f59e0b', // amber-500
          dark: '#d97706',  // amber-600
        },
      },
      boxShadow: {
        'glow': '0 0 10px rgba(96, 165, 250, 0.5)',
        'glow-dark': '0 0 10px rgba(30, 64, 175, 0.7)',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

