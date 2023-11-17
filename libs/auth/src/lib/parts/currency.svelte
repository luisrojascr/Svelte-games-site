<script lang="ts">
	import CurrencyIcon from '$lib/icons/currency.svelte';
	import { stateCurrency } from '$lib/state';

	let element: HTMLSelectElement;

	const onChange = () => {
		stateCurrency.set(element.value);
	};

	stateCurrency.subscribe((_value) => {
		if (element) element.value = _value;
	});
</script>

<span class="section">
	<div class="input">
		<div class="leading-icon">
			<CurrencyIcon />
		</div>
		<select
			name="currency"
			id="currency"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
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
	div.input {
		@apply relative w-full;
	}
	.leading-icon {
		@apply relative top-[28px] left-0 flex items-center pl-3.5 pointer-events-none;
	}
	select,
	select:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	select:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
