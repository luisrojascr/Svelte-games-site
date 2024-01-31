<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { DiceRollConditionEnum } from '../utils/cc.js';
	import { round } from '../utils/helper.js';

	import DiceShapeIcon from '$lib/assets/images/DiceShapeIcon.svelte';

	import {
		autoBetInProgress,
		cashout,
		gameInProgress,
		isRollOverOrUnder,
		numberRolled,
		rollOverUnder,
		winChance
	} from '$lib/parts/store/store.js';

	export let disabled: boolean;
	export let value: number = 50;

	let resize = false;

	const dispatch = createEventDispatcher();

	const scale = tweened(1, {
		duration: 100,
		easing: cubicInOut
	});

	const opacity = tweened(1, {
		duration: 100,
		easing: cubicInOut
	});

	const diceTween = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	// Reactively update the tweened value when numberRolled changes
	$: diceTween.set($numberRolled - 5);

	// Start the animation when numberRolled changes
	$: {
		if ($numberRolled) {
			scale.set(1.2); // Target value for scale
			opacity.set(1); // Target value for opacity
			// Reset the values after the animation
			setTimeout(() => {
				scale.set(1);
			}, 350);
			setTimeout(() => {
				opacity.set(0);
			}, 5000);
		}
	}

	const tweenedNumberRolled = tweened(0, { duration: 2800, easing: cubicOut });

	function handleRollOverUnderChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		rollOverUnder.set(newValue.toFixed(2));
		dispatch('sliderchange', newValue);

		// Perform the correct calculations for winChance and cashout
		let newWinChance;
		let newCashout;

		if ($isRollOverOrUnder === DiceRollConditionEnum.Over) {
			newWinChance = (100 - newValue).toFixed(2);
			newCashout = round(99 / (100 - newValue), 4).toString();
		} else {
			newWinChance = newValue.toFixed(2);
			newCashout = round(99 / newValue, 4).toString();
		}

		winChance.set(newWinChance);
		cashout.set(newCashout);
	}

	$: fillColor =
		($isRollOverOrUnder === DiceRollConditionEnum.Over &&
			$numberRolled > Number(round(parseFloat($rollOverUnder), 2))) ||
		($isRollOverOrUnder === DiceRollConditionEnum.Under &&
			$numberRolled < Number(round(parseFloat($rollOverUnder), 2)))
			? '#01d180'
			: '#ff2c55';

	onMount(() => {
		tweenedNumberRolled.set(parseFloat($rollOverUnder));
	});
</script>

<div class={`dice-slider-wrapper ${resize ? 'resize' : ''}`}>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 0%">
			<span class="breakpoint-value">
				<span>{0}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 25%">
			<span class="breakpoint-value">
				<span>{25}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 50%">
			<span class="breakpoint-value">
				<span>{50}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 75%">
			<span class="breakpoint-value">
				<span>{75}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 100%">
			<span class="breakpoint-value">
				<span>{100}</span>
			</span>
		</div>
	</div>
	<div class="slider-content">
		<div class="dice-shape-wrapper" style="transform: translate({$numberRolled - 5}%, -50%);">
			<div class="dice-wrapper" style="transform: scale({$scale}); opacity: {$opacity};">
				<div class="block select-none">
					<DiceShapeIcon fill={fillColor} width="50px" height="56px" />
				</div>
				<div class="">
					<span class="result">0</span>
				</div>
			</div>
		</div>

		<div class="range-slider-wrapper">
			<div class="range-slider-wrapper">
				<div
					class="range-slider-lower"
					style:background-color={$isRollOverOrUnder === DiceRollConditionEnum.Over
						? '#01d180'
						: '#ff2c55'}
				/>
				<div
					class="range-slider-higher"
					style:width="{$rollOverUnder}%"
					style:background-color={$isRollOverOrUnder === DiceRollConditionEnum.Under
						? '#01d180'
						: '#ff2c55'}
				/>
			</div>
		</div>
		<input
			class="input-slider"
			type="range"
			min="2"
			max="98"
			bind:value={$rollOverUnder}
			on:change={handleRollOverUnderChange}
			disabled={$gameInProgress || $autoBetInProgress}
		/>
	</div>
</div>

