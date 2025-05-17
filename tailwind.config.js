/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      main_background: "#F5F0EB",
      error: "#F54C3F",
      success: "#27C196",
      link: "#3374CD",
    },
    fontFamily: {
      sans: ["iransansxv"],
    },
  },
  plugins: [],
};
