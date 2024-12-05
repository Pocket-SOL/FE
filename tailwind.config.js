// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import scrollbarHide from "tailwind-scrollbar-hide";

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
	plugins: [forms, scrollbarHide],
};
