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
        primary: "#7F0061",
        secondary: "#9240AF",
        tertiary: "#391AA1",
        white: "#FCFCFC",
        black: "#0F0F0F",
        "gray-200": "#e5e7ff",
        "gray-400": "#9ca3af",
        "gray-600": "#4b5563",
        "gray-800": "#1f2937",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
