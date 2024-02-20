<script lang="ts">
	import DiceShape from '$lib/assets/images/DiceResultWheel.svelte';
	import DiceWheelArrow from '$lib/assets/images/DiceWheelArrow.svelte';
	import DiceWheelBorder from '$lib/assets/images/DiceWheelBorder.svelte';
	import DiceWheelCircleV2 from '$lib/assets/images/DiceWheelCircleV2.svelte';

	import { DiceRollConditionEnum } from '$lib/utils/cc.js';
	import { onMount } from 'svelte';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { round } from '../utils/helper.js';

	import diceSelectorSound from '$lib/assets/sounds/selector-move.mp3';
	import { spring } from 'svelte/motion';

	import {
		autoBetInProgress,
		cashout,
		gameInProgress,
		isRollOverOrUnder,
		isSound,
		numberRolled,
		rollOverUnder
	} from '$lib/parts/store/store.js';

	let parentWidth: number;
	let resize = false;

	let isActive: boolean = false;
	let currentAngle: number = 180;
	let startAngle: number;
	let rotateBoxTo = 180;
	let angle = 0;
	let boxCenterPoint = { x: 0, y: 0 };
	let thumbButtonWrapper: HTMLElement | null = null;

	let winChance = '0.00';
	let underOver = '0.00';

	let rotateArrowTo = 0;

	let rotation = spring(rotateArrowTo, {
		stiffness: 0.1,
		damping: 0.2
	});

	const scale = tweened(0, {
		duration: 100,
		easing: cubicInOut
	});

	const opacity = tweened(0, {
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

	const debouncedPlaySelectorSound = debounce(playSelectorSound, 0.5);

	// Reactively update the tweened value when numberRolled changes
	$: diceTween.set($numberRolled - 5);

	// Start the animation when numberRolled changes
	$: {
		if ($numberRolled) {
			scale.set(0.6);
			opacity.set(1);

			setTimeout(() => {
				scale.set(1);
				opacity.set(0.9);
			}, 50);

			setTimeout(() => {
				scale.set(1.2);
				setTimeout(() => {
					scale.set(1);
					opacity.set(1);
				}, 200);
			}, 50);
		}
	}

	$: fillColor =
		($isRollOverOrUnder === DiceRollConditionEnum.Over &&
			$numberRolled > Number(round(parseFloat($rollOverUnder), 2))) ||
		($isRollOverOrUnder === DiceRollConditionEnum.Under &&
			$numberRolled < Number(round(parseFloat($rollOverUnder), 2)))
			? '#01d180'
			: '#ff2c55';

	// Reactive statement to calculate new rotation based on numberRolled
	$: rotateArrowTo = 3.6 * $numberRolled;

	$: rotation.set(rotateArrowTo);

	const tweenedNumberRolled = tweened(0, { duration: 2800, easing: cubicOut });

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
		if ($isSound) {
			debouncedPlaySelectorSound();
		}
		return {
			x: event.clientX - boxCenterPoint.x,
			y: -(event.clientY - boxCenterPoint.y)
		};
	}

	function mouseDownHandler(event: MouseEvent) {
		//@ts-ignore
		if (!thumbButtonWrapper.contains(event.target)) {
			return;
		}

		event.stopPropagation();
		const fromBoxCenter = getPositionFromCenter(event);
		startAngle = 90 - Math.atan2(fromBoxCenter.y, fromBoxCenter.x) * (180 / Math.PI);
		isActive = true;

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
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
		updateBoxCenterPoint();

		// window.addEventListener('mouseup', mouseUpHandler);
		// window.addEventListener('mousedown', mouseDownHandler);
		window.addEventListener('mousemove', mouseMoveHandler);
		window.addEventListener('touchstart', touchStartHandler);
		window.addEventListener('touchend', touchEndHandler);
		window.addEventListener('touchmove', touchMoveHandler);

		tweenedNumberRolled.set(parseFloat($isRollOverOrUnder));

		thumbButtonWrapper = document.querySelector('.thumb-button-wrapper') as HTMLElement;

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
	<DiceWheelArrow style={`transform: rotate(${rotateArrowTo}deg);`} />
	<div class="dice-holder">
		<div class="dice-shape-wrapper" style="transform: scale({$scale}); opacity: {$opacity};">
			<span class="dice-result">{$numberRolled}</span>
			<DiceShape width="100%" height="100%" stroke={fillColor} />
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
			disabled={$gameInProgress || $autoBetInProgress}
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
		@apply content-[''] block pb-[100%];
	}

	.dice-holder {
		@apply absolute top-1/2 left-1/2 w-1/5 h-1/5 transform -translate-x-1/2 -translate-y-1/2;
	}

	.dice-shape-wrapper {
		@apply w-full h-full;
	}

	/* .result {
		@apply absolute w-full text-center text-white font-bold top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 transition-transform duration-300;
		font-family: 'Open Sans', serif;
		font-size: 19.2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-property: transform, opacity;
		transition-duration: 300ms;
	} */
	.dice-holder {
		@apply absolute top-1/2 left-1/2 w-1/5 h-1/5 transform -translate-x-1/2 -translate-y-1/2;
	}

	.dice-result {
		@apply w-[10ch] font-black text-[19.2px] text-white absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
		font-family: 'Open Sans', serif;
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
		@apply absolute z-20 top-[10%] left-[10%] w-4/5 h-4/5;
	}

	.thumb-button {
		@apply absolute top-[-5%] font-semibold left-1/2 w-[12%] h-[9%] cursor-pointer touch-manipulation inline-flex justify-center items-center rounded-[0.25em] bg-cover bg-center bg-no-repeat transform -translate-x-1/2 -translate-y-0;
		font-size: inherit;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 2px 0px;
		background-image: url('../assets/images/ThumbArrows.svg');
	}

	.thumb-button:disabled {
		@apply cursor-not-allowed;
	}

	.thumb-button:active {
		@apply cursor-grabbing;
	}

	.filler {
		@apply absolute w-[5%] h-[5%] left-[47.48%] top-[7%];
		background-color: #334284;
		z-index: 9;
	}

	.leftFiller {
		@apply absolute w-[2.329%] h-[2.329%] left-[51.3%] top-[8.197%] rounded-[50%];
		z-index: 9;
	}

	.rightFiller {
		@apply absolute w-[2.329%] h-[2.329%] left-[46.3%] top-[8.19%] rounded-[50%];
		z-index: 9;
	}

	.number-limit {
		@apply absolute font-bold text-white bg-[#111a41] leading-[1.33] inline-flex justify-center items-center text-center rounded-[4.8px] py-[1px] px-[5px] w-[4ch] flex-shrink-0;
		font-family: 'Open Sans', serif;
		font-stretch: normal;
		border: solid 1.2px #2a335b;
	}

	.number-limit-small {
		@apply text-[10px];
	}

	.number-limit-large {
		@apply text-[14.4px];
	}

	.number-limit span {
		@apply whitespace-nowrap;
	}
</style>
