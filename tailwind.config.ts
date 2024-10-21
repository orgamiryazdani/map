import type { Config } from "tailwindcss";

export const tailwindColors: { [key: string]: string } = {
  current: "currentColor",
  transparent: "transparent",
  primary: "#1C2826",
  secondary: "#f9f9f9",
  info: "#3abff8",
  success: "#36d399",
  warning: "#fbbd23",
  error: "#f87272",
}

const config: Config = {
  content: [
    "./src/app/**/*.{tsx,jsx}",
  ],
  theme: {
     colors: tailwindColors,
    container: {
      center: true
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
