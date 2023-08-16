/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				"custom-green": "#28FF06",
				"custom-red": "#E3031D",
				"custom-yellow": "#E8ED32",
				"custom-blue": "#54D3FB",
			},
		},
	},
	plugins: [],
};
