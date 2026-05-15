import type { Config } from "tailwindcss";

// In Tailwind v4 the theme lives in globals.css (@theme inline).
// This file is kept only for explicit content path registration.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
