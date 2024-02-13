<script lang="ts">
	import type { PlayerWallet } from '$lib/api/api';
	import { AsyncWallets } from '$lib/api/api';
	import {
		currenciesForNetwork,
		defaultNetworkForCurrency,
		displayCryptoCurrency,
		networks,
		networksForCurrency,
		tokens,
		type CryptoCurrencyEnum,
		type CryptoNetworkEnum,
		type Network,
		type Token
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
		stateTab,
		stateWallets
	} from '../state';

	let currency: CryptoCurrencyEnum | undefined = undefined;
	let selectedToken = tokens.find((token) => token.currency === currency);
	let network: CryptoNetworkEnum | undefined = undefined;
	let selectedNetwork = networks.find((item) => item.network === network);
	let wallets: PlayerWallet[] = [];
	let activeTab: CashierTab = CashierTab.Deposit;
	let selectBy: SelectBy = SelectBy.Token;
	stateTab.subscribe((value) => (activeTab = value));
	stateSelectBy.subscribe((value) => (selectBy = value));

	stateCurrency.subscribe((value) => {
		currency = value;
		selectedToken = tokens.find((token) => token.currency === currency);
	});
	stateNetwork.subscribe((value) => {
		network = value;
		selectedNetwork = networks.find((item) => item.network === network);
	});
	stateWallets.subscribe((value) => {
		wallets = value;
	});

	const onDropDown = (event: Event) => {
		event.preventDefault();
		console.log('onDropDown');
	};

	const selectToken = (currency: CryptoCurrencyEnum) => {
		stateCurrency.set(currency);
		if (networksForCurrency(currency) === 1) stateNetwork.set(defaultNetworkForCurrency(currency));
	};
	const changeToken = () => {
		stateCurrency.set(undefined);
		if (selectBy === SelectBy.Token) stateNetwork.set(undefined);
	};
	const networkEnabled = (token: Token, network: CryptoNetworkEnum | undefined): boolean => {
		if (!network || !selectedNetwork) return true;
		if (token.networks?.includes(network)) return true;
		return false;
	};
	// unsupported means the token (or a wrapped variation) is on the given network but is not supported for deposits
	const networkUnsupported = (token: Token, network: CryptoNetworkEnum): boolean =>
		token?.unsupported?.includes(network) ?? false;
	const hasUnsupportedTokens = (network: Network): boolean =>
		tokens.reduce((acc, token) => acc || networkUnsupported(token, network.network), false);

	async function asyncInit(): Promise<void> {
		if (activeTab === CashierTab.Withdraw) {
			const result = await AsyncWallets({}); // todo: how to purge cache or force cash reload?
			stateWallets.set(result.data.wallets);
			console.log(result.data.wallets);
		}
	}
	asyncInit()
		.then(() => {})
		.catch((e) => console.error(e));
</script>

{#if !currency}
	{#if network && selectedNetwork}
		<span class="section">
			{#each tokens as token}
				{#if networkEnabled(token, network)}
					<button class="option enabled" on:click={() => selectToken(token.currency)}>
						<div class="leading-icon">
							<CryptoIcon currency={token.currency} />
						</div>
						<div>{token.currency.toUpperCase()} ({token.name})</div>
					</button>
				{/if}
			{/each}
			{#if hasUnsupportedTokens(selectedNetwork)}
				<button class="option disabled">
					<div>
						Do not send to {selectedNetwork.name}:<br />
						{#each tokens as token}
							{#if networkUnsupported(token, network)}
								{token.currency.toUpperCase()} ({token.name}){`, `}
							{/if}
						{/each}
						nor any token not listed above.
					</div>
				</button>
			{/if}
		</span>
	{:else}
		<span class="section">
			{#each tokens as token}
				{@const balance = wallets.find((wallet) => wallet.type == token.currency)?.available}
				<button
					class="option {activeTab === CashierTab.Withdraw &&
					!wallets.find((wallet) => wallet.type == token.currency)
						? `disabled`
						: `enabled`}"
					on:click={() =>
						activeTab != CashierTab.Withdraw || balance ? selectToken(token.currency) : {}}
				>
					<div class="leading-icon">
						<CryptoIcon currency={token.currency} />
					</div>
					<div>{token.currency.toUpperCase()} ({token.name})</div>
					{#if activeTab === CashierTab.Withdraw}
						<div class="balance">
							{displayCryptoCurrency(balance ?? '', token.currency)}
						</div>
					{/if}
				</button>
			{/each}
		</span>{/if}
{:else}
	{@const currencyCount = currenciesForNetwork(network)}
	<span class="section">
		<button
			class="option enabled"
			on:click={currencyCount > 1 || selectBy === SelectBy.Token ? () => changeToken() : () => {}}
		>
			<div class="leading-icon">
				<CryptoIcon currency={currency ?? ''} />
			</div>
			<div>{selectedToken?.currency.toUpperCase()} ({selectedToken?.name})</div>
			<span class="trailing-icon">
				{#if currencyCount > 1 || selectBy === SelectBy.Token}
					<DropdownIcon />
				{:else}
					<CheckIcon />
				{/if}
			</span>
		</button>
		{#if selectedNetwork && network && currencyCount === 1 && selectBy === SelectBy.Network && hasUnsupportedTokens(selectedNetwork)}
			<button class="option disabled">
				<div>
					Do not send to {selectedNetwork.name}:<br />
					{#each tokens as token}
						{#if networkUnsupported(token, network)}
							{token.currency.toUpperCase()} ({token.name}){`, `}
						{/if}
					{/each}
					nor any token not listed above.
				</div>
			</button>
		{/if}
	</span>
{/if}

<style lang="postcss">
	.section {
		@apply flex w-full flex-col;
	}
	.option {
		@apply relative border bg-background-950 border-100 text-white text-base w-full p-2.5 border-b-0 pl-10 rounded-sm flex flex-row justify-between;
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
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pb-2 cursor-pointer;
	}
	.balance {
		@apply text-gray-400;
	}
</style>
