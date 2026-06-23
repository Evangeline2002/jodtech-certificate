/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'jod-navy': '#0A2540',
                'jod-blue': '#007BFF',
                'jod-gold': '#FFD700',
            },
        },
    },
    plugins: [],
}
