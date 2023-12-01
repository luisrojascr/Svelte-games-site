<script lang="ts">
	import close from '$lib/assets/close.svg';
	import snow from '$lib/assets/snow.png';
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
	<!-- svelte-ignore a11y-img-redundant-alt a11y-no-static-element-interactions -->
	<img src={snow} alt="Snow image" class="snow-image" />
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="close">
		<button type="button" class="close-btn" on:click={() => dialog.close()}
			><img src={close} alt="Close" /></button
		>
		<slot />
	</div>
</dialog>

<style lang="postcss">
	.snow-image {
		@apply absolute top-[-15px] left-[-14px] max-w-fit;
	}
	div.close {
		@apply relative p-3;
	}
	.close-btn {
		@apply absolute right-0 top-1;
	}
	.close-btn img {
		@apply w-[15px];
	}
	dialog {
		@apply rounded-lg max-w-2xl bg-primary-900 p-2 relative overflow-visible w-[347px];
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
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
</style>
