<script lang="ts">
	import { locale, t } from '$lib/locale/i18n';
	import Buy from './buy.svelte';
	import Deposit from './deposit.svelte';
	import Withdraw from './withdraw.svelte';

	enum Tab {
		Deposit = 1,
		Withdraw = 2,
		Buy = 3
	}

	const isFramed = window.self !== window.top;
	let form: HTMLFormElement;
	let activeTab: Tab = Tab.Deposit;

	const close = (event: Event): void => {
		event?.preventDefault();
		window.parent.postMessage({ showModal: false }, '*');
	};

	const selectTab = (event: Event, _tab: Tab): void => {
		event?.preventDefault();
		activeTab = _tab;
	};
</script>

<form bind:this={form}>
	<div class="underlay" />
	<div class="overlay">
		<div class="center">
			<div class="modal">
				{#if isFramed}
					<button class="close" on:click={close}>x</button>
				{/if}
				<div class="tabs">
					<!-- <img src="/depositHeader.svg" style="width: 100%;" alt="Deposit Header" /> -->
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Deposit)}
						class={`tab${activeTab === Tab.Deposit ? '_selected' : ''}`}>{$t('deposit')}</a
					>
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Withdraw)}
						class={`tab${activeTab === Tab.Withdraw ? '_selected' : ''}`}>{$t('withdraw')}</a
					>
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Buy)}
						class={`tab${activeTab === Tab.Buy ? '_selected' : ''}`}>{$t('buy')}</a
					>
				</div>
				<div class="content">
					{#if activeTab === Tab.Deposit}
						<Deposit />
					{:else if activeTab === Tab.Withdraw}
						<Withdraw />
					{:else if activeTab === Tab.Buy}
						<Buy />
					{/if}
				</div>
			</div>
		</div>
	</div>
</form>

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
		@apply relative bg-background-900 rounded-lg shadow border border-100 flex flex-col space-y-6 text-white text-sm font-normal  min-h-[80vh];
	}
	div.content {
		@apply px-10 pb-8;
	}
	button.close {
		@apply absolute top-0 right-0 text-gray-500 text-base font-medium border-[1px] border-gray-600 w-8 h-8 flex items-center justify-center rounded-lg;
	}
	button.close:hover {
		@apply text-gray-400  border-gray-500;
	}
	div.tabs {
		@apply uppercase text-base font-extrabold pb-3.5 pt-24 px-10 rounded-t-lg bg-[url('/depositHeader.svg')];
	}
	a.tab_selected {
		@apply text-white pr-3 pl-3 pb-3 border-b-4 border-white;
	}
	a.tab {
		@apply text-gray-400 pr-3 pl-3 pb-3;
	}
</style>
