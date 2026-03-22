import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#F6F1E8",
        "surface-container": "#F2EDE4",
        "surface-container-high": "#ECE8DF",
        "surface-container-highest": "#E7E2D9",
        ink: "#111111",
        primary: "#D72626",
        "primary-dark": "#B20011",
        outline: "#916F6B",
        cattle: "#6E4BD8",
        pig: "#D97A9A",
        sheep: "#3C7BEA",
        poultry: "#C9A200",
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Public Sans", "sans-serif"],
        label: ["Public Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px",
      },
      spacing: {
        "editorial-sm": "0.7rem",
        "editorial-md": "1.4rem",
        "editorial-lg": "2.75rem",
        "editorial-xl": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
