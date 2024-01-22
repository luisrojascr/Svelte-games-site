<script lang="ts">
	import { onMount } from 'svelte';
	import DiceWheelBorder from '../assets/images/DiceWheelBorder.svelte';
	import DiceWheelCircleV2 from '../assets/images/DiceWheelCircleV2.svelte';

	import { DiceRollConditionEnum } from '../utils/cc.js';
	import { round } from '../utils/helper.js';

	let rollOverUnder: number;
	let isRollOverOrUnder: DiceRollConditionEnum = DiceRollConditionEnum.Over;

	let small = false;
	let isActive: boolean = false;
	let currentAngle: number = 0;
	let startAngle: number | null = null;
	let rotateBoxTo = 0;
	let winChance: string;
	let cashout = '';

	let isSound = true;

	function playSelectorSound() {
		// Sound play logic here later
	}

	function getNewProgress(newAngle: number): number {
		if (newAngle < 0) {
			return (Math.min(360 + newAngle, 352.8) / 360) * 100;
		}
		return (Math.max(newAngle, 7.2) / 360) * 100;
	}

	function getPositionFromCenterTouch(e: TouchEvent): { x: number; y: number } {
		return { x: 0, y: 0 };
	}

	function touchMoveHandler(e: TouchEvent) {
		if (isActive) {
			if (isSound) {
				playSelectorSound();
			}
			const fromBoxCenter = getPositionFromCenterTouch(e);
			const newAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);

			// Update the rotation
			rotateBoxTo = currentAngle + (newAngle - (startAngle || 0));

			// Calculate new values based on the angle
			const newProgress = getNewProgress(newAngle);
			const newUnderOver = parseFloat(round(newProgress, 2).toFixed(2));

			if (isRollOverOrUnder === DiceRollConditionEnum.Over) {
				winChance = round(100 - newProgress, 2).toFixed(2);
				cashout = round(99 / (100 - newProgress), 4).toFixed(4);
				rollOverUnder = newUnderOver;
			} else {
				rollOverUnder = newUnderOver;
				winChance = newProgress.toFixed(2);
				cashout = round(99 / newProgress, 4).toFixed(4);
			}
		}
	}
</script>

<div class="dice-wheel-wrapper">
	<div class={`number-limit ${small ? 'number-limit-small' : 'number-limit-large'}`}>
		<span>0</span>
	</div>
	<div class={`number-limit ${small ? 'number-limit-small' : 'number-limit-large'}`}>
		<span>20</span>
	</div>
	<div class={`number-limit ${small ? 'number-limit-small' : 'number-limit-large'}`}>
		<span>50</span>
	</div>
	<div class={`number-limit ${small ? 'number-limit-small' : 'number-limit-large'}`}>
		<span>75</span>
	</div>
	<div class={`number-limit ${small ? 'number-limit-small' : 'number-limit-large'}`}>
		<span>0</span>
	</div>
	<DiceWheelCircleV2
		stroke={10}
		progress={getNewProgress(rotateBoxTo)}
		frontColor={isRollOverOrUnder === DiceRollConditionEnum.Under ? '#01d180' : '#ff2c55'}
		backColor={isRollOverOrUnder === DiceRollConditionEnum.Under ? '#ff2c55' : '#01d180'}
	/>
	<DiceWheelBorder />
</div>

<style lang="postcss">
	.dice-wheel-wrapper {
		@apply relative w-full;
	}

	.dice-wheel-wrapper:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	.dice-holder {
		@apply absolute top-1/2 left-1/2 w-1/5 h-1/5;
		transform: translate(-50%, -50%);
	}

	.dice-shape-wrapper {
		@apply w-full h-full;
	}

	.result {
		@apply absolute w-full text-center text-white font-bold;
		font-family: 'Open Sans', serif;
		font-size: 19.2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-property: transform, opacity;
		transition-duration: 300ms;
	}

	.position-handler {
		@apply absolute;
		top: calc(10% + 18px);
		left: calc(10% + 18px);
		width: calc(80% - 36px);
		height: calc(80% - 36px);
	}

	.thumb-button-wrapper {
		@apply absolute z-10;
		top: 10%;
		left: 10%;
		@apply w-4/5 h-4/5;
	}

	.thumb-button {
		@apply absolute cursor-pointer flex justify-center items-center rounded-sm;
		top: -5%;
		left: 50%;
		transform: translate(-50%, 0);
		width: 12%;
		height: 9%;
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 2px 0px;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		background-image: url('../assets/images/ThumbArrows.svg');
	}

	.thumb-button:disabled {
		@apply cursor-not-allowed;
	}

	.thumb-button:active {
		@apply cursor-grabbing;
	}

	.number-limit {
		@apply absolute inline-flex justify-center items-center text-white font-semibold rounded-lg bg-blue-900 border border-blue-800;
		font-family: 'Open Sans', serif;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.33;
		letter-spacing: normal;
		padding: 1px 5px;
		width: 4ch;
		flex-shrink: 0;
	}

	.number-limit-small {
		@apply text-xs;
	}

	.number-limit-large {
		@apply text-lg;
	}

	.number-limit span {
		white-space: nowrap;
	}
</style>
