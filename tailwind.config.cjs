const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			background: '#161a20',
			
			"note-blue": '#85a5f0',
			"note-red": '#ff7b7b',
			"note-green": '#82ee82',
			"note-yellow": '#f0f075',
			"note-purple": '#bd7ddb',
			"note-orange": '#f7b158',
		},
		extend: {}
	},
	plugins: [
		require('flowbite/plugin')
	],
	darkmode: 'class',
};

module.exports = config;
