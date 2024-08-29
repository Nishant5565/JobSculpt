/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Added 'html' to include any HTML files in src
    "./public/**/*.html", // Added to include any HTML files in the public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}