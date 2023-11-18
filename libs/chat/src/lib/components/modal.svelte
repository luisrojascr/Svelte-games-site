<script lang="ts">
	// @ts-nocheck
	import CgClose from 'svelte-icons-pack/cg/CgClose';
	import Icon from 'svelte-icons-pack/Icon.svelte';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="flex justify-between">
			<slot name="header" />
			<button type="button" class="text-gray-100 hover:text-white" on:click={() => dialog.close()}
				><Icon src={CgClose} size="16" className="chat_icon" /></button
			>
		</div>
		<hr class="mt-3 border-b border-gray-200" />
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 35em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: #111a41;
		color: #929abe;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
