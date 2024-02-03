<script lang="ts">
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

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

	import { numberOnly, round } from '../utils/helper.js';

	import {
		autoBetInProgress,
		cashout,
		gameInProgress,
		handleOnePlay,
		isRollOverOrUnder,
		numberRolled,
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

	function handleSliderChange(event: CustomEvent<number>) {
		const newValue = event.detail;
		const newWinChanceValue: any = round(99 / newValue, 4);
		winChance.set(newWinChanceValue.toString());

		let newRollOverUnderValue =
			get(isRollOverOrUnder) === DiceRollConditionEnum.Over
				? (100 - newWinChanceValue).toFixed(2)
				: newValue.toFixed(2);

		rollOverUnder.set(newRollOverUnderValue);
		cashout.set(newWinChanceValue.toString()); // Update cashout store
		localCashout = newWinChanceValue.toString(); // Update local variable for input binding
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
				<DiceSlider {disabled} {value} on:sliderchange={handleSliderChange} />
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
							bind:value={localCashout}
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
							bind:value={localWinChance}
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
		@apply font-normal text-lg overflow-scroll bg-deepBlue text-white rounded border border-gray-700 py-2 px-3 pr-7 transition-all duration-200 ease-out outline-none;
		/* Add hover, focus, active, and disabled states later */
		/* Add responsive font size later */
	}

	/* Footer inputs */
	.dice-footer {
		color: rgb(213, 220, 235);
		position: relative;
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
		padding: 1rem;
	}

	.dice-footer input[type='button'] {
		cursor: pointer;
		text-align: left;
	}

	.input-label {
		display: inline-flex;
		-webkit-box-align: center;
		flex-direction: column-reverse;
		align-items: flex-start;
		touch-action: manipulation;
	}

	.input-wrapper {
		width: 100%;
		display: flex;
		flex-shrink: 0;
	}

	.input-content {
		position: relative;
		-webkit-box-flex: 1;
		flex-grow: 1;
		width: 100%;
		display: flex;
	}

	.input-content-img {
		position: absolute;
		top: 50%;
		transform: translate(0px, -50%);
		pointer-events: none;
		color: rgb(177, 186, 211);
		cursor: text;
		right: 0.75em;
		overflow: hidden;
	}

	.game-input {
		font-family: 'Open Sans', serif;
		font-size: 14px;
		-webkit-overflow-scrolling: touch;

		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 2;
		letter-spacing: normal;
		color: #ffffff;
		-webkit-appearance: none;
		width: 100%;
		cursor: text;
		-webkit-appearance: none;
		padding: 8px 12px;
		padding-right: 28px;
		border-radius: 4px;
		border: solid 1px #404c7d;
		background-color: #111a41;
		transition: all 200ms ease-out 0s;
		outline: none;
	}

	.game-input:hover {
		border: solid 1px #4769fc;
		transition: border 200ms ease-out 0;
	}

	.game-input:focus {
		border: solid 1px #404c7d;
		transition: border 200ms ease-out 0;
	}

	.game-input:active {
		border: solid 1px #4769fc;
		transition: border 200ms ease-out 0;
	}

	.game-input:disabled {
		cursor: not-allowed;
	}

	.label-text {
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		font-size: 10px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: 0.6px;
		color: #e6e7ed;
		margin: 0px 0px 0.25em;
		transition: all 200ms ease-out 0s;
	}

	@media (max-width: 1030px) {
		.game-input {
			font-size: 16px;
		}
	}
</style>
