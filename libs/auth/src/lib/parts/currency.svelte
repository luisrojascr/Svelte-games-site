<script lang="ts">
	import CurrencyIcon from '$lib/icons/currency.svelte';
	import { stateCurrency } from '$lib/state';

	let element: HTMLSelectElement;
	let value = '';

	const onChange = () => {
		stateCurrency.set(element.value);
	};

	stateCurrency.subscribe((_value) => {
		value = _value;
		if (element) element.value = _value;
	});
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<CurrencyIcon />
		</div>
		<select
			name="currency"
			id="currency"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			{value}
		>
			<option value="EUR">EUR</option>
			<option value="USD">USD</option>
		</select>
	</div>
</span>

<style lang="postcss">
	.section {
		@apply pt-4 flex;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	select,
	select:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	select:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
