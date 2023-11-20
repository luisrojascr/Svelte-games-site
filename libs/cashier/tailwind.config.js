/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	// plugins: [require('flowbite/plugin')],

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
				'text-100': '#ffffff',
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				}
			}
		}
	}
};

module.exports = config;
