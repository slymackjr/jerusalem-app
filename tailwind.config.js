/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        darkSidebar: '#1E293B',  // Custom dark blue for sidebar
        darkBg: '#111827',       // Dark background for main content
      },
      // animation: {
      //   fadeIn: "fadeIn 0.3s ease-in-out",
      // },
      // keyframes: {
      //   fadeIn: {
      //     "0%": { opacity: 0, transform: "translateY(-10px)" },
      //     "100%": { opacity: 1, transform: "translateY(0)" },
      //   },
      // },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        bounceIn: "bounceIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
}

