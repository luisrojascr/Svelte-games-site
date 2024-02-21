<script lang="ts">
	import { writable } from 'svelte/store';

	import Spinner from './components/common/spinner.svelte';
	import Tile from './tile.svelte';

	import { cardStatus } from '$lib/parts/store/store';
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
	<!-- <div class="mines-result-card-wrapper"></div> -->
	<div class="mines-grid">
		{#each $cardStatus as tile (tile.id)}
			<Tile id={tile.id} isMine={tile.isMine ?? false} tileState={tile.state} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.mines-game-wrapper {
		position: relative;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
		flex-direction: column;
		-webkit-box-flex: 1;
		flex-grow: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		user-select: none;
		/* padding: 25px; */
	}

	.mines-grid {
		position: relative;
		display: grid;
		width: 100%;
		max-width: 560px;
		grid-template-columns: repeat(5, auto);
		gap: 1em;
		padding: 1em;
		font-size: 1em;
	}

	.mines-result-card-wrapper {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 166px;
		min-width: 166px;
		z-index: 10;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.mines-result-card-wrapper:first-child {
		border-radius: 4px;
		border: solid 2px #01d180;
		padding: 40px 15px;
		font-family: 'Open Sans', serif;
		font-size: 32px;
		font-weight: 900;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 2.67px;
		text-align: center;
		color: #ffffff;

		border-bottom: none;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		background-color: #111a41;

		white-space: nowrap;
	}

	.mines-result-card-wrapper:last-child {
		border-radius: 4px;
		background-color: #01d180;
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 2;
		letter-spacing: 1px;
		text-align: center;
		color: #111a41;

		padding: 10px;

		border-top-left-radius: 0px;
		border-top-right-radius: 0px;

		white-space: nowrap;
	}
</style>
