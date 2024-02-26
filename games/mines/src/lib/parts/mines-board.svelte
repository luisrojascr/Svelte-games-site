<script lang="ts">
	import { writable } from 'svelte/store';

	import Tile from './tile.svelte';

	import { cardStatus, gameInProgress, totalMultiplier } from '$lib/parts/store/store';
	import { onDestroy, onMount } from 'svelte';

	let gameContainer: any;
	let resizeSecond: boolean = false;

	let windowWidth = window.innerWidth;

	const dimensions = writable({ width: 0, height: 0 });

	const mainBoardBreakpoints = {
		first: 780,
		second: 510,
		third: 395
	};

	function updateDimensions() {
		dimensions.set({ width: gameContainer.clientWidth, height: gameContainer.clientHeight });
	}

	function updateWindowWidth() {
		windowWidth = window.innerWidth;
	}

	$: dimensions.subscribe(($dimensions) => {
		if ($dimensions.width <= mainBoardBreakpoints.second) {
			resizeSecond = true;
		} else {
			resizeSecond = false;
		}
	});

	onMount(() => {
		window.addEventListener('resize', updateWindowWidth);
		window.addEventListener('resize', updateDimensions);
		updateDimensions();
	});

	// Cleanup
	onDestroy(() => {
		window.removeEventListener('resize', updateDimensions);
		window.removeEventListener('resize', updateWindowWidth);
	});
</script>

<div bind:this={gameContainer} class="mines-game-wrapper">
	<!-- {#if !gameInProgress && $totalMultiplier > 1}
		<div class="mines-result-card-wrapper">
			<div>{$totalMultiplier}X</div>
			<div>{$totalMultiplier}</div>
		</div>
	{/if} -->
	<div class="mines-grid">
		{#each $cardStatus as tile (tile.id)}
			<Tile id={tile.id} isMine={tile.isMine ?? false} tileState={tile.state} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.mines-game-wrapper {
		@apply relative flex justify-between items-center flex-col grow w-full h-full overflow-hidden select-none;
		-webkit-box-pack: justify;
		-webkit-box-align: center;
		-webkit-box-flex: 1;
	}

	.mines-grid {
		@apply relative grid w-full max-w-[560px] grid-cols-5 gap-4 p-4 text-base;
		/* grid-template-columns: repeat(5, auto); */
	}

	.mines-result-card-wrapper {
		@apply absolute flex flex-col w-full max-w-[166px] min-w-[166px] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
	}

	.mines-result-card-wrapper :first-child {
		@apply rounded p-[40px_15px] text-[32px] font-black tracking-[2.67px] text-center text-white border-b-0 bg-[#111a41] rounded-bl-none rounded-br-none;
		border: solid 2px #01d180;
	}

	.mines-result-card-wrapper :last-child {
		@apply rounded text-xs font-bold leading-[2] tracking-[1px] text-center bg-[#01d180] text-[#111a41] p-[10px] whitespace-nowrap rounded-tl-none rounded-tr-none;
	}
</style>
