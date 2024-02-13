<script lang="ts">
	import type { CashierMinLimits } from '$lib/api/api';
	import { AsyncCashierMinLimits } from '$lib/api/api';
	import { t } from '$lib/locale/i18n';
	import Buy from './buy.svelte';
	import Deposit from './deposit.svelte';
	import Offers from './offers/offers.svelte';
	import { CashierTab, stateCurrency, stateNetwork, stateTab } from './state';
	import Withdraw from './withdraw.svelte';

	const isFramed = window.self !== window.top;
	let activeTab: CashierTab = CashierTab.Deposit;
	stateTab.subscribe((value) => (activeTab = value));

	const close = (event: Event): void => {
		event?.preventDefault();
		if (isFramed) window.parent.postMessage({ showModal: false }, '*');
	};

	const selectTab = (event: Event, _tab: CashierTab): void => {
		event?.preventDefault();
		stateTab.set(_tab);
		stateCurrency.set(undefined);
		stateNetwork.set(undefined);
	};
</script>

<div class="underlay" />
<div class="overlay">
	<div class="center">
		<div class="modal">
			<div class="tabs">
				<a
					href={'#'}
					on:click={(e) => selectTab(e, CashierTab.Deposit)}
					class={`tab${activeTab === CashierTab.Deposit ? '_selected' : ''}`}>{$t('deposit')}</a
				>
				<a
					href={'#'}
					on:click={(e) => selectTab(e, CashierTab.Offers)}
					class={`tab${activeTab === CashierTab.Offers ? '_selected' : ''}`}>{$t('offers')}</a
				>
				<a
					href={'#'}
					on:click={(e) => selectTab(e, CashierTab.Withdraw)}
					class={`tab${activeTab === CashierTab.Withdraw ? '_selected' : ''}`}>{$t('withdraw')}</a
				>
				<a
					href={'#'}
					on:click={(e) => selectTab(e, CashierTab.Buy)}
					class={`tab${activeTab === CashierTab.Buy ? '_selected' : ''}`}>{$t('buy')}</a
				>
			</div>
			<div class="content">
				{#if activeTab === CashierTab.Deposit}
					<Deposit />
				{:else if activeTab === CashierTab.Offers}
					<Offers />
				{:else if activeTab === CashierTab.Withdraw}
					<Withdraw />
				{:else if activeTab === CashierTab.Buy}
					<Buy />
				{/if}
			</div>
		</div>
		<button class="close" on:click={close}>x</button>
	</div>
</div>

<style lang="postcss">
	div.underlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full bg-black opacity-20;
	}
	div.overlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full flex items-center justify-center;
	}
	div.center {
		@apply relative w-full max-w-lg max-h-full m-auto top-auto;
	}
	div.modal {
		@apply relative bg-background-900 rounded-lg shadow border border-100 flex flex-col space-y-4 text-white text-sm font-normal min-h-[80vh];
	}
	div.content {
	}
	button.close {
		@apply absolute top-0 right-0 text-gray-300 text-base font-medium border-[1px] border-gray-500 w-8 h-8 flex items-center justify-center rounded-md;
	}
	button.close:hover {
		@apply text-gray-200  border-gray-400;
	}
	div.tabs {
		@apply uppercase text-base pb-3.5 pt-[100px] px-10 rounded-t-lg bg-[url('/depositHeader.svg')];
	}
	a.tab_selected {
		@apply text-white pr-3 pl-3 pb-3.5 border-b-2 border-white;
	}
	a.tab {
		@apply text-gray-400 pr-3 pl-3 pb-3;
	}
</style>
