/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	// plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		fontSize: {
			xxs: '10px', // 0.625 rem
			xs: '.75rem', // 12px
			sm: '.875rem', // 14px
			base: '1rem', // 16px
			lg: '1.125rem', // 18px
			xl: '1.25rem', // 20px
			'2xl': '1.5rem', // 24px
			'3xl': '1.875rem', // 30px
			'4xl': '2.25rem', // 36px
			'5xl': '3rem', // 48px
			'6xl': '4rem', // 64px
			'custom-size': '2.5rem' // Custom font size, for example 40px
		},
		screens: {
			xs: '480px', // Custom extra small screen
			sm: '675px', // Default Tailwind small screen
			md: '861px', // Default Tailwind medium screen
			lg: '980px', // Default Tailwind large screen
			xl: '1050px', // Default Tailwind extra large screen
			'2xl': '1536px', // Default Tailwind 2x large screen
			'3xl': '1920px' // Custom 3x large screen
		},
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
				'background-800': '#383f5f75',
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
