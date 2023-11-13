<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import WalletIcon from '$lib/icons/wallet.svelte';
	import { t } from '$lib/locale/i18n';
	import { stateWalletAddress, stateWalletConfirmed } from '../state';

	let element: HTMLInputElement;
	let confirmed = false;
	let value = '';

	stateWalletAddress.subscribe((_value) => {
		if (_value) {
			value = _value;
			if (element) element.value = value;
		}
	});
	stateWalletConfirmed.subscribe((value) => {
		confirmed = value;
	});

	const onRemove = (event: Event) => {
		event.preventDefault();
		stateWalletAddress.set('');
		value = '';
		stateWalletConfirmed.set(false);
		confirmed = false;
	};
</script>

<span class="section">
	<div class="relative w-full">
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
			placeholder={$t('wallet_address')}
			{value}
		/>
		{#if confirmed}
			<a class="trailing-icon" href={'#'} on:click={onRemove} tabindex="-1">
				<RemoveIcon />
			</a>
		{/if}
	</div>
	{#if confirmed}
		<CheckIcon />
	{/if}
</span>

<style lang="postcss">
	.section {
		@apply pt-4 flex;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-auto;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-xs rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
