import type { Config } from "tailwindcss";
import c from "tailwindcss/colors";

export default <Partial<Config>>{
  darkMode: "class",
  content: ["./nuxt.config.{js,ts}"],
  theme: {
    fontSize: {
      xs: "0.8rem",
      sm: "0.9rem",
      base: "1rem",
      lg: "1.12rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.252rem",
      "6xl": "4.052rem",
    },
    extend: {
      colors: {
        primary: c.cyan,
        secondary: c.indigo,
        error: c.red,
        success: c.green,
        warning: c.yellow,
        info: c.cyan,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
};
