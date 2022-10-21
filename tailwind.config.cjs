/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				"bp-1": "770px",
				"bp-2": "1150px",
			},
		},
	},
	plugins: [],
};
