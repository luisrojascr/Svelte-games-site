<script lang="ts">
	import { t } from '$lib/locale/i18n';
	import Address from '$lib/parts/address.svelte';
	import Networks from '$lib/parts/networks.svelte';
	import Tokens from '$lib/parts/tokens.svelte';
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	import QrCode from 'svelte-qrcode';
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
		{#if currency && network}
			<p class="disclaimer">{$t('disclaimer')}</p>
		{/if}
		<div class="qrcode">
			<div class="qr">
				<div>
					<QrCode value="https://github.com/" />
				</div>
			</div>
		</div>
		<Address />
	{/if}
</div>

<style lang="postcss">
	div.content {
		@apply px-10 pb-8;
	}
	.disclaimer {
		@apply pt-4 px-4 w-full flex text-center;
	}
	div.qrcode {
		@apply w-full flex justify-center;
	}
	.qr {
		@apply py-4 w-1/3 flex justify-center;
	}
	.qr div {
		@apply border bg-background-950 border-100 p-2;
	}
	.qr div div {
		@apply border bg-background-900 border-100 p-1;
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
