<script lang="ts">
	import eurSVG from '$lib/assets/images/fiatSection/eur.svg';
	import jpySVG from '$lib/assets/images/fiatSection/jpy.svg';
	import usdSVG from '$lib/assets/images/fiatSection/usd.svg';

	import { FiatCurrencyEnum } from '$lib/utils/cc.js';

	export let coin: FiatCurrencyEnum | undefined | string | null;
	export let biggerIcon = false;
	export let mediumIcon = false;
	export let walletSize = false;

	$: widthSize = biggerIcon ? '20px' : mediumIcon ? '16px' : '12px';
	$: heightSize = biggerIcon ? '20px' : walletSize ? '18px' : '16px';
	$: paddingBottom = walletSize ? '2px' : '';
</script>

{#if coin === 'USD'}
	<img
		src={usdSVG}
		alt="USD"
		style={`width: ${widthSize}; height: ${heightSize}; padding-bottom: ${paddingBottom};`}
	/>
{:else if coin === 'JPY'}
	<img
		src={jpySVG}
		alt="JPY"
		style={`width: ${widthSize}; height: ${heightSize}; padding-bottom: ${paddingBottom};`}
	/>
{:else if coin === 'EUR'}
	<img
		src={eurSVG}
		alt="EUR"
		style={`width: ${widthSize}; height: ${heightSize}; padding-bottom: ${paddingBottom};`}
	/>
{:else}
	<span style="font-size: 10px; color: #ffffff; flex-shrink: 0;">?</span>
{/if}
