import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        panel: "#10151F",
        "panel-raised": "#161C28",
        line: "#232B39",
        paper: "#D7DEE8",
        muted: "#7C8798",
        danger: "#E5484D",
        warning: "#F0A94E",
        safe: "#35C48C",
        accent: "#4FD1E8",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
