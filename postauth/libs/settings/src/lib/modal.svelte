<script lang="ts">
	import Account from '$lib/account.svelte';
	import Privacy from '$lib/privacy.svelte';
	import Security from '$lib/security.svelte';
	import { locale, t } from '$lib/locale/i18n';

	enum Tab {
		Account = 1,
		Security = 2,
		Privacy = 3
	}

	const isFramed = window.self !== window.top;
	let form: HTMLFormElement;
	let activeTab: Tab = Tab.Account;

	const close = (event: Event): void => {
		event?.preventDefault();
		window.parent.postMessage({ showModal: false }, '*');
	};

	const selectTab = (event: Event, _tab: Tab): void => {
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
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Account)}
						class={`tab${activeTab === Tab.Account ? '_selected' : ''}`}>{$t('account')}</a
					>
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Security)}
						class={`tab${activeTab === Tab.Security ? '_selected' : ''}`}>{$t('security')}</a
					>
					<a
						href={'#'}
						on:click={(e) => selectTab(e, Tab.Privacy)}
						class={`tab${activeTab === Tab.Privacy ? '_selected' : ''}`}>{$t('privacy')}</a
					>
				</div>
				{#if activeTab === Tab.Account}
					<Account />
				{:else if activeTab === Tab.Security}
					<Security />
				{:else if activeTab === Tab.Privacy}
					<Privacy />
				{/if}
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
		@apply relative bg-background-950 rounded-lg shadow p-6 border border-100 flex flex-col space-y-6 text-white text-sm font-normal  min-h-[40vh];
	}
	button.close {
		@apply absolute top-0 right-0 text-gray-500 text-base font-medium border-[1px] border-gray-600 w-8 h-8 flex items-center justify-center rounded-lg;
	}
	button.close:hover {
		@apply text-gray-400  border-gray-500;
	}
	div.tabs {
		@apply font-bold uppercase text-xs pb-3.5;
	}
	a.tab_selected {
		@apply text-white text-sm uppercase font-extrabold pr-3 pl-3 pb-3 border-b-4 border-blue-500;
	}
	a.tab {
		@apply text-gray-400 text-sm uppercase font-extrabold pr-3 pl-3 pb-3;
	}
</style>
