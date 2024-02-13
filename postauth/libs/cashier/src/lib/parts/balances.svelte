<script lang="ts">
	import { networks, tokens } from '$lib/crypto/currency';
	import CryptoIcon from '$lib/crypto/icons/icon.svelte';
	import DropdownIcon from '$lib/icons/dropdown.svelte';
	//import { stateCurrency, stateNetwork } from '../state';

	let currency: string | undefined = undefined;
	//let selectedToken = tokens.find((token) => token.currency === currency);
	let network: string | undefined = undefined;
	// let selectedNetwork = networks.find((item) => item.network === network);

	// stateCurrency.subscribe((value) => {
	// 	currency = value;
	// 	selectedToken = tokens.find((token) => token.currency === currency);
	// });
	// stateNetwork.subscribe((value) => {
	// 	network = value;
	// 	selectedNetwork = networks.find((item) => item.network === network);
	// });

	const onDropDown = (event: Event) => {
		event.preventDefault();
		console.log('onDropDown');
	};

	const selectToken = (value: string) => {
		currency = value;
	};
	const changeToken = () => {
		// stateCurrency.set(undefined);
		// // todo: only clear if we are chosing token first
		// stateNetwork.set(undefined);
	};
</script>

{#if !currency}
	<span class="section">
		{#each tokens as token}
			<div class="input" on:click={() => selectToken(token.currency)}>
				<div class="leading-icon">
					<CryptoIcon currency={token.currency} />
				</div>
				<div>{token.currency.toUpperCase()} ({token.name})</div>
			</div>
		{/each}
	</span>
{:else}
	<span class="section">
		<div class="input" on:click={() => changeToken()}>
			<div class="leading-icon">
				<CryptoIcon currency={currency ?? ''} />
			</div>
			<!-- <div>{selectedToken?.currency.toUpperCase()} ({selectedToken?.name})</div>
			<a class="trailing-icon" href={'#'} on:click={onDropDown} tabindex="-1">
				<DropdownIcon />
			</a> -->
		</div>
	</span>
{/if}

<style lang="postcss">
	.section {
		@apply flex w-full flex-col;
	}
	div.input {
		@apply relative border bg-background-950 border-100 text-white text-base block w-full p-2.5 border-b-0 pl-10 rounded-sm cursor-pointer hover:bg-background-800 hover:border-sky-200 hover:border-b;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pb-2 cursor-pointer;
	}
</style>
