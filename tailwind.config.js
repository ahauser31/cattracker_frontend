/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /w-.+/
    },
    'bg-gray-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
