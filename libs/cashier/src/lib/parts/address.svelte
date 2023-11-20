<script lang="ts">
	import CopyIcon from '$lib/icons/copy.svelte';
	import { t } from '$lib/locale/i18n';

	let element: HTMLInputElement;
	let confirmed = false;
	let value = '';
</script>

<span class="section">
	<div class="input">
		<input
			class="input"
			type="text"
			name="address"
			id="address"
			autocomplete="off"
			bind:this={element}
			disabled={true}
			{value}
		/>
		<div class="trailing-icon">
			<CopyIcon />
		</div>
	</div>
</span>

<style lang="postcss">
	.section {
		@apply flex w-full;
	}
	div.input {
		@apply relative w-full;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer;
	}
	input,
	input:disabled {
		@apply border bg-background-950 border-100 text-white text-base block w-full p-2.5 pl-2 rounded-sm;
	}
	input:focus {
		@apply ring-blue-500 border-blue-500;
	}
</style>
