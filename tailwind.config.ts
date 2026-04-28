import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0a0b",
          surface: "#111114",
          elevated: "#16161a",
          hover: "#1c1c22",
        },
        border: {
          subtle: "#26262d",
          DEFAULT: "#2e2e36",
          strong: "#3a3a44",
        },
        fg: {
          primary: "#e8e8ea",
          secondary: "#a1a1aa",
          muted: "#6b6b75",
        },
        accent: {
          DEFAULT: "#6ee7b7",
          subtle: "#1f3a31",
          strong: "#34d399",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        "2xs": "0.6875rem",
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
