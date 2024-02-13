<script lang="ts">
	import type { CryptoNetworkEnum, Network } from '$lib/crypto/currency';
	import {
		CryptoCurrencyEnum,
		currenciesForNetwork,
		defaultCurrencyForNetwork,
		networks,
		networksForCurrency,
		tokens
	} from '$lib/crypto/currency';
	import CryptoIcon from '$lib/crypto/icons/icon.svelte';
	import CheckIcon from '$lib/icons/check.svelte';
	import DropdownIcon from '$lib/icons/dropdown.svelte';
	import {
		CashierTab,
		SelectBy,
		stateCurrency,
		stateNetwork,
		stateSelectBy,
		stateTab
	} from '../state';

	let currency: CryptoCurrencyEnum | undefined = undefined;
	let selectedToken = tokens.find((token) => token.currency === currency);
	let network: CryptoNetworkEnum | undefined = undefined;
	let selectedNetwork = networks.find((item) => item.network === network);
	let selectBy: SelectBy = SelectBy.Token;
	let activeTab: CashierTab = CashierTab.Deposit;
	stateSelectBy.subscribe((value) => (selectBy = value));
	stateTab.subscribe((value) => (activeTab = value));

	stateCurrency.subscribe((value) => {
		currency = value;
		selectedToken = tokens.find((token) => token.currency === currency);
	});
	stateNetwork.subscribe((value) => {
		network = value;
		selectedNetwork = networks.find((item) => item.network === network);
	});
	const selectNetwork = (network: Network) => {
		if (networkEnabled(network, currency)) {
			stateNetwork.set(network.network);
			if (currenciesForNetwork(network.network) === 1)
				stateCurrency.set(defaultCurrencyForNetwork(network.network));
		}
	};
	const changeNetwork = () => {
		stateNetwork.set(undefined);
		if (selectBy === SelectBy.Network) stateCurrency.set(undefined);
	};
	const networkEnabled = (
		network: Network,
		currency: CryptoCurrencyEnum | string | undefined
	): boolean => {
		if (!currency || !selectedToken) return true;
		if (network.network === currency) return true;
		if (selectedToken?.networks?.includes(network.network)) return true;
		return false;
	};
	// unsupported means the token (or a wrapped variation) is on the given network but is not supported for deposits
	const networkUnsupported = (network: Network, currency: string | undefined): boolean =>
		selectedToken?.unsupported?.includes(network.network) ?? false;
</script>

{#if !network}
	{#if !currency}
		<span class="section">
			{#each networks as network}
				{#if network.unsupported != true}
					<button class="option enabled" on:click={() => selectNetwork(network)}>
						<div class="leading-icon">
							<CryptoIcon currency={network.network} />
						</div>
						<div>{network.name}</div>
					</button>
				{/if}
			{/each}
			<div class="option disabled">
				<div>
					{#if activeTab === CashierTab.Withdraw}WITHDRAWALS NOT SUPPORTED TO:{:else}DO NOT SEND ON:{/if}<br
					/>
					{#each networks as network}
						{#if network.unsupported === true}
							{network.name}{`, `}
						{/if}
					{/each}
					nor any network not listed above.
				</div>
			</div>
		</span>
	{:else}
		<span class="section">
			{#each networks as network}
				{#if networkEnabled(network, currency)}
					<button class="option enabled" on:click={() => selectNetwork(network)}>
						<div class="leading-icon">
							<CryptoIcon currency={network.network} />
						</div>
						<div>{network.name}</div>
					</button>
				{/if}
			{/each}
			<div class="option disabled">
				<div>
					{#if activeTab === CashierTab.Withdraw}WITHDRAWALS NOT SUPPORTED TO:{:else}DO NOT SEND ON:{/if}<br
					/>
					{#each networks as network}
						{#if networkUnsupported(network, currency)}
							{network.name}{`, `}
						{/if}
					{/each}
					nor any network not listed above.
				</div>
			</div>
		</span>
	{/if}
{:else}
	{@const networkCount = networksForCurrency(currency)}
	<span class="section">
		<button
			class="option enabled"
			on:click={networkCount > 1 || selectBy === SelectBy.Network
				? () => changeNetwork()
				: () => {}}
		>
			<div class="leading-icon">
				<CryptoIcon currency={network ?? ''} />
			</div>
			<div>{selectedNetwork?.name}</div>
			<span class="trailing-icon">
				{#if networkCount > 1 || selectBy === SelectBy.Network}
					<DropdownIcon />
				{:else}
					<CheckIcon />
				{/if}
			</span>
		</button>
		{#if networkCount === 1 && selectBy === SelectBy.Token}
			<div class="option disabled">
				<div>
					{#if activeTab === CashierTab.Withdraw}WITHDRAWALS NOT SUPPORTED TO:{:else}DO NOT SEND ON:{/if}<br
					/>
					{#each networks as network}
						{#if networkUnsupported(network, currency)}
							{network.name}{`, `}
						{/if}
					{/each}
					nor any network not listed above.
				</div>
			</div>
		{/if}
	</span>
{/if}

<style lang="postcss">
	.section {
		@apply flex w-full flex-col;
	}
	.option {
		@apply relative border bg-background-950 border-100 text-base w-full p-2.5 border-b-0 pl-10 rounded-sm flex flex-row justify-between;
	}
	.enabled {
		@apply cursor-pointer text-white;
	}
	.enabled:hover {
		@apply bg-background-800 border-sky-200 border-b;
	}
	.disabled {
		@apply cursor-not-allowed grayscale text-gray-500;
	}
	.unsupported {
		@apply text-gray-500;
	}
	span.not_accepted {
		@apply text-gray-400;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pb-2 cursor-pointer;
	}
</style>
