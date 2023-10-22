/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF725E',
        lightText: '#9A9Ab0',
        dark:'#11142D',
        white:'#FFF',
        background:'#FbF6F4',
        boarder:'#E1E1E1',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans'],
      },
      opacity: ['disabled']
    },
  },
  plugins: [],
}

