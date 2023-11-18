/** @type {import('tailwindcss').Config}*/

import { screens } from 'tailwindcss/defaultTheme';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@infinitro/auth/**/*.svelte'],

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
				'background-950': '#111A41',
				'background-900': '#222c55',
				'background-500': '#313d6b',
				'text-100': '#ffffff'
			}
		}
	}
};

export default config;