<style lang="postcss">
	.slider-content {
		position: relative;
		height: 24px;
	}

	/* Webkit browsers */
	.slider-content input[type='range']::-webkit-slider-thumb {
		appearance: none;
		position: relative;
		pointer-events: all;
		width: 40px;
		height: 40px;
		border-radius: 5.6px;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-color: #ffffff;
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: 100%;
		cursor: grab;
	}

	.slider-content input[type='range']:active::-webkit-slider-thumb {
		cursor: grabbing;
	}

	/* Mozilla Firefox */
	.slider-content input[type='range']::-moz-range-thumb {
		appearance: none;
		position: relative;
		pointer-events: all;
		width: 40px;
		height: 40px;
		border-radius: 5.6px;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-color: #ffffff;
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: cover;
		cursor: grab;
	}

	.slider-content input[type='range']:active::-moz-range-thumb {
		cursor: grabbing;
	}

	/* Microsoft browsers */
	.slider-content input[type='range']::-ms-thumb {
		appearance: none;
		position: relative;
		pointer-events: all;
		width: 40px;
		height: 40px;
		border-radius: 5.6px;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-color: #ffffff;
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: cover;
		cursor: grab;
	}

	.slider-content input[type='range']:active::-ms-thumb {
		cursor: grabbing;
	}

	.input-slider {
		-webkit-overflow-scrolling: touch;
		font-size: 14px;
		-webkit-appearance: none;
		touch-action: manipulation;
		width: 100%;
		position: absolute;
		z-index: 10;
		top: 0;
		height: 24px;
		outline: none;
		pointer-events: none;
		cursor: pointer;
		background: rgba(0, 0, 0, 0);

		/* &:disabled {
			cursor: not-allowed !important;
		} */
	}

	/* @media (max-width: 1030px) {
		.input-slider {
			font-size: 16px;
		}
	} */

	.dice-slider-wrapper {
		@apply relative w-full max-w-[633px] text-left rounded-[31px] p-6 my-12;
		border: 1px solid #313d6b;
		background-color: #111a41;
		/* Conditional margin */
	}

	/* Applying conditional margin based on $resize */
	.dice-slider-wrapper:resize {
		@apply my-20 mx-0;
	}

	.dice-slider-wrapper:not(:resize) {
		@apply my-16 mx-0;
	}

	.breakpoints-wrapper {
		@apply absolute bottom-full left-[calc(1.5em+15px)] right-[calc(1.5em+15px)];
	}

	.breakpoint-wrapper {
		@apply absolute text-center;
		transform: translate(-50%, 0);
	}

	.breakpoint-value {
		@apply absolute flex left-1/2 bottom-0 text-white;
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: 900;
		line-height: 2;
		letter-spacing: 1px;
		text-align: center;
		/* Custom transform for the parent element */
		transform: translate(-50%, 0);
	}

	.breakpoint-value::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		border-color: transparent transparent #111a41;
		border-style: solid;
		border-width: 0 8px 6px;
	}

	.breakpoint-value span {
		width: 4ch;
		position: absolute;
		left: 50%;
		bottom: 100%;
		transform: translate(-45%, -20%);
	}

	/* Range Slider */
	.range-slider-wrapper {
		pointer-events: none;
		height: 24px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 100px;
		transition: opacity 300ms ease;
		overflow: hidden;
	}

	.range-slider-lower,
	.range-slider-higher {
		position: absolute;
		height: 24px;
		top: 0;
		border-radius: 100px;
	}

	.range-slider-lower {
		width: 100%;
		right: 0;
	}

	/* .range-slider-higher {
		left: 0;
	} */

	/* FOR DICE SHAPE */
	.dice-shape-wrapper {
		position: absolute;
		display: flex;
		bottom: 50%;
		left: 0px;
		right: 0px;
		z-index: 5;
		pointer-events: none;
		will-change: transform;
		transition: transform 400ms ease 0s;
		user-select: none;
	}

	.dice-wrapper {
		position: relative;
		transform-origin: center bottom;
		transition: all 0.3s ease;
	}

	.result {
		font-family: 'Open Sans', serif;
		font-size: 14px;
		font-weight: 900;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		color: #ffffff;
		position: absolute;
		width: max-content;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: all 100ms ease;
	}
</style>
