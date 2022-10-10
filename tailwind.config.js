/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "90": "85%",
        "70": "70px"
      },
      height: {
        "70": "70px"
      },
     borderColor: {
      "main": "#dbdbdb"
     },
     screens: {
       sm: "600px",
       xs: "414px"
     }
    },
  },
  plugins: [],
}