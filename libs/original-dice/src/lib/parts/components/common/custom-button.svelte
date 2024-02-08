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
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: none;
		min-width: max-content;
		outline: none;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 900;
		line-height: normal;
		letter-spacing: 1px;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s linear;
	}
	.custom-button:active span {
		transform: scale(0.95);
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}
	.custom-button:hover {
		background-color: var(--hover-color);
	}
	.custom-button:disabled {
		cursor: not-allowed;
		background-color: var(--disabled-bg-color);
	}
</style>
