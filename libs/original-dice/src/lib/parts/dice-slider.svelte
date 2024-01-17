<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean;
	export let value: number;

	let resize = false;

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		dispatch('rollOverUnderChange', event);
	}
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
		<input
			class="input-slider"
			type="range"
			min="2"
			max="98"
			{disabled}
			{value}
			on:input={handleChange}
			data-testid="dice-slider-input"
		/>
	</div>
</div>

<style lang="postcss">
	.slider-content {
		position: relative;
		height: 24px;
	}

	.slider-content input[type='range']::-webkit-slider-thumb,
	.slider-content input[type='range']::-moz-range-thumb,
	.slider-content input[type='range']::-ms-thumb,
	.slider-content input[type='range']::range-thumb {
		position: relative;
		pointer-events: all;
		width: 40px;
		height: 40px;
		border-radius: 5.6px;
		box-shadow:
			-6px 0 0 0 rgba(0, 0, 0, 0.16),
			6px 0 0 0 rgba(0, 0, 0, 0.16);
		background-color: #ffffff;
		background-image: url('/path/to/your/image/ThumbArrows.svg'); /* Adjust the path */
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: cover;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}

		&:disabled {
			cursor: not-allowed;
		}

		&:after {
			position: absolute;
			content: '';
			width: 5px;
			height: 5px;
			background: red;
		}
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

		&:disabled {
			cursor: not-allowed !important;
		}

		@media (max-width: 1030px) {
			font-size: 16px;
		}
	}

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
</style>
