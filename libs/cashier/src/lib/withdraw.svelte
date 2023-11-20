<script lang="ts">
	import { locale, t } from '$lib/locale/i18n';
	import Connects from '$lib/parts/connects.svelte';
	import Networks from './parts/networks.svelte';
	import Tokens from './parts/tokens.svelte';
	import Wallet from './parts/wallet.svelte';
</script>

<div>
	<Tokens />
	<Networks />
	<Wallet />
	<Connects />
</div>
