<script lang="ts">
	import DiceShape from '$lib/assets/images/DiceResultWheel.svelte';
	import DiceWheelArrow from '$lib/assets/images/DiceWheelArrow.svelte';
	import DiceWheelBorder from '$lib/assets/images/DiceWheelBorder.svelte';
	import DiceWheelCircleV2 from '$lib/assets/images/DiceWheelCircleV2.svelte';
	import { cashout, isRollOverOrUnder } from '$lib/parts/store/store.js';
	import { DiceRollConditionEnum } from '$lib/utils/cc.js';
	import { onMount } from 'svelte';
	import { round } from '../utils/helper.js';

	let parentWidth: number;
	let resize = false;
	let isMobile = false;
	let small = false;

	let isActive: boolean = false;
	let currentAngle: number = 180;
	let startAngle: number;
	let rotateBoxTo = 180;
	let angle = 0;
	let boxCenterPoint = { x: 0, y: 0 };
	let gameInProgress = false;
	let isSound = true;
	let thumbButtonWrapper: HTMLElement | null = null;
	let numberRolled: number;
	let winChance = '0.00';
	let underOver = '0.00';

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
		const touch = e.touches[0];
		return {
			x: touch.clientX - boxCenterPoint.x,
			y: -(touch.clientY - boxCenterPoint.y)
		};
	}

	function getPositionFromCenter(event: MouseEvent) {
		return {
			x: event.clientX - boxCenterPoint.x,
			y: -(event.clientY - boxCenterPoint.y)
		};
	}

	function mouseDownHandler(event: MouseEvent) {
		event.stopPropagation();
		const fromBoxCenter = getPositionFromCenter(event);
		startAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
		isActive = true;
	}

	function mouseUpHandler(event: MouseEvent) {
		event.stopPropagation();
		if (isActive) {
			currentAngle += angle - startAngle;
			isActive = false;
		}
	}

	function mouseMoveHandler(event: MouseEvent) {
		if (isActive) {
			const fromBoxCenter = getPositionFromCenter(event);
			const newAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
			rotateBoxTo = currentAngle + (newAngle - (startAngle || 0));
			angle = newAngle;
			const newUnderOverValue = round(getNewProgress(newAngle), 2);
			if ($isRollOverOrUnder === DiceRollConditionEnum.Over) {
				winChance = round(100 - getNewProgress(newAngle), 2).toFixed(2);
				$cashout = round(99 / (100 - getNewProgress(newAngle)), 4).toFixed(4);
				underOver = newUnderOverValue.toFixed(2);
			} else {
				underOver = newUnderOverValue.toFixed(2);
				winChance = getNewProgress(newAngle).toFixed(2);
				$cashout = round(99 / getNewProgress(newAngle), 4).toFixed(4);
			}
		}
	}

	function touchMoveHandler(e: TouchEvent) {
		if (isActive) {
			if (isSound) {
				playSelectorSound();
			}
			const fromBoxCenter = getPositionFromCenterTouch(e);
			const newAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
			rotateBoxTo = currentAngle + (newAngle - startAngle);
			angle = newAngle;
			const newUnderOverValue = round(getNewProgress(newAngle), 2).toFixed(2);
			if ($isRollOverOrUnder === DiceRollConditionEnum.Over) {
				winChance = round(100 - getNewProgress(newAngle), 2).toFixed(2);
				$cashout = round(99 / (100 - getNewProgress(newAngle)), 4).toFixed(4);
				underOver = newUnderOverValue;
			} else {
				underOver = newUnderOverValue;
				winChance = getNewProgress(newAngle).toFixed(2);
				$cashout = round(99 / getNewProgress(newAngle), 4).toFixed(4);
			}
		}
	}

	function touchStartHandler(event: TouchEvent) {
		event.stopPropagation();
		const fromBoxCenter = getPositionFromCenterTouch(event);
		const newAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
		// rotateBoxTo = currentAngle + (newAngle - startAngle);
		angle = newAngle;
		isActive = true;
	}

	function touchEndHandler(event: TouchEvent) {
		event.stopPropagation();
		if (isActive) {
			const newCurrentAngle = currentAngle + (angle - startAngle);
			currentAngle = newCurrentAngle;
			isActive = false;
		}
	}

	function getWheelWidth(): string {
		if (parentWidth <= 410) {
			return '240px';
		}
		if (parentWidth <= 510) {
			return '380px';
		}
		return '390px';
	}

	function updateBoxCenterPoint() {
		if (thumbButtonWrapper) {
			const rect = thumbButtonWrapper.getBoundingClientRect();
			boxCenterPoint = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			};
		}
	}

	$: if (isActive && thumbButtonWrapper) {
		const rotateDeg = rotateBoxTo % 360;
		thumbButtonWrapper.style.transform = `rotate(${rotateDeg}deg)`;
	}

	$: wheelWidth = getWheelWidth();

	onMount(() => {
		parentWidth = document.body.clientWidth;

		window.addEventListener('mouseup', mouseUpHandler);
		window.addEventListener('mousedown', mouseDownHandler);
		window.addEventListener('mousemove', mouseMoveHandler);
		window.addEventListener('touchstart', touchStartHandler);
		window.addEventListener('touchend', touchEndHandler);
		window.addEventListener('touchmove', touchMoveHandler);

		thumbButtonWrapper = document.querySelector('.thumb-button-wrapper') as HTMLElement;
		updateBoxCenterPoint();

		return () => {
			// Cleanup when the component is unmounted
			window.removeEventListener('mouseup', mouseUpHandler);
			window.removeEventListener('mousedown', mouseDownHandler);
			window.removeEventListener('mousemove', mouseMoveHandler);
			window.removeEventListener('touchstart', touchStartHandler);
			window.removeEventListener('touchend', touchEndHandler);
			window.removeEventListener('touchmove', touchMoveHandler);
		};
	});
