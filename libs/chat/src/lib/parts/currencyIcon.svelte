<script lang="ts">
	import BitcoinIcon from '$lib/icons/bitcoinIcon.svelte';
	import BnbIcon from '$lib/icons/bnbIcon.svelte';
	import DaiIcon from '$lib/icons/daiIcon.svelte';
	import DogeIcon from '$lib/icons/dogeIcon.svelte';
	import EtherIcon from '$lib/icons/etherIcon.svelte';
	import LiteIcon from '$lib/icons/liteIcon.svelte';
	import MaticIcon from '$lib/icons/maticIcon.svelte';
	import UsdcIcon from '$lib/icons/usdcIcon.svelte';
	import UsdtIcon from '$lib/icons/usdtIcon.svelte';
	import type { ComponentType } from 'svelte';

	type IconComponentMap = {
		[key: string]: ComponentType;
	};

	export let icon: string;
	let iconComponent: ComponentType;

	const iconComponentsMap: IconComponentMap = {
		BTC: BitcoinIcon,
		ETH: EtherIcon,
		BNB: BnbIcon,
		DAI: DaiIcon,
		DOGE: DogeIcon,
		LTC: LiteIcon,
		MATIC: MaticIcon,
		USDC: UsdcIcon,
		USDT: UsdtIcon
	};

	$: if (icon) {
		setIconComponent(icon || 'BTC');
	}

	function setIconComponent(iconName: string) {
		iconComponent = iconComponentsMap[iconName];
	}
</script>

{#if iconComponent !== undefined}
	<svelte:component this={iconComponent} />
{/if}
