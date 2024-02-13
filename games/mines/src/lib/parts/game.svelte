<script>
	import { onDestroy, onMount } from 'svelte';

	let windowWidth = window.innerWidth;

	function updateWindowWidth() {
		windowWidth = window.innerWidth;
	}

	onMount(() => {
		window.addEventListener('resize', updateWindowWidth);
	});

	onDestroy(() => {
		window.removeEventListener('resize', updateWindowWidth);
	});

	$: isMobile = windowWidth <= 750;
</script>

<div class={isMobile ? 'mobile' : ''}>
	<h3 class="text-white text-center">Original Mines game here</h3>
</div>

<style lang="postcss">
</style>
