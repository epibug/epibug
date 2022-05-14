<script>
	import '../app.css';
	import { DarkMode } from "flowbite-svelte";
</script>

<DarkMode btnClass="theme-toggle text-gray-900 dark:text-white" />
<slot />

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