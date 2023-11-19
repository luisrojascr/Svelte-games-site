<script lang="ts">
	import PenIcon from '$lib/icons/pen.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import Currency from '$lib/parts/currency.svelte';
	import Email from '$lib/parts/email.svelte';
	import Username from '$lib/parts/username.svelte';
	import { locale, t } from '$lib/locale/i18n';

	let editCurrency: boolean = false;
	let editEmail: boolean = false;
	let editUsername: boolean = false;

	let form: HTMLFormElement;

	const toggleCurrencyEdit = (event: Event): void => {
		event?.preventDefault();
		editCurrency = !editCurrency;
	};

	const toggleEmailEdit = (event: Event): void => {
		event?.preventDefault();
		editEmail = !editEmail;
	};

	const toggleUsernameEdit = (event: Event): void => {
		event?.preventDefault();
		editUsername = !editUsername;
	};
</script>

<form bind:this={form}>
	<div class="section">
		<div class="setting">
			<span>
				{#if !editUsername}
					<span class="label">Display name:</span><br />
					<span class="value">adamflush</span>
				{:else}
					<Username />
				{/if}
			</span>
			<button on:click={toggleUsernameEdit}>
				{#if !editUsername}
					<PenIcon />
				{:else}
					<RemoveIcon />
				{/if}
			</button>
		</div>
		<div class="setting">
			<span>
				{#if !editEmail}
					<span class="label">Email:</span><br />
					<span class="value">adam@flush.com</span>
				{:else}
					<Email />
				{/if}
			</span>
			<button on:click={toggleEmailEdit}>
				{#if !editEmail}
					<PenIcon />
				{:else}
					<RemoveIcon />
				{/if}
			</button>
		</div>
		<div class="setting">
			<span>
				{#if !editCurrency}
					<span class="label">Currency:</span><br />
					<span class="value">USD</span>
				{:else}
					<Currency />
				{/if}
			</span>
			<button on:click={toggleCurrencyEdit}>
				{#if !editCurrency}
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
