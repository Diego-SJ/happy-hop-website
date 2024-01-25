import animations from 'tailwindcss-animated'
import taos from 'taos/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	content: {
		relative: true,
		transform: (content) => content.replace(/taos:/g, ''),
		files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
	},
	theme: {
		extend: {}
	},
	safelist: ['!duration-[0ms]', '!delay-[0ms]', 'html.js :where([class*="taos:"]:not(.taos-init))'],
	plugins: [animations, taos]
}
