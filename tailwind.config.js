// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pretendard: ["PretendardVariable", "sans-serif"],
				recipekorea: ["Recipekorea", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
