<script lang="ts">
	import BnbIcon from '$lib/parts/components/Icons/BnbIcon.svelte';
	import BtcIcon from '$lib/parts/components/Icons/BtcIcon.svelte';
	import DaiIcon from '$lib/parts/components/Icons/DaiIcon.svelte';
	import DashIcon from '$lib/parts/components/Icons/DashIcon.svelte';
	import DogeIcon from '$lib/parts/components/Icons/DogeIcon.svelte';
	import EthIcon from '$lib/parts/components/Icons/EthIcon.svelte';
	import LtcIcon from '$lib/parts/components/Icons/LtcIcon.svelte';
	import MaticIcon from '$lib/parts/components/Icons/MaticIcon.svelte';
	import UsdcIcon from '$lib/parts/components/Icons/UsdcIcon.svelte';
	import UsdtIcon from '$lib/parts/components/Icons/UsdtIcon.svelte';
	import { CurrencyEnum } from '$lib/utils/cc.js';

	//
	export let coin: string;
	export let current: boolean = false;
	export let addText: boolean = false;
	export let biggerIcon: boolean = false;
	export let mediumIcon: boolean = false;
	export let style: string = '';
	export let hw: boolean = false;
	export let isMobile: boolean = false;
	export let pxSize: number | undefined;
	// Calculate the size based on the props
	$: size = pxSize
		? `${pxSize}px`
		: biggerIcon
			? '20px'
			: mediumIcon
				? '16px'
				: hw
					? '100%'
					: '12px';
	// Optional text label for the coin
	$: coinLabel = addText && !current ? coin.toUpperCase() : null;
	// Dynamic class for font size based on isMobile
	$: fontSizeClass = isMobile ? 'mobile' : 'desktop';
</script>

{#if coin === CurrencyEnum.btc}
	<BtcIcon width={size} height={size} />
{:else if coin === CurrencyEnum.doge}
	<DogeIcon />
{:else if coin === CurrencyEnum.eth}
	<EthIcon />
{:else if coin === CurrencyEnum.ltc}
	<LtcIcon width={size} height={size} />
{:else if coin === CurrencyEnum.dash}
	<DashIcon width={size} height={size} />
{:else if coin === CurrencyEnum.usdt}
	<UsdtIcon width={size} />
{:else if coin === CurrencyEnum.usdc}
	<UsdcIcon width={size} />
{:else if coin === CurrencyEnum.dai}
	<DaiIcon width={size} />
{:else if coin === CurrencyEnum.matic}
	<MaticIcon width={size} height={size} />
{:else if coin === CurrencyEnum.bnb}
	<BnbIcon width={size} height={size} />
{:else}
	<span class={`coin-name ${fontSizeClass}`}>?</span>
{/if}

{#if coinLabel}
	<span class={`coin-name ${fontSizeClass}`}>{coinLabel}</span>
{/if}

<style>
	.mobile {
		font-size: 8.5px;
	}
	.desktop {
		font-size: 10px;
	}
	@media (max-width: 300px) {
		.mobile {
			font-size: 7px;
		}
	}
</style>
