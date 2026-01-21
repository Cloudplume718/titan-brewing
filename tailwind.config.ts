import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#121212", // 炭黑背景
        foreground: "#ededed", // 灰白文字
        primary: {
          DEFAULT: "#F59E0B", // 工业黄铜金
          foreground: "#1a1a1a",
        },
        secondary: {
          DEFAULT: "#27272a", // 卡片深灰
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#404040",
          foreground: "#a3a3a3",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-oswald)', 'sans-serif'],
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
    },
  },
  plugins: [],
};
export default config;