module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#757f9a'
        },
        light:{
          100: '#d7dde8'
        }
      },
      fontFamily: {
        'cocktail-name': ['"MuseoModerno"', 'cursive']
      }
    },
  },
  plugins: [],
}