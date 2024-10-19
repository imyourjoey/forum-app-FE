/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        professional: {
          primary: "#c558fd", // Vibrant Purple
          secondary: "#6c63ff", // Muted Indigo for complementary elements
          accent: "#8e44ad", // Deep purple for accents
          neutral: "#3d3d3d", // Neutral dark gray
          "base-100": "#ffffff", // White background for a clean look
          "base-200": "#f4f4f5", // Light gray background for contrast
          info: "#3abff8", // Sky blue for informational messages
          success: "#22c55e", // Green for success notifications
          warning: "#fbbf24", // Amber for warnings
          error: "#ef4444", // Red for errors
        },
      },
    ],
    darkTheme: "professional", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
