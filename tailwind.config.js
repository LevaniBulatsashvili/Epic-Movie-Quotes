/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "lg": {"max": "1420px"},
      "md": {"max": "960px"},
      "sm": {"max": "520px"},
    },
    extend: {
      fontFamily: {
        Halvetica_Neue: ["Halvetica_Neue", "sans-serif"],
      },
      backgroundImage: {
        intersteller: "url(@/assets/png/intersteller.png)",
        tenenbaums: "url(@/assets/png/inhouse.png)",
        lotr: "url(@/assets/png/lotr.png)",
      },
      colors: {
        modal: "rgba(0, 0, 0, 0.54)",
        dropdown: "rgba(151, 71, 255, 0.4)",
        notification: "rgba(108, 117, 125, 0.5)",
        searchBorder: "rgba(239, 239, 239, 0.3)",
        searchText: "rgba(239, 239, 239, 0.6)",
        movieModal: "rgba(17, 16, 26, 0.54)",
        movieModalUnderline: "rgba(239, 239, 239, 0.2)",
        quoteUnderline: "rgba(239, 239, 239, 0.2)",
        profileUnderline: "rgba(206, 212, 218, 0.5)",
        NewsCardUnderline: "rgba(239, 239, 239, 0.3)",
      },
    },
  },
  plugins: [],
};
