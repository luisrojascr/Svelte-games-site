/** @type {import('tailwindcss').Config}*/

import { screens } from 'tailwindcss/defaultTheme';

const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@infinitro/auth/**/*.svelte',
		'./node_modules/@infinitro/chat/**/*.svelte',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		fontFamily: {
			sans: ['Inter'],
			'sans-2': ['Poppins']
		},
		screens: {
			xs: '400px',
			...screens
		},
		extend: {
			borderColor: {
				100: '#2D3969'
			},
			screens: {
				lg: '992px',
				xl: '1024px',
				'2xl': '1280px'
			},
			colors: {
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
				},
        		gray: {
					50:"#f9fafb",
					100:"#f3f4f6",
					200:"#e5e7eb",
					300:"#d1d5db",
					400:"#9ca3af",
					500:"#6b7280",
					600:"#2c3763",
					700:"#222c55",
					800:"#111A41",
					900:"#111827"
				},
				green: {
					300:"#86efac",
					600:"#46d180",
					700:"#33995d",
					800:"#33995d",
				},
				'background-950': '#111A41',
				'text-100': '#ffffff'
			}
		}
	}
};

export default config;
