<script lang="ts">
	import BnbIcon from '$lib/crypto/icons/bnb.svelte';
	import BtcIcon from '$lib/crypto/icons/btc.svelte';
	import DogeIcon from '$lib/crypto/icons/doge.svelte';
	import EthIcon from '$lib/crypto/icons/eth.svelte';
	import LtcIcon from '$lib/crypto/icons/ltc.svelte';
	import MaticIcon from '$lib/crypto/icons/matic.svelte';
	import UsdcIcon from '$lib/crypto/icons/usdc.svelte';
	import UsdtIcon from '$lib/crypto/icons/usdt.svelte';

	export let currency = 'bnb';
</script>

{#if currency === 'bnb' || currency === 'bsc'}
	<BnbIcon />
{/if}
{#if currency === 'btc'}
	<BtcIcon />
{/if}
{#if currency === 'doge'}
	<DogeIcon />
{/if}
{#if currency === 'eth'}
	<EthIcon />
{/if}
{#if currency === 'ltc'}
	<LtcIcon />
{/if}
{#if currency === 'matic' || currency === 'polygon'}
	<MaticIcon />
{/if}
{#if currency === 'usdc'}
	<UsdcIcon />
{/if}
{#if currency === 'usdt'}
	<UsdtIcon />
{/if}
