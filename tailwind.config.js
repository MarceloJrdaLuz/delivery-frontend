/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'slim': '375px',
      },
      colors:{
        button:{
          'hover': '#90caf9',
          'disabled': '#ccc',
          'default': '#64b5f6'
        },
        modals:{
          'primary': '#302F3C',
        },
        principais: {
          'primary': '#f63e02',
          'secondary': '#FAFAFA'
        }
      }
    },
  },
  plugins: [],
}
