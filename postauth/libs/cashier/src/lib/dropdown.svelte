<script lang="ts">
	import BnbIcon from '$lib/crypto/icons/bnb.svelte';
	import BtcIcon from '$lib/crypto/icons/btc.svelte';
	import DogeIcon from '$lib/crypto/icons/doge.svelte';
	import EthIcon from '$lib/crypto/icons/eth.svelte';
	// import LtcIcon from '$lib/crypto/icons/ltc.svelte';
	import Matic from '$lib/crypto/icons/matic.svelte';
	import UsdcIcon from '$lib/crypto/icons/usdc.svelte';
	import UsdtIcon from '$lib/crypto/icons/usdt.svelte';
	import IconDropdown from '$lib/icons/dropdown.svelte';
	import IconDropup from '$lib/icons/dropup.svelte';
	import { t } from '$lib/locale/i18n';

	const isFramed = window.self !== window.top;
	let form: HTMLFormElement;

	const close = (event: Event): void => {
		event.preventDefault();
		event.cancelBubble = true;
		window.parent.postMessage({ showModal: false }, '*');
	};

	const clickInside = (event: Event): void => {
		event.cancelBubble = true;
		console.log(`clicked inside`);
	};

	const selectItem = (event: Event, currency: string): void => {
		event.preventDefault();
		event.cancelBubble = true;
		console.log(`selected ${currency}`);
	};

	const selectFiat = (event: Event): void => {
		event.preventDefault();
		event.cancelBubble = true;
		console.log(`toggle fiat`);
	};
</script>

<form bind:this={form}>
	<div class="underlay" />
	<div class="overlay" on:click={close}>
		<div class="dropdown" on:click={clickInside}>
			<div class="top" on:click={close}>
				<p>0.0000000</p>
				<div>
					<span>BTC</span>
					<BtcIcon />
				</div>
				<div>
					<IconDropup />
				</div>
			</div>
			<div class="item" on:click={(e) => selectItem(e, 'eth')}>
				<p>0.0000000</p>
				<div>
					<span>ETH</span>
					<EthIcon />
				</div>
			</div>
			<div class="item">
				<p>0.0000000</p>
				<div>
					<span>USDT</span>
					<UsdtIcon />
				</div>
			</div>
			<div class="fiat" on:click={selectFiat}>DISPLAY IN FIAT</div>
		</div>
	</div>
</form>

<style lang="postcss">
	div.underlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full bg-black opacity-20;
	}
	div.overlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full flex;
	}
	div.dropdown {
		@apply absolute top-[12px] w-[144px] sm:w-[186px] right-[80px] sm:right-[240px] md:right-[284px] lg:right-[370px] rounded-md bg-background-950 shadow border border-[#4769fc] flex flex-col  text-white cursor-pointer;
	}
	div.top {
		@apply flex flex-row items-center justify-between border-100 border-b p-2.5 font-sans font-semibold text-xs text-white;
	}
	div.top div {
		@apply flex flex-row text-xs font-medium text-white;
	}
	div.top div span {
		@apply mr-1;
	}
	div.item {
		@apply flex flex-row items-center justify-between border-100 border-b p-2.5 font-sans font-semibold text-xs text-[#888ca0];
	}
	div.item:hover {
		@apply text-white bg-background-800;
	}
	div.item div {
		@apply flex flex-row text-xs font-medium text-white;
	}
	div.item div span {
		@apply mr-1;
	}
	div.fiat {
		@apply text-[#01D180] align-middle text-center p-2.5 text-xs font-semibold;
	}
	div.fiat:hover {
		@apply text-white bg-[#01D180];
	}
	img {
		@apply w-4 h-4;
	}
</style>
