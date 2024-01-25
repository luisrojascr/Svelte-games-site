/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}'
	],

	darkMode: 'class',

	theme: {
		fontFamily: {
			sans: ['Inter'],
			'sans-2': ['Poppins'],
			'mono': ['monospace'],
		},
		extend: {
			transitionProperty: {
				'max-height': 'max-height',
			},
			maxHeight: {
				'1200': '1200px',
			},
			borderColor: {
				50: '#2c3763',
				100: '#2D3969'
			},
			colors: {
				white: '#ffffff',
				primaryBlue: '#4769fc',
				secondaryBlue: '#3f5de3',
				deepBlue: '#1a2349',
				lightBlue: '#7b8ac5',
				hoverBlue: '#d4dcff',
				lightGray: '#E5E7EB',
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
					900: '#111A41',
					950: '#151e45'
				},
        		gray: {
					50:"#f9fafb",
					100:"#f3f4f6",
					200:"#2c3763",
					300:"#3e4462",
					400:"#9ca3af",
					500:"#404d81",
					600:"#2c3763",
					700:"#222c55",
					800:"#111A41",
					900:"#181f45"
				},
				green: {
					300:"#86efac",
					200:"#01D180",
          			500:"#07b370",
					600:"#46d180",
					700:"#33995d",
					800:"#33995d",
				}
			}
		}
	}
};

module.exports = config;