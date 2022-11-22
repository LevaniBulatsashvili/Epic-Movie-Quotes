/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        intersteller: "url(@/assets/png/intersteller.png)",
        tenenbaums: "url(@/assets/png/inhouse.png)",
        lotr: "url(@/assets/png/lotr.png)",
      },
      colors: {
        modal: "rgba(0, 0, 0, 0.54)",
        profileUnderline: "rgba(206, 212, 218, 0.5)",
        NewsCardUnderline: "rgba(239, 239, 239, 0.3)",
      },
    },
  },
  plugins: [],
};
