const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Be Vietnam Pro"', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                stripped: "url('/bg.jpg')",
                "accent-gradient": "linear-gradient(#E65895, #BC6BE8)",
            },
        },
        colors: {
            blue: "#343963",
            "dark-blue": "#393F6E",
            "darker-blue": "#343964",
            white: "#E2E4F3",
            "light-blue": "#3E9FFF",
            "orange-red": "#DD524C",
            grey: "#8B8EAB",
            "light-yellow": "#FFECC8",
        },
    },
    plugins: [],
};
