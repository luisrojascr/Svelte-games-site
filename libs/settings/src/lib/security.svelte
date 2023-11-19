<script lang="ts">
	import PenIcon from '$lib/icons/pen.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import Password from '$lib/parts/password.svelte';
	import Totp from '$lib/parts/totp.svelte';
	import Wallet from '$lib/parts/wallet.svelte';
	import { locale, t } from '$lib/locale/i18n';

	let editPassword: boolean = false;
	let editTotp: boolean = false;
	let editWallet: boolean = false;

	let form: HTMLFormElement;

	const togglePasswordEdit = (event: Event): void => {
		event?.preventDefault();
		editPassword = !editPassword;
	};

	const toggleTotpEdit = (event: Event): void => {
		event?.preventDefault();
		editTotp = !editTotp;
	};

	const toggleWalletEdit = (event: Event): void => {
		event?.preventDefault();
		editWallet = !editWallet;
	};
</script>

<form bind:this={form}>
	<div class="section">
		<div class="setting">
			<span>
				{#if !editPassword}
					<span class="label">Password:</span><br />
					<span class="value">****************</span>
				{:else}
					<Password />
				{/if}
			</span>
			<button on:click={togglePasswordEdit}>
				{#if !editPassword}
					<PenIcon />
				{:else}
					<RemoveIcon />
				{/if}
			</button>
		</div>
		<div class="setting">
			<span>
				{#if !editTotp}
					<span class="label">TOTP:</span><br />
					<span class="value">******</span>
				{:else}
					<Totp />
				{/if}
			</span>
			<button on:click={toggleTotpEdit}>
				{#if !editTotp}
					<PenIcon />
				{:else}
					<RemoveIcon />
				{/if}
			</button>
		</div>
		<div class="setting">
			<span>
				{#if !editWallet}
					<span class="label">Wallet:</span><br />
					<span class="value">0xabcdef</span>
				{:else}
					<Wallet />
				{/if}
			</span>
			<button on:click={toggleWalletEdit}>
				{#if !editWallet}
					<PenIcon />
				{:else}
					<RemoveIcon />
				{/if}
			</button>
		</div>
	</div>
</form>

<style lang="postcss">
	div.setting {
		@apply py-3 border-[#313d6b] border-t w-full flex  flex-row justify-between items-center;
	}
	span.value {
		@apply text-[#afb8d4] font-light text-xs;
	}
</style>
