module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      "2xs": "200px",
      xs: "350px",
      s: "500px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lmd: "880px",
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      "2lg": "1100px",
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
    },
    extend: {
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%"
      },
      fontFamily: {
        abeezee: ["ABeeZee", "regular"]
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    }
  },
  plugins: []
};
