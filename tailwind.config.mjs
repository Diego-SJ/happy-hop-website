import animations from 'tailwindcss-animated'
import taos from 'taos/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	content: {
		relative: true,
		transform: (content) => content.replace(/taos:/g, ''),
		files: [
			'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
			'./node_modules/flowbite/**/*.js'
		]
	},
	theme: {
		extend: {},
		screens: {
			xs: '300px',
			ms: '400px',
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		}
	},
	safelist: ['!duration-[0ms]', '!delay-[0ms]', 'html.js :where([class*="taos:"]:not(.taos-init))'],
	plugins: [animations, taos]
}
