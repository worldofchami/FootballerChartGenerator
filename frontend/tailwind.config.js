/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                "max-2xl": { max: "1535px" },
                "max-xl": { max: "1279px" },
                "max-lg": { max: "1023px" },
                "max-md": { max: "739px" },
                "max-sm": { max: "639px" },
            },
        },
    },
    plugins: [],
};
