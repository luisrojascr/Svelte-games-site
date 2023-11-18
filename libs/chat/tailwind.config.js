/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

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
				white: '#ffffff',
				green: '#46d180',
				'dark-green': '#33995d',
				// flowbite-svelte
				primary: {
					50: '#eceffa',
					100: '#ced3ea',
					200: '#c1c7e7',
					300: '#a0a9cf',
					400: '#929abe',
					500: '#747da7',
					600: '#313d6b',
					700: '#2c3763',
					800: '#222c55',
					900: '#111A41'
				}
			}
		}
	}
};

module.exports = config;
