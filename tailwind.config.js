/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      screens: {
        "2xl": { max: "1535px" }, 
        xl: { max: "1279px" },
        lg: { max: "1023px" }, 
        md: { max: "767px" }, 
        sm: { max: "639px" }, 
        xs: { max: "475px" }, 
        xxs: { max: "425px" },
        "3xs": { max: "375px" }, 
        "4xs": { max: "320px" }, 
      },
    },
  },
  plugins: [],
};