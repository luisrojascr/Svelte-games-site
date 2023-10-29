/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@infinitro/auth/**/*.svelte'],

	darkMode: 'class',

	theme: {
		fontFamily: {
			sans: ['Inter'],
			'sans-2': ['Poppins']
		},
		extend: {
			borderColor: {
				100: '#2D3969'
			},
			colors: {
				'background-950': '#111A41',
				'background-900': '#222c55',
				'text-100': '#ffffff'
			}
		}
	}
};

module.exports = config;
