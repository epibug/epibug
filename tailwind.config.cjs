const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
	plugins: [
		require('flowbite/plugin')
	],
	darkmode: 'class',
};

module.exports = config;
