/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617', // Deep Charcoal background
        },
        neonCyan: '#06b6d4',   // System Normal
        neonAmber: '#f59e0b',  // Warning/Crowd
        neonRed: '#ef4444',    // Emergency/SOS
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}