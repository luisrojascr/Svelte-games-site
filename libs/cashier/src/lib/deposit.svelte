<script lang="ts">
	import { locale, t } from '$lib/locale/i18n';
	import Tokens from '$lib/parts/tokens.svelte';
	import Networks from '$lib/parts/networks.svelte';
	import Address from '$lib/parts/address.svelte';
	import QrCode from 'svelte-qrcode';
	import Connects from '$lib/parts/connects.svelte';
</script>

<div>
	<Tokens />
	<Networks />
	<div class="qr">
		<div>
			<div>
				<QrCode value="https://github.com/" />
			</div>
		</div>
	</div>
	<Address />
	<Connects />
</div>

<style lang="postcss">
	.qr {
		@apply py-4 w-1/2 flex justify-center;
	}
	.qr div {
		@apply border bg-background-950 border-100 p-2;
	}
	.qr div div {
		@apply border bg-background-900 border-100 p-1;
	}
</style>
