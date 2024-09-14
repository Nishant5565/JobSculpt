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
        'aesthetic-white':'#FAF5F1',
        'aesthetic-black':'#292F36',
        'aesthetic-grey':'#E0DBD8',
        'aesthetic-green':'#4E6E5D',
        'aesthetic-pink':'#F2C94C',
        'aesthetic-purple':'#A41F13',
        'aesthetic-orange':'#F2C94C',
        'aesthetic-brown':'#8F7A6E',
        'default-color1':'#3D52A0',
        'default-color2':'#7091E6',
        'default-color3':'#8697C4',
        'default-color4':'#ADBBDA',
        'default-color5':'#EDE8F5',
      },
      fontFamily: {
        'quickkiss': ['"Quickkiss"', 'sans-serif'], // Use the font-family name and provide a fallback
        'casandra': ['"Casandra"', 'sans-serif'],
        'countryside': ['"Countryside"', 'sans-serif'],
        'countrysidetwo': ['"COUNTRYSIDETWO"', 'sans-serif'],
        'greatvibes': ['"GreatVibes"', 'sans-serif'],
      },
      screens: {
        'max-xs': {'max': '430px'}, // Custom max-width media query for screens smaller than 640px
        'max-sm': {'max': '639px'}, // Custom max-width media query for screens smaller than 640px
        'max-md': {'max': '767px'}, // Custom max-width media query for screens smaller than 768px
        'max-lg': {'max': '1023px'}, // Custom max-width media query for screens smaller than 1024px
        'max-xl': {'max': '1279px'}, // Custom max-width media query for screens smaller than 1280px
      },
      borderImage: {
        'gradient-border': 'linear-gradient(to right, #4E6E5D, #FF5733)',
      },
    },
  },
  plugins: [],
}