<script lang="ts">
	import Spinner from './spinner.svelte';

	import { loading } from '$lib/parts/store/store.js';

	export let type: 'button' | 'submit' = 'button';
	export let onClick: () => void;
	export let width: string = 'initial';
	export let bgColor: string = '#01d180';
	export let color: string = '#ffffff';
	export let padding: string = '16px';
	export let margin: string = '0px';
	export let disabled: boolean = true;
	export let isInRedState: boolean = false;
	export let secondary: boolean = false;
	export let hoverColor: any;
	export let dataTestId: string;
	export let buttonText: string;

	let hover = false;

	// const backgroundColor = secondary ? '#4769fc' : bgColor;

	function getHoverColor() {
		if (isInRedState) return '#de2348';
		if (secondary) return '#334aaf';
		if (hoverColor) return hoverColor;
		return '#00b16c';
	}

	// $: isDisabled = $loading || disabled;
</script>

<button
	{type}
	on:click={onClick}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="custom-button"
	style={`background-color: ${bgColor}; color: ${color}; padding: ${padding}; margin: ${margin}; width: ${width};`}
	{disabled}
>
	{#if $loading}
		<Spinner />
	{:else}
		<span>
			{buttonText}
		</span>
	{/if}
</button>

<style lang="postcss">
	.custom-button {
		@apply relative inline-flex justify-center items-center border-none min-w-max outline-none rounded-md font-bold text-xs tracking-wide text-center cursor-pointer transition-all duration-200 ease-linear;
	}
	.custom-button:active span {
		@apply focus:outline-none active:scale-95 transition duration-300 ease-in-out transform;
	}
	.custom-button:hover {
		@apply bg-opacity-90;
	}
	.custom-button:disabled {
		@apply cursor-not-allowed bg-disabled;
	}
</style>
