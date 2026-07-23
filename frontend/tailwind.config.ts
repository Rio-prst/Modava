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
          bg: "#f8f7f4",
          primary: "#13634e",
          "primary-dark": "#0a2328",
          "text-dark": "#0f2d2e",
          accent: "#86e3ce",
        },
      },
    },
  },
  plugins: [],
};
export default config;
