<script>
	import DiceBoard from './dice-board.svelte';
	import DiceSidebar from './dice-sidebar.svelte';

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

	$: getHeight = () => {
		if (windowWidth > 810) return '575px';
		if (windowWidth <= 750) return 'auto';
		return '575px';
	};
</script>

<div class={isMobile ? 'mobile' : ''}>
	<div class="wrapper" style="min-height: {getHeight()};">
		<div class="main-game-board-wrapper">
			<DiceBoard />
		</div>

		<DiceSidebar />
	</div>
</div>

<style lang="postcss">
	:global(body) {
		--dynamic-flex-direction: row;
		--dynamic-align-items: initial;
	}
	.wrapper {
		@apply flex gap-3.5 grow bg-primary-900 w-full min-w-[300px];
		flex-direction: var(--dynamic-flex-direction);
		align-items: var(--dynamic-align-items);
	}

	.mobile .wrapper {
		--dynamic-flex-direction: column;
		--dynamic-align-items: center;
	}

	.main-game-board-wrapper {
		@apply rounded border bg-[#222c5599] w-full flex-col justify-center items-center grow select-none relative overflow-hidden border-[#2c3763];
	}
</style>
