/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kid-blue': '#4A90E2',
        'kid-pink': '#FF6B9D', 
        'kid-green': '#50E3C2',
        'kid-yellow': '#F5D76E',
        'kid-purple': '#9B59B6',
        'kid-orange': '#FF8A50',
        'kid-red': '#FF6B6B',
        'kid-cyan': '#4ECDC4',
        'kid-lime': '#A8E6CF',
        'kid-mint': '#ABEBC6',
        'kid-peach': '#FFAB91',
        'kid-lavender': '#BB8FCE',
        'kid-sky': '#85C1E9',
        'kid-coral': '#F8BBD9',
        'kid-sunshine': '#FFE082',
        'kid-cloud': '#F8F9FA'
      },
      fontFamily: {
        'kid': ['Baloo 2', 'Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        'playful': ['Fredoka', 'Baloo 2', 'system-ui', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      screens: {
        'tablet': '2388px',
      }
    },
  },
  plugins: [],
}