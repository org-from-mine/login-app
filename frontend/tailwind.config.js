/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#D0E1F0',
          500: '#BDD5EA',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#DDFC74',
        }
      },
      backgroundColor: {
        'light': '#ffffff',
        'dark': '#0C1B31',
      },
      textColor: {
        'light': '#0C1B31',
        'dark': '#ffffff',
      }
    },
  },
  plugins: [],
}