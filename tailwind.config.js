/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ipecd': {
          'dark': '#526928',
          'primary': '#96C156',
          'light': '#CADFAB',
        },
      },
    },
  },
  plugins: [],
}







