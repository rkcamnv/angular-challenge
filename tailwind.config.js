/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})}
  ],
}
