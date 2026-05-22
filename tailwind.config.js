/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        party: {
          pink: "#EC4899",
          purple: "#BE185D",
          orange: "#F97316",
          yellow: "#FBBF24",
          mint: "#FDA4AF",
          deep: "#1A1147",
        },
      },
      animation: {
        fadeInOut: "fadeInOut 2s ease-in-out",
        wiggle: "wiggle 0.6s ease-in-out infinite",
        "pop-in": "popIn 0.35s cubic-bezier(0.22, 1.61, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "bounce-slow": "bounceSlow 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "50%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.7)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
