<script lang="ts">
	import WalletIcon from '$lib/icons/wallet.svelte';
	import { t } from '$lib/locale/i18n';

	let element: HTMLInputElement;
	let confirmed = false;
	let value = '';
</script>

<span class="section">
	<div class="input">
		<div class="leading-icon">
			<WalletIcon />
		</div>
		<input
			type="wallet"
			name="wallet"
			id="wallet"
			autocomplete="off"
			disabled={true}
			bind:this={element}
			{value}
		/>
	</div>
</span>

<style lang="postcss">
	.section {
		@apply flex w-80;
	}
	div.input {
		@apply relative w-full;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-xs rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
