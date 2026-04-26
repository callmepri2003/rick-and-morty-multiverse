import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        portal: {
          green: "#39ff14",
          teal: "#00b5cc",
          dark: "#0a0a0a",
          card: "#111827",
          border: "#1f2937",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "portal-spin": "portal-spin 8s linear infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      keyframes: {
        "portal-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 5px #39ff14, 0 0 10px #39ff14" },
          "50%": { boxShadow: "0 0 20px #39ff14, 0 0 40px #39ff14" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "portal-gradient":
          "radial-gradient(ellipse at center, #00b5cc22 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
