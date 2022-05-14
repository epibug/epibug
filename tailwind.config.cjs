const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			background: '#161a20'
		},
		extend: {}
	},
	plugins: [
		require('flowbite/plugin')
	],
	darkmode: 'class',
};

module.exports = config;
