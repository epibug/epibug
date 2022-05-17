<script context="module" lang="ts">
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import 'dayjs/locale/fr.js';
	import dayjs from 'dayjs';
	dayjs.locale('fr');
</script>

<script lang="ts">
	import { page } from '$app/stores';
	export let path = '/';
	page.subscribe((p) => (path = p.url.pathname));

	const activeClasses =
		'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active';

	let tabs = [
		{
			name: 'Incidents',
			active: path === '/',
			href: '/',
			rel: undefined
		},
		{
			name: 'Plaintes',
			active: path === '/plaintes',
			href: '/plaintes',
			rel: undefined
		}
	];
</script>

<DarkMode btnClass="theme-toggle text-gray-900 dark:text-white" />

<div class="container p-8 max-w-3xl text-center m-auto">
	<h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">EPIBUG</h1>
	<p class="text-left md:text-center text-gray-900 dark:text-white">
		Mon école bug, c'est ici que vous retrouverez tous les incidents interne de l'EPITA.
	</p>
	<div class="flex justify-center">
		<div class="border-b border-gray-200 dark:border-gray-700">
			<ul
				class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
			>
				<li class="mr-2">
					<a
						href="/"
						class="inline-flex p-4 rounded-t-lg border-b-2 group {path === '/'
							? activeClasses
							: ''}"
						aria-current="page"
					>
						Incidents
					</a>
				</li>
				<li class="mr-2">
					<a
						href="/plaintes"
						class="inline-flex p-4 rounded-t-lg border-b-2 group {path === '/plaintes'
							? activeClasses
							: ''}"
						aria-current="page"
					>
						Plaintes
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="pb-10">
	<slot />
</div>

<footer
	class="justify-center p-4 bg-white rounded-lg shadow flex items-center md:p-6 dark:bg-background"
>
	<span class="text-sm text-gray-500 text-center dark:text-gray-400"
		>© 2022 <a href="/" class="hover:underline">Epibug - Mon école bug</a>. Non affilié à EPITA.</span
	>
</footer>

<style lang="scss">
	:global(.theme-toggle) {
		position: absolute;
		top: 15px;
		right: 15px;
		z-index: 9999;
		padding: 0;
		margin: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		font-size: 0;
	}
</style>
