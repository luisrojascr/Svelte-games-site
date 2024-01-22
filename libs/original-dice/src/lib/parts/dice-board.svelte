<script lang="ts">
	import DiceIcon from '$lib/assets/images/diceIcon.png';
	import DiceWheelIcon from '$lib/assets/images/diceWheelIcon.png';

	import DiceSlider from './dice-slider.svelte';
	import DiceWheel from './dice-wheel.svelte';

	let gameContainer: HTMLElement | undefined;
	let mobile: false;

	let disabled: boolean = false;
	let value: number = 50;

	function handleRollOverUnderChange(event: Event) {
		// For later
		console.log('test');
	}
</script>

<div bind:this={gameContainer} class="game-container">
	<div class="dice-game-wrapper">
		<button
			class={`change-dice-variant-button ${mobile ? 'top-2 left-2 w-7 h-7' : 'top-6 left-6 w-12 h-12'}`}
		>
			<img src={DiceWheelIcon} alt="Dice Icon" class="dice-icon-image" />
			<!-- Add dynamic button later -->
		</button>

		<div class="past-bets-wrapper">
			<!-- Will add this part later -->
		</div>

		<div class="dice-content">
			<!-- <DiceSlider {disabled} {value} on:rollOverUnderChange={handleRollOverUnderChange} /> -->
			<DiceWheel />
		</div>
	</div>
</div>

<style lang="postcss">
	.dice-game-wrapper {
		@apply relative flex justify-between items-center flex-col flex-grow w-full p-6;
		/* Add responsive padding here later */
	}

	.change-dice-variant-button {
		@apply absolute flex justify-center items-center rounded border border-solid border-gray-800 bg-deepBlue text-lightBlue transition-colors ease-in z-10;
	}

	.dice-icon-image {
		@apply w-[32px] h-[32px];
	}

	.past-bets-wrapper {
		@apply w-full relative h-8 flex flex-row-reverse overflow-hidden z-[9];
	}

	.dice-content {
		@apply flex justify-center items-center flex-grow w-full pb-4 pt-5;
	}

	.dice-footer {
		@apply relative grid w-full grid-cols-3 gap-2 text-deepBlue;
		/* Add responsive padding here later */
	}

	.change-dice-variant-button {
		@apply absolute flex justify-center items-center rounded border border-gray-800 bg-deepBlue text-lightBlue transition-colors ease-in z-10;
		/* Add conditional top, left, width, and height */
	}

	.input-label {
		@apply inline-flex items-start flex-col-reverse touch-manipulation;
	}

	.label-text {
		@apply inline-flex items-center font-bold text-xs leading-6 tracking-widest text-lightGray mb-1 transition-all duration-200 ease-out;
	}

	.input-wrapper {
		@apply w-full flex flex-shrink-0;
	}

	.input-content {
		@apply relative flex-grow w-full flex;
		/* Styles for SVG inside */
	}

	.game-input {
		@apply font-normal text-lg overflow-scroll bg-deepBlue text-white rounded border border-gray-700 py-2 px-3 pr-7 transition-all duration-200 ease-out outline-none;
		/* Add hover, focus, active, and disabled states later */
		/* Add responsive font size later */
	}
</style>
