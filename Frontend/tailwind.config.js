/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'instagram-bg': '#fcefed',
        'instagram-icon': '#dd2a7b',
        'facebook-bg': '#eef5ff',
        'facebook-icon': '#3b5998',
        'linkedin-bg': '#eef5ff', // Same as Facebook
        'linkedin-icon': '#0077b5',
      }
    },
  },
  plugins: [],
}

