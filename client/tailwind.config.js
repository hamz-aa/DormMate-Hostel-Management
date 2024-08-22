/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#515151", // Gray color for the bar and placeholder text
        customFocus: "#294151", // Color when input is focused
        primary: "#0A2640",
        secondary: "#1C3D5B",
        heading: "#2C3E50",
        text: "#34495eda",
        contactGray: "#EAEAEA",
        footerGray: "#92989F",
        dashboardPrimary: "#34495E",
        dashboardSecondary: "#F1F2F7",
        dashboardText: "#7F7F7F",
        announcementCard: "#D3D3D3",
        'custom-gradient-start': '#6a11cb',
        'custom-gradient-end': '#2575fc',
        'primary-500': '#0A2640',
        'primary-300': '#1C3D5B',
        'accent-500': '#4C6A92',
        'accent-300': '#8AA2C1',
        'light-500': '#34495E',
        'light-300': '#5DADE2',
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      }),
      gradientColorStops: theme => ({
        'custom-gradient-start': '#6a11cb',
        'custom-gradient-end': '#2575fc',
      }),
      width: {
        50: "200px", // Custom width value for w-50
        25: "100px", // Custom width value for w-25
      },
    },
  },
  plugins: [],
};
