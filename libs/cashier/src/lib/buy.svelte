<script lang="ts">
	import { locale, t } from '$lib/locale/i18n';
	import Tokens from '$lib/parts/tokens.svelte';
	import Networks from '$lib/parts/networks.svelte';
	import ApplePay from '$lib/icons/applepay.svelte';
	import GooglePay from '$lib/icons/googlepay.svelte';
	import Mastercard from '$lib/icons/mastercard.svelte';
	import Visa from '$lib/icons/visa.svelte';
</script>

<div class="section">
	<Tokens />
	<Networks />
	<p class="disclaimer">{$t('buy_disclaimer')}</p>
	<div class="methods">
		<ApplePay />
		<GooglePay />
		<Visa />
		<Mastercard />
	</div>
	<button class="continue">{$t('i_agree')}</button>
</div>

<style lang="postcss">
	.disclaimer {
		@apply py-8 px-4 w-full flex text-center;
	}
	.methods {
		@apply py-4 w-full flex justify-center;
	}
	button.continue {
		@apply w-full text-white bg-[#01D180] font-medium rounded-lg text-sm px-5 py-2.5 mt-10 text-center;
	}
	button.continue:disabled {
		@apply bg-gray-300;
	}
	button.continue:hover {
		@apply bg-[#00B16c];
	}
	button.continue:focus {
		@apply ring-4 outline-none ring-green-100;
	}
</style>
