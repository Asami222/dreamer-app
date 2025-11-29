import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "30rem",   // 480px
        "2xl": "100rem", // 1600px
        "3xl": "120rem", // 1920px
      },
      borderWidth: {
        3: '3px',
      }
    },
  },
  plugins: [
    // before/after の content ユーティリティを追加
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.content-empty': {
          content: '""',
        },
      }, ['before', 'after'])
    },
  ],
};

export default config;