<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { numberOnly } from '../../../utils/helper.js';

	export let type: string = 'text';
	export let value: string | number = '';
	export let integerOnly: boolean = false;
	export let readOnly: boolean = false;
	export let buttonsPosition: 'start' | 'end' = 'end';
	export let disabled: boolean = false;
	export let min: number | string | undefined = undefined;
	export let max: number | string | undefined = undefined;
	export let step: any = undefined;
	export let style: string = '';
	export let paddingRight: string = '36px';
	export let dataTestId: string = '';
	// export let inputIcon: any;
	export let inputButtons: boolean;

	const dispatch = createEventDispatcher();

	let isActive: boolean = false;

	function handleBlur(): void {
		dispatch('blur');
		isActive = false;
	}

	function handleFocus(): void {
		isActive = true;
	}

	function handleChange(event: Event): void {
		const inputEvent = event as InputEvent;
		if (integerOnly) {
			numberOnly(inputEvent);
		}
		dispatch('change', { value: (event.target as HTMLInputElement).value });
	}

	$: computedClass = `input-label ${disabled ? 'opacity-80' : 'opacity-100'}`;

	onMount(() => {
		// Any onMount logic here later
	});
</script>

<div class={computedClass} {style}>
	<div
		class={`input-wrapper ${isActive ? 'active' : ''} ${readOnly ? 'readonly' : ''} ${buttonsPosition}`}
	>
		<label class="input-inner-label" for="">
			<span class="input-inner-wrapper">
				<span class="inner-content">
					<input
						class="main-input"
						{min}
						{max}
						{step}
						{disabled}
						readonly={readOnly}
						{type}
						inputmode={type === 'number' ? 'decimal' : undefined}
						{value}
						data-testid={dataTestId}
						on:change={handleChange}
						on:focus={handleFocus}
						on:blur={handleBlur}
						style={`padding-right: ${paddingRight};`}
					/>
					<!-- {inputIcon} -->
				</span>
			</span>
		</label>
		{#if inputButtons}
			<div class="buttons-wrapper">
				<button>{inputButtons}</button>
			</div>
		{/if}
	</div>
	<span class="label-content"></span>
</div>

<style lang="postcss">
	.input-label {
		display: inline-flex;
		align-items: center;
		flex-direction: column-reverse;
		touch-action: manipulation;
		width: 100%;
	}

	.input-wrapper {
		width: 100%;
		display: inline-flex;
		flex-direction: row;
		border-radius: 4px;
		background: #111a41;
		border: 1px solid #2c3763;
		transition: border 0.25s ease-in;
	}
	.input-wrapper:hover {
		border: solid 1px #8b90a5;
		transition: border 0.85s ease-in;
	}

	.input-inner-label {
		width: 100%;
		display: inline-flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.input-inner-wrapper {
		width: 100%;
		display: flex;
		flex-shrink: 0;
	}

	.inner-content {
		position: relative;
		flex-grow: 1;
		width: 100%;
		display: flex;
	}
	.inner-content svg,
	.inner-content img {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		pointer-events: none;
		color: rgb(177, 186, 211);
		cursor: text;
		right: 0.75em;
		height: 16px;
		width: 16px;
	}

	.main-input {
		-webkit-appearance: none;
		width: 100%;
		box-shadow: none;
		cursor: text;
		-webkit-appearance: none;
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 6px;
		padding-right: 36px;
		background-color: #111a41;
		border: none;
		transition: all 200ms ease-out 0s;
		outline: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		-webkit-overflow-scrolling: touch;

		font-size: 14px;
		font-family: 'Open Sans', serif;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 2;
		letter-spacing: normal;
		color: #fff;
	}

	.main-input:disabled {
		color: #7483c5;
		cursor: not-allowed;
	}

	@media (max-width: 1030px) {
		.main-input {
			font-size: 15px;
			padding-right: var(--paddingRight);
		}
	}

	.label-content {
		display: inline-flex;
		align-items: center;
		font-family: 'Open Sans', serif;
		font-size: 10px;
		font-weight: bold;
		line-height: 1.6;
		letter-spacing: 0.6px;
		color: #ffffff;
		opacity: 0.7;
		margin: 0 0 0.25em;
		transition: all 200ms ease-out;
		margin-bottom: 5px;
	}

	.buttons-wrapper {
		display: inline-flex;
		flex-shrink: 0;
	}
	.buttons-wrapper button {
		margin-right: 4px;
	}
	.buttons-wrapper button:last-child {
		font-size: 12px !important;
	}
</style>
