<script lang="ts">
	import DiamondRevealedNobg from '$lib/assets/images/Mines/diamond-revealed-nobg.svg';
	import DiamondUserRevealedNobg from '$lib/assets/images/Mines/diamond-user-revealed-nobg.svg';
	import MineRevealedNobg from '$lib/assets/images/Mines/mine-revealed-nobg.svg';
	import MineUserRevealedNobg from '$lib/assets/images/Mines/mine-user-revealed-nobg.svg';

	import type {
		MinesBoardStatesEnum,
		MinesState,
		MinesStateActionsEnum
	} from '$lib/parts/store/mines-types';
	import { TileStateEnum } from '$lib/parts/store/mines-types';
	import {
		gameInProgress,
		handleTileClick,
		playOpenDiamond,
		playOpenMine
	} from '$lib/parts/store/store';

	import { spring } from 'svelte/motion';
	import { fade, fly, scale } from 'svelte/transition';

	export let id: number;
	export let isMine: boolean | undefined;
	export let tileState: TileStateEnum;

	import diamondOpen from '$lib/assets/sounds/diamondOpen.mp3';
	import mineOpen from '$lib/assets/sounds/mineOpen.mp3';

	function generateBackgroundImage(tileState: TileStateEnum, isMine: boolean): string {
		if (tileState === TileStateEnum.UserRevealed) {
			return isMine ? `url(${MineUserRevealedNobg})` : `url(${DiamondUserRevealedNobg})`;
		} else if (tileState === TileStateEnum.Revealed) {
			return isMine ? `url(${MineRevealedNobg})` : `url(${DiamondRevealedNobg})`;
		}
		return ''; // No background image
	}

	function getBorderStyle(isMine?: boolean, tileState?: TileStateEnum): string {
		if (isMine && tileState === TileStateEnum.UserRevealed) {
			return 'solid 2px #fe330d';
		} else if (!isMine && tileState === TileStateEnum.UserRevealed) {
			return 'solid 2px #00ee67';
		} else if (tileState === TileStateEnum.Revealed) {
			return 'solid 1px #47558a';
		}
		return '2px solid transparent';
	}

	function handleClick() {
		if (clickable) {
			handleTileClick(id);
		}
	}

	$: clickable = $gameInProgress && tileState === TileStateEnum.Hidden;
	$: borderStyle = getBorderStyle(isMine, tileState);

	$: tileCoverClass = tileState === TileStateEnum.Hidden ? 'visible' : 'hidden';

	$: backgroundImageStyle = `background-image: ${
		generateBackgroundImage(tileState, isMine ?? false) // Use false as a default value if isMine is undefined
	}; background-size: contain; background-position: center center; background-repeat: no-repeat;`;
</script>

<button class="tile-button" on:click={handleClick} style="border: {borderStyle}">
	{#if tileState === TileStateEnum.Revealed || tileState === TileStateEnum.UserRevealed}
		<div class="tile-content" in:fade out:fade style={backgroundImageStyle}></div>
	{/if}
	<div class="tile-cover {tileCoverClass}" in:scale={{ start: 0.3, duration: 200 }} out:fade />
</button>

<style lang="postcss">
	.tile-button {
		@apply relative text-base rounded p-0 m-0;
		transition-duration: 300ms;
		transition-property: background-color, box-shadow;
	}

	.tile-button::after {
		@apply content-[''] block pb-[100%];
	}

	/* .tile-button:active {
		content: '';
		display: block;
		padding-bottom: 100%;
	} */

	.tile-button:disabled {
		@apply cursor-not-allowed pointer-events-none opacity-100;
	}

	.tile-cover {
		@apply absolute top-0 left-0 right-0 bottom-0 rounded-[0.3em] opacity-0 bg-[#47527C];
		box-shadow: 0 3px 0 0 rgb(17, 26, 65);
		transition-duration: 300ms;
		transition-property: background-color;
	}

	.tile-cover.visible {
		@apply opacity-100;
	}

	.tile-cover:hover {
		@apply bg-[#6875A7];
		transition-duration: 300ms;
		transition-property: background-color, box-shadow;
	}

	.tile-content {
		@apply absolute top-0 left-0 bottom-0 right-0 bg-contain bg-no-repeat bg-[#111A41];
	}

	/* .tile-content svg {
		width: 100%;
		height: 100%;
		transform: translate3d(0px, 0px, 0px);
	} */
</style>
