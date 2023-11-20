<script lang="ts">
	import DropdownIcon from '$lib/icons/dropdown.svelte';
	import WalletIcon from '$lib/icons/wallet.svelte';
	import { t } from '$lib/locale/i18n';

	let element: HTMLInputElement;
	let confirmed = false;
	let value = 'Bitcoin Mainnet';

	const onDropDown = (event: Event) => {
		event.preventDefault();
		console.log('onDropDown');
	};
</script>

<span class="section">
	<div class="input">
		<div class="leading-icon">
			<img src="/icons/bitcoin.svg" alt="Bitcoin Mainnet" />
		</div>
		<input
			class="input"
			type="text"
			name="token"
			id="token"
			autocomplete="off"
			bind:this={element}
			disabled={true}
			{value}
		/>
		<a class="trailing-icon" href={'#'} on:click={onDropDown} tabindex="-1">
			<DropdownIcon />
		</a>
	</div>
</span>

<style lang="postcss">
	.section {
		@apply flex w-full;
	}
	div.input {
		@apply relative w-full;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pb-2 cursor-pointer;
	}
	input,
	input:disabled {
		@apply border bg-background-950 border-100 text-white text-base block w-full p-2.5 pl-10 rounded-sm;
	}
	input:focus {
		@apply ring-blue-500 border-blue-500;
	}
</style>
