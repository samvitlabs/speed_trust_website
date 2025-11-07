/** @type {import('tailwindcss').Config} */
const palette = {
  background: '#F9F9F9',
  primaryGreen: '#2C5F2D',
  teal: '#458C96',
  coral: '#D93B3B',
  lightGrey: '#F4F4F4',
};

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: palette,
      },
      backgroundColor: {
        screen: palette.background,
      },
    },
  },
  plugins: [],
};
