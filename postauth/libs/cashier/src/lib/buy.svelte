<script lang="ts">
	import ApplePay from '$lib/icons/applepay.svelte';
	import GooglePay from '$lib/icons/googlepay.svelte';
	import Mastercard from '$lib/icons/mastercard.svelte';
	import Visa from '$lib/icons/visa.svelte';
	import { t } from '$lib/locale/i18n';
	import Address from '$lib/parts/address.svelte';
	import Networks from '$lib/parts/networks.svelte';
	import Tokens from '$lib/parts/tokens.svelte';
	import { SelectBy, stateCurrency, stateNetwork, stateSelectBy } from './state';

	let currency: string | undefined = undefined;
	let network: string | undefined = undefined;
	stateCurrency.subscribe((value) => (currency = value));
	stateNetwork.subscribe((value) => (network = value));

	let selectBy: SelectBy = SelectBy.Token;
	stateSelectBy.subscribe((value) => (selectBy = value));

	const selectTab = (event: Event, tab: SelectBy): void => {
		stateCurrency.set(undefined);
		stateNetwork.set(undefined);
		event?.preventDefault();
		stateSelectBy.set(tab);
	};
</script>

<div class="content">
	<div class="tabs">
		<a
			href={'#'}
			on:click={(e) => selectTab(e, SelectBy.Token)}
			class={`tab${selectBy === SelectBy.Token ? '_selected' : ''}`}>{$t('Tokens')}</a
		>
		<a
			href={'#'}
			on:click={(e) => selectTab(e, SelectBy.Network)}
			class={`tab${selectBy === SelectBy.Network ? '_selected' : ''}`}>{$t('Networks')}</a
		>
	</div>
	{#if selectBy === SelectBy.Network}
		<p class="top-caption">Select a supported network to deposit on:</p>
		<Networks />
		{#if network}
			<p class="top-caption">Select a token or currency to deposit:</p>
			<Tokens />
		{/if}
	{:else}
		<p class="top-caption">Select a token or currency to deposit:</p>
		<Tokens />
		{#if currency}
			<p class="top-caption">Select a supported network to deposit on:</p>
			<Networks />
		{/if}
	{/if}
	{#if currency && network}
		<p class="disclaimer">{$t('third_party')} {$t('disclaimer')}</p>
	{/if}
	{#if currency && network}
		{#if currency && network}
			<Address />
			<button class="continue">{$t('Continue')}</button>
		{/if}
	{/if}
	<div class="methods">
		<ApplePay />
		<GooglePay />
		<Visa />
		<Mastercard />
	</div>
</div>

<style lang="postcss">
	div.content {
		@apply px-10 pb-8;
	}
	.disclaimer {
		@apply pt-4 px-4 w-full flex text-center;
	}
	.methods {
		@apply py-4 w-full flex justify-center;
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
	button.continue:focus {
		@apply ring-4 outline-none ring-green-100;
	}
	p.top-caption {
		@apply pb-2 pt-2 text-gray-400;
	}
	div.tabs {
		@apply uppercase text-sm pb-3.5 px-5;
	}
	a.tab_selected {
		@apply text-white pr-3 pl-3 pb-2 border-b-2 border-white;
	}
	a.tab {
		@apply text-gray-400 pr-3 pl-3;
	}
</style>
