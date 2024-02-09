<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import PastBetButton from './components/common/past-bet-button.svelte';
	import { DiceRollConditionEnum } from '../utils/cc.js';
	import DiceIcon from '$lib/assets/images/diceIcon.png';
	import DiceWheelIcon from '$lib/assets/images/diceWheelIcon.png';
	import CloseIconX from '$lib/assets/images/CloseIconX.svelte';
	import PercentIcon from '$lib/assets/images/PercentIcon.svelte';
	import RefreshIcon from '$lib/assets/images/RefreshIcon.svelte';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import DiceSlider from './dice-slider.svelte';
	import DiceWheel from './dice-wheel.svelte';
	import { round } from '../utils/helper.js';

	import {
		autoBetInProgress,
		cashout,
		gameInProgress,
		isRollOverOrUnder,
		pastBets,
		rollOverUnder,
		rotateBoxTo,
		winChance
	} from '$lib/parts/store/store.js';

	let gameContainer: HTMLElement | undefined;
	let mobile: false;

	let disabled: boolean = false;
	let value: number = 50;

	let isDiceWheelIconDisplayed = true;
	let isDiceIconDisplayed = true;

	let localWinChance: string = $winChance;
	let localCashout: string = $cashout;
	let rollOver = 50.5;

	let displayedBets: any = [];

	const loading = writable(false);

	const MIN_PAYOUT = 1;
	const MAX_PAYOUT = 49.5;
	const MIN_WIN_CHANCE = 2.0;
	const MAX_WIN_CHANCE = 98.0;

	function toggleDiceIcon() {
		isDiceWheelIconDisplayed = !isDiceWheelIconDisplayed;
		isDiceIconDisplayed = !isDiceIconDisplayed;
	}

	$: if ($cashout && parseFloat($cashout) >= MIN_PAYOUT) {
		const newWinChanceValue: any = round(99 / parseFloat($cashout), 4);
		winChance.set(newWinChanceValue.toString());

		if ($isRollOverOrUnder === DiceRollConditionEnum.Over) {
			rollOverUnder.set((100 - newWinChanceValue).toFixed(2));
			rotateBoxTo.set((100 - newWinChanceValue) * 3.6);
		} else {
			rollOverUnder.set(newWinChanceValue.toFixed(2));
			rotateBoxTo.set(parseFloat($cashout) * 3.6);
		}
	}

	function handleWinChanceChange(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		winChance.set(inputElement.value); // Directly setting the string value
	}

	onMount(() => {
		const maxBetsToShow = window.innerWidth > 480 ? 5 : 4;

		$pastBets.slice(0, maxBetsToShow).forEach((bet, index) => {
			if (bet.id) {
				displayedBets.push({
					...bet,
					index: index
				});
			}
		});
	});
</script>

<div bind:this={gameContainer} class="game-container">
	<div class="dice-game-wrapper">
		<button
			class={`change-dice-variant-button ${
				mobile ? 'top-2 left-2 w-7 h-7' : 'top-6 left-6 w-12 h-12'
			}`}
			on:click={toggleDiceIcon}
		>
			{#if isDiceWheelIconDisplayed}
				<img src={DiceWheelIcon} alt="Dice Wheel Icon" class="dice-icon-image" />
			{:else}
				<img src={DiceIcon} alt="Dice Icon" class="dice-icon-image" />
			{/if}
		</button>

		<div class="past-bets-wrapper">
			{#each $pastBets as pastBet (pastBet.id)}
				<PastBetButton pastBet={pastBet.numberRolled} win={pastBet.win} id={pastBet.id} />
			{/each}
		</div>

		<!-- DICE CONTENT -->
		<div class="dice-content">
			{#if isDiceIconDisplayed}
				<DiceSlider {disabled} {value} />
			{:else}
				<DiceWheel />
			{/if}
		</div>

		<!-- BOTTOM DICE FOOTER -->
		<div class="dice-footer">
			<label class="input-label" for="">
				<Tooltip />
				<span class="input-wrapper">
					<span class="input-content">
						<input
							disabled={$gameInProgress || $autoBetInProgress}
							class="game-input"
							type="number"
							min={MIN_PAYOUT.toString()}
							bind:value={$cashout}
						/>
						<div class="input-content-img">
							<CloseIconX width="10px" height="10px" stroke="#7b89c5" />
						</div>
					</span>
				</span>
				<span class="label-text">PAYOUT</span>
			</label>

			<label class="input-label" for="">
				<Tooltip />
				<span class="input-wrapper">
					<span class="input-content">
						<input class="game-input" type="button" value={rollOver} style="overflow: hidden;" />
						<div class="input-content-img">
							<RefreshIcon width="12px" height="12px" fill="#7b89c5" />
						</div>
					</span>
				</span>
				<span class="label-text">ROLL OVER</span>
			</label>

			<label class="input-label">
				<Tooltip />
				<span class="input-wrapper">
					<span class="input-content">
						<input
							class="game-input"
							type="number"
							bind:value={$winChance}
							on:input={handleWinChanceChange}
						/>
						<div class="input-content-img">
							<PercentIcon width="12px" height="12px" fill="#7b89c5" />
						</div>
					</span>
				</span>
				<span class="label-text">WIN CHANCE</span>
			</label>
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
		@apply w-full relative h-8 flex flex-row-reverse overflow-hidden z-[9] gap-x-2;
	}

	.dice-content {
		@apply flex justify-center items-center flex-grow w-full pb-4 pt-5 min-h-[390px];
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
		@apply font-normal text-lg overflow-scroll bg-deepBlue text-white rounded border border-gray-700 py-2 px-3 pr-7 transition-all duration-200 ease-out outline-none w-80;
		/* Add hover, focus, active, and disabled states later */
		/* Add responsive font size later */
	}

	/* Footer inputs */
	.dice-footer {
		@apply relative grid w-full grid-cols-3 gap-2 p-4;
	}

	.dice-footer input[type='button'] {
		@apply cursor-pointer text-left;
	}

	.input-label {
		@apply inline-flex items-start flex-col-reverse touch-manipulation;
	}

	.input-wrapper {
		@apply w-full flex flex-shrink-0;
	}

	.input-content {
		@apply relative flex-grow w-full flex;
	}
	.input-content-img {
		@apply absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-[#B1BAD3] cursor-text right-[20%] overflow-hidden;
	}

	.game-input {
		@apply font-normal text-[0.8rem] overflow-scroll bg-deepBlue text-white rounded border border-gray-700 py-2 px-3 pr-7 transition-all duration-200 ease-out outline-none;
	}

	.game-input:hover {
		@apply border border-solid border-blue-500 transition-colors duration-200 ease-out;
	}

	.game-input:focus {
		@apply border border-solid border-blue-700 transition-colors duration-200 ease-out;
	}

	.game-input:active {
		@apply border border-solid border-blue-500 transition-colors duration-200 ease-out;
	}

	.game-input:disabled {
		@apply cursor-not-allowed;
	}
	.label-text {
		@apply inline-flex items-center font-bold text-[0.6rem] leading-6 tracking-widest text-lightGray mb-1 transition-all duration-200 ease-out;
	}

	@media (max-width: 1030px) {
		.game-input {
			@apply text-base;
		}
	}
</style>
