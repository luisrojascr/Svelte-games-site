<script lang="ts">
	import { TokenMode } from '$lib/crypto/currency';
	import { t } from '$lib/locale/i18n';
	import Address from '$lib/parts/address.svelte';
	import { token } from '@infinitro/global-postauth';
	import Networks from './parts/networks.svelte';
	import Tokens from './parts/tokens.svelte';
	import Wallet from './parts/wallet.svelte';
	import { stateCurrency, stateNetwork } from './state';

	token.subscribe((value) => {
		console.log(token);
	});

	let currency: string | undefined = undefined;
	let network: string | undefined = undefined;
	stateCurrency.subscribe((value) => (currency = value));
	stateNetwork.subscribe((value) => (network = value));
</script>

<div class="content">
	<p class="top-caption">Select a token or currency to withdraw:</p>
	<Tokens mode={TokenMode.Withdraw} />
	{#if currency}
		<p class="top-caption">Select a supported network to withdraw to:</p>
		<Networks mode="withdraw" />
	{/if}
	{#if currency && network}
		<p class="top-caption">Select an address to withdraw to:</p>
		<Wallet />
		<button class="continue" disabled>{$t('Continue')}</button>
	{/if}
</div>

<style lang="postcss">
	div.content {
		@apply px-10 pb-8;
	}
	p.top-caption {
		@apply pb-2 pt-2 text-gray-400;
	}
	button.continue {
		@apply w-full text-white bg-[#01D180] font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center;
	}
	button.continue:disabled {
		@apply bg-gray-300;
	}
	button.continue:hover {
		@apply bg-[#00B16c];
	}
	button.continue:disabled:hover {
		@apply bg-gray-300 cursor-not-allowed;
	}
	button.continue:focus {
		@apply ring-4 outline-none ring-green-100;
	}
</style>
