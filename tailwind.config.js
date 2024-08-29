/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Added 'html' to include any HTML files in src
    "./public/**/*.html", // Added to include any HTML files in the public directory
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#192655',
        'light-blue': '#3876BF',
        'orange': '#E1AA74',
        'light-orange': '#F3F0CA',
        "earth" :'#698474',
        'pinkish': '#FFD3B6',
        'skin':'#DCA47C',
        'mildWhite':'#FCF8F3',
      },
      fontFamily: {
        'quickkiss': ['"Quickkiss"', 'sans-serif'], // Use the font-family name and provide a fallback
        'casandra': ['"Casandra"', 'sans-serif'],
        'countryside': ['"Countryside"', 'sans-serif'],
        'countrysidetwo': ['"COUNTRYSIDETWO"', 'sans-serif'],
        'greatvibes': ['"GreatVibes"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}