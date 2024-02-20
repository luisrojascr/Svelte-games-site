<script lang="ts">
	import { betAmount } from '$lib/parts/store/store.js';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let type: string = 'text';
	export let valueStore: any;
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
	export let labelContent: string = '';
	export let placeholder: string = '0.00';
	export let allowUpdate: boolean = true;

	const dispatch = createEventDispatcher();

	let isActive: boolean = false;
	let inputValue = $valueStore;

	//@ts-ignore
	function handleInput(event) {
		const parsedValue = integerOnly ? parseInt(event.target.value) || 0 : event.target.value;

		// Directly set the inputValue to what user types
		inputValue = event.target.value;

		// Always update the store regardless of allowUpdate
		valueStore.set(parsedValue);
	}

	function handleBlur(): void {
		dispatch('blur');
		isActive = false;
	}

	function handleFocus(): void {
		isActive = true;
	}

	$: computedClass = `input-label ${disabled ? 'opacity-80' : 'opacity-100'}`;

	$: if (allowUpdate) {
		inputValue = $valueStore;
	}
</script>

<div class={computedClass} {style}>
	<div
		class={`input-wrapper ${isActive ? 'active' : ''} ${readOnly ? 'readonly' : ''}`}
		style={`flex-direction: ${buttonsPosition === 'end' ? 'row' : 'row-reverse'};`}
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
						type="number"
						inputmode={type === 'number' ? 'decimal' : undefined}
						data-testid={dataTestId}
						value={inputValue}
						on:input={handleInput}
						on:focus={handleFocus}
						on:blur={handleBlur}
						style={`padding-right: ${paddingRight};`}
						{placeholder}
					/>
					{#if $$slots.inputIcon}
						<div class="inner-content-img">
							<slot name="inputIcon" />
						</div>
					{/if}
				</span>
			</span>
		</label>
		{#if $$slots.buttons}
			<div
				class="buttons-wrapper"
				style={`margin-${buttonsPosition === 'start' ? 'left' : 'right'}: 4px;`}
			>
				<slot name="buttons" />
			</div>
		{/if}
		{#if $$slots.count}
			<div class="bet-countdown">
				<slot name="count" />
			</div>
		{/if}
		<!-- {#if $$slots.icon}
			<div class="">
				<slot name="icon" />
			</div>
		{/if} -->
	</div>
	<span class="label-content">{labelContent}</span>
</div>

<style lang="postcss">
	.input-label {
		@apply flex flex-col-reverse touch-manipulation w-full;
	}
	.input-wrapper {
		@apply w-full inline-flex rounded bg-[#111a41] border border-[#2c3763] transition duration-200 ease-in;
	}
	.input-wrapper:hover {
		@apply border-[#8b90a5] transition ease-in duration-700;
	}
	.input-inner-label {
		@apply w-full inline-flex flex-row-reverse items-center;
	}

	.input-inner-wrapper {
		@apply w-full flex flex-shrink-0;
	}

	.inner-content {
		@apply relative flex-grow w-full flex;
	}
	.inner-content-img {
		@apply absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-[#b1bad3] cursor-text right-3 h-4 w-4;
	}
	.main-input {
		@apply w-full bg-[#111a41] cursor-text py-2 px-4 rounded-lg text-sm font-medium leading-8 text-white border-none outline-none;
	}
	.main-input:disabled {
		@apply text-[#7483c5] cursor-not-allowed;
	}
	@media (max-width: 1030px) {
		.main-input {
			@apply text-[15px] pr-[var(--paddingRight)];
		}
	}
	.label-content {
		@apply text-xs inline-flex font-bold leading-6 tracking-wider text-white opacity-70 mt-0 mr-0 mb-[5px] ml-0 transition-all duration-200;
	}
	.buttons-wrapper {
		@apply inline-flex flex-shrink-0;
	}
	.bet-countdown {
		@apply inline-flex flex-shrink-0 justify-center items-center font-sans font-bold text-[#4769fc] whitespace-nowrap pointer-events-none cursor-text;
	}
</style>
