module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      animation: {
        "pulse-first": "pulse 1s linear infinite",
        "pulse-second": "pulse 1s linear 500ms infinite",
        "pulse-third": "pulse 1s linear 1s infinite",
      },
      screens: {
        msm: { max: "767px" },
        mlg: { max: "1023px" },
      },
    },
  },
  plugins: [require("daisyui")],
};