</script>

<div class="dice-wheel-wrapper" style="max-width: {wheelWidth};">
	<div
		class={`number-limit ${resize ? 'number-limit-small' : 'number-limit-large'}`}
		style="left: 50%; bottom: {resize ? '98%' : '100%'};"
	>
		<span>0</span>
	</div>
	<div
		class={`number-limit ${resize ? 'number-limit-small' : 'number-limit-large'}`}
		style="top: {resize ? '44.5%' : '47.5%'}; left: {resize ? '98%' : '102%'};"
	>
		<span>25</span>
	</div>
	<div
		class={`number-limit ${resize ? 'number-limit-small' : 'number-limit-large'}`}
		style="top: {resize ? '98%' : '100%'}; left: 50%; transform: translateX(-50%);"
	>
		<span>50</span>
	</div>
	<div
		class={`number-limit ${resize ? 'number-limit-small' : 'number-limit-large'}`}
		style="top: {resize ? '44.5%' : '47.5%'}; right: {resize ? '98%' : '102%'};"
	>
		<span>75</span>
	</div>
	<div
		class={`number-limit ${resize ? 'number-limit-small' : 'number-limit-large'}`}
		style="left: 50%; bottom: {resize ? '98%' : '100%'}; transform: translateX(-100%);"
	>
		<span>100</span>
	</div>
	<DiceWheelCircleV2
		stroke={10}
		progress={getNewProgress(rotateBoxTo)}
		frontColor={$isRollOverOrUnder === DiceRollConditionEnum.Under ? '#01d180' : '#ff2c55'}
		backColor={$isRollOverOrUnder === DiceRollConditionEnum.Under ? '#ff2c55' : '#01d180'}
	/>
	<DiceWheelBorder />
	<DiceWheelArrow />
	<div class="dice-holder">
		<div class="dice-shape-wrapper">
			<span class="dice-result">{numberRolled}</span>
			<DiceShape width="100%" height="100%" stroke="currentColor" />
		</div>
	</div>
	<div class="position-handler"></div>
	<div
		class="thumb-button-wrapper"
		bind:this={thumbButtonWrapper}
		style={`transform: rotate(${rotateBoxTo}deg)`}
	>
		<button
			class="thumb-button"
			on:mousedown={mouseDownHandler}
			on:mouseup={mouseUpHandler}
			on:mousemove={mouseMoveHandler}
			on:touchstart={touchStartHandler}
			on:touchend={touchEndHandler}
			on:touchmove={touchMoveHandler}
			disabled={gameInProgress}
		></button>
	</div>
	<div class="filler"></div>
	<div
		class="leftFiller"
		style:background-color={$isRollOverOrUnder === DiceRollConditionEnum.Under
			? '#01d180'
			: '#ff2c55'}
	></div>
	<div
		class="rightFiller"
		style:background-color={$isRollOverOrUnder === DiceRollConditionEnum.Under
			? '#ff2c55'
			: '#01d180'}
	></div>
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
	.dice-holder {
		transform: 'translate(-50%, -50%)';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20%;
		height: 20%;
	}

	.dice-result {
		font-family: 'Open Sans', serif;
		font-size: 19.2px;
		font-weight: 900;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		color: #ffffff;
		position: absolute;
		width: 10ch;
		top: 50%;
		left: 50%;
		text-align: center;
		font-weight: 600;
		transition-property: transform, opacity;
		transition-duration: 300ms;
		transform: translate(-50%, -50%);
	}

	.position-handler {
		@apply absolute;
		top: calc(10% + 18px);
		left: calc(10% + 18px);
		width: calc(80% - 36px);
		height: calc(80% - 36px);
	}

	.thumb-button-wrapper {
		z-index: 15;
		position: absolute;
		top: 10%;
		left: 10%;
		width: 80%;
		height: 80%;
	}

	.thumb-button {
		position: absolute;
		top: -5%;
		left: 50%;
		transform: translate(-50%, 0px);
		width: 12%;
		height: 9%;
		cursor: pointer;

		font-weight: 600;
		font-size: inherit;
		touch-action: manipulation;
		position: relative;
		display: inline-flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 2px 0px;
		border-radius: 0.25rem;

		background-image: url('../assets/images/ThumbArrows.svg');

		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
	}

	.thumb-button:disabled {
		@apply cursor-not-allowed;
	}

	.thumb-button:active {
		@apply cursor-grabbing;
	}

	.filler {
		background-color: #334284;
		position: absolute;
		width: 5%;
		height: 5%;
		left: 47.48%;
		top: 7%;
		z-index: 9;
	}

	.leftFiller {
		position: absolute;
		width: 2.329%;
		height: 2.329%;
		left: 51.3%;
		top: 8.197%;
		z-index: 9;
		border-radius: 50%;
	}

	.rightFiller {
		position: absolute;
		width: 2.329%;
		height: 2.329%;
		left: 46.3%;
		top: 8.19%;
		z-index: 9;
		border-radius: 50%;
	}

	.number-limit {
		position: absolute;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-family: 'Open Sans', serif;
		font-weight: 700;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.33;
		letter-spacing: normal;
		text-align: center;
		color: #ffffff;
		border-radius: 4.8px;
		border: solid 1.2px #2a335b;
		background-color: #111a41;
		padding: 1px 5px;
		width: 4ch;
		flex-shrink: 0;
	}

	.number-limit-small {
		font-size: 10px;
	}

	.number-limit-large {
		font-size: 14.4px;
	}

	.number-limit span {
		white-space: nowrap;
	}
</style>
