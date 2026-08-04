/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0714",
          panel: "#130E1F",
          card: "#171123",
          border: "#241C33",
        },
        accent: {
          purple: "#8B5CF6",
          violet: "#A78BFA",
          gold: "#F5B324",
          green: "#22C55E",
          red: "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
