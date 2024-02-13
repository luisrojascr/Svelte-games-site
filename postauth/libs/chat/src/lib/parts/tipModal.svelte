<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';

	export let showTipModal = false;
	let inputValue = '';

	function formatAsCurrency(value: string): string {
		const numericValue = parseInt(value.replace(/[^\d.]/g, '')) || 0;

		return new Intl.NumberFormat('en-US', {
			style: 'decimal',
			maximumFractionDigits: 2
		}).format(numericValue);
	}

	function handleInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		inputValue = formatAsCurrency(target.value);
	}
</script>

<Modal title="Tip" bind:open={showTipModal} size="xs" outsideclose>
	<div>
		<label for="amount-field" class="">Amount<span> *</span></label>

		<div class="tip_modal_content">
			<span>$</span>
			<input
				type="text"
				name="amount"
				autocomplete="off"
				id="amount-field"
				bind:value={inputValue}
				on:input={handleInput}
				class="focus:ring-0"
			/>
		</div>
		<small class="mt-3">* Wager $200.00 or more to tip.</small>
		<div class="mt-4">
			<input type="checkbox" id="proof-checkbox-29145" class="" />
			<label for="proof-checkbox-29145" class="css-v4cen2">Don't show tip in chat</label>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<div class="flex">
			<Button color="alternative">Cancel</Button>
			<Button color="green" class="ml-3">Send Tip</Button>
		</div>
	</svelte:fragment>
</Modal>

<style lang="postcss">
	.tip_modal_content {
		@apply flex items-center w-full rounded border border-solid border-primary-600 h-12 pl-3 text-xl;
	}
	.tip_modal_content input {
		@apply border-0 p-0 bg-transparent text-white w-full h-full outline-none pl-2 text-xl;
	}
</style>
