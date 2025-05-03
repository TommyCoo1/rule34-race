// tailwind.config.ts
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          // semantic naming instead of generic "brand"
          primary: {
            light: "#EEF4ED",   // very light accent of primary
            DEFAULT: "#134074", // main primary tone
            dark: "#0B2545"     // darkest shade
          },
          secondary: {
            light: "#8DA9C4",
            DEFAULT: "#13315C",
            dark: "#0F2A4B"
          },
          accent: "#EEF4ED",     // for Buttons, Links
          success: "#84CC16",    // example: green
          info: "#3B82F6",       // example: blue
          warning: "#F59E0B",    // example: yellow/orange
          danger: "#DC2626"      // example: red
        }
      }
    },
    plugins: []
  }
  