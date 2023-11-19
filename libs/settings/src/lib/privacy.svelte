<script lang="ts">
	import PenIcon from '$lib/icons/pen.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { locale, t } from '$lib/locale/i18n';

	let editSettings: boolean = false;
	let disabled: boolean = true;

	let form: HTMLFormElement;

	const toggleSettingsEdit = (event: Event): void => {
		event?.preventDefault();
		editSettings = !editSettings;
		disabled = !editSettings;
	};
</script>

<form bind:this={form}>
	<div class="section">
		<div class="setting">
			<span>
				<label>
					<input type="checkbox" id="setting1" name="setting1" checked {disabled} />
					Hide your total profit
				</label>
				<label>
					<input type="checkbox" id="setting1" name="setting1" {disabled} />
					Hide your total wagered
				</label>
				<label>
					<input type="checkbox" id="setting1" name="setting1" checked {disabled} />
					Hide your bet statistics
				</label>
				<label>
					<input type="checkbox" id="setting1" name="setting1" checked {disabled} />
					Hide your race stats
				</label>
			</span>
			<button on:click={toggleSettingsEdit}>
				{#if !editSettings}
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
	label {
		@apply block py-1;
	}
	input {
		@apply mr-2;
	}
</style>
