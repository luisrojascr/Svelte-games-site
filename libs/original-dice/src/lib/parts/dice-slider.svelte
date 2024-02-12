<script lang="ts">
	import { isSound } from '$lib/parts/store/store.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { DiceRollConditionEnum } from '../utils/cc.js';
	import { round } from '../utils/helper.js';

	import DiceShapeIcon from '$lib/assets/images/DiceShapeIcon.svelte';
	import diceSelectorSound from '$lib/assets/sounds/selector-move.mp3';

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
		duration: 100,
		easing: cubicOut
	});

	type Func = (...args: any[]) => void;

	function debounce(func: Func, wait: number): Func {
		let timeout: number | null = null;

		return function (...args: any[]): void {
			const later = () => {
				timeout = null;
				func(...args);
			};

			if (timeout !== null) {
				clearTimeout(timeout);
			}
			timeout = window.setTimeout(later, wait);
		};
	}

	const playSelectorSound = (): void => {
		const sound = new Audio(diceSelectorSound);
		sound.play();
	};

	const debouncedPlaySelectorSound = debounce(playSelectorSound, 2);

	// Reactively update the tweened value when numberRolled changes
	$: diceTween.set($numberRolled - 5);

	// Start the animation when numberRolled changes
	$: {
		if ($numberRolled) {
			scale.set(1);
			opacity.set(1);

			setTimeout(() => {
				scale.set(1.2);
			}, 500);

			setTimeout(() => {
				scale.set(1.2);
				setTimeout(() => {
					scale.set(1);
				}, 350);
			}, 350);

			setTimeout(() => {
				opacity.set(0);
			}, 3000);
		}
	}

	const tweenedNumberRolled = tweened(0, { duration: 2800, easing: cubicOut });

	function handleRollOverUnderChange(event: Event) {
		if ($isSound) {
			debouncedPlaySelectorSound();
		}
		const input = event.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		rollOverUnder.set(newValue.toFixed(2));
		dispatch('sliderchange', newValue);

		if ($isRollOverOrUnder === DiceRollConditionEnum.Over) {
			$winChance = (100 - newValue).toFixed(2);
			$cashout = round(99 / (100 - newValue), 4).toString();
		} else {
			$winChance = newValue.toFixed(2);
			$cashout = round(99 / newValue, 4).toString();
		}

		winChance.set($winChance);
		cashout.set($cashout);
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
					<span class="result">{$numberRolled}</span>
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
			on:input={handleRollOverUnderChange}
			disabled={$gameInProgress || $autoBetInProgress}
		/>
	</div>
</div>

<style lang="postcss">
	.slider-content {
		@apply relative h-6;
	}

	/* Webkit browsers */
	.slider-content input[type='range']::-webkit-slider-thumb {
		@apply appearance-none relative w-[40px] h-[40px] rounded-[5.6px] bg-[#ffffff] bg-no-repeat cursor-grab;
		pointer-events: all;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-size: 100%;
	}

	.slider-content input[type='range']:active::-webkit-slider-thumb {
		@apply cursor-grabbing;
	}

	/* Mozilla Firefox */
	.slider-content input[type='range']::-moz-range-thumb {
		@apply appearance-none relative w-[40px] h-[40px] rounded-[5.6px] bg-[#ffffff] bg-no-repeat cursor-grab;
		pointer-events: all;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-size: 100%;
	}

	.slider-content input[type='range']:active::-moz-range-thumb {
		@apply cursor-grabbing;
	}

	/* Microsoft browsers */
	.slider-content input[type='range']::-ms-thumb {
		@apply appearance-none relative w-[40px] h-[40px] rounded-[5.6px] bg-[#ffffff] bg-no-repeat cursor-grab;
		pointer-events: all;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-image: url('../assets/images/ThumbArrows.svg');
		background-position: 50% 50%;
		background-size: 100%;
	}

	.slider-content input[type='range']:active::-ms-thumb {
		@apply cursor-grabbing;
	}

	.input-slider {
		@apply w-full text-sm absolute z-10 top-0 h-[24px] outline-none pointer-events-none cursor-pointer touch-manipulation;
		-webkit-overflow-scrolling: touch;
		-webkit-appearance: none;
		background: rgba(0, 0, 0, 0);
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
		@apply absolute text-center transform -translate-x-1/2 -translate-y-1/2;
	}

	.breakpoint-value {
		@apply absolute flex left-1/2 bottom-0 text-white text-center text-xs font-black leading-[2] tracking-[1px] transform -translate-x-1/2 -translate-y-0;
	}

	.breakpoint-value::after {
		@apply absolute bottom-0 left-1/2 border-solid content-[''] transform -translate-x-1/2 -translate-y-0;
		border-color: transparent transparent #111a41;
		border-width: 0 8px 6px;
	}

	.breakpoint-value span {
		@apply w-[4ch] absolute left-1/2 bottom-full;
		transform: translate(-45%, -20%);
	}

	/* Range Slider */
	.range-slider-wrapper {
		@apply pointer-events-none h-6 absolute top-0 left-0 bottom-0 right-0 rounded-[100px] overflow-hidden;
		transition: opacity 300ms ease;
	}

	.range-slider-lower,
	.range-slider-higher {
		@apply absolute h-6 top-0 rounded-[100px];
	}

	.range-slider-lower {
		@apply w-full right-0;
	}

	/* FOR DICE SHAPE */
	.dice-shape-wrapper {
		@apply absolute flex bottom-1/2 left-0 right-0 z-10 pointer-events-none will-change-transform select-none;
		transition: transform 400ms ease 0s;
	}

	.dice-wrapper {
		@apply relative;
		transform-origin: center bottom;
		transition: all 0.3s ease;
	}

	.result {
		@apply absolute text-sm font-black text-white w-max top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
		transition: all 100ms ease;
	}
</style>
