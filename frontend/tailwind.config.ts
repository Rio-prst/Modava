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
        background: "var(--background)",
        foreground: "var(--foreground)",
        modava: {
          bg: "#FAF8F5",
          primary: "#1E6B52",
          "primary-dark": "#052530",
          "text-dark": "#0A2328",
          "text-muted": "#556061",
          "accent-mint": "#86E3CE",
          "accent-blue": "#C5E8FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
