<script lang="ts">
	import { locale, t } from '$lib/locale/i18n';

	const isFramed = window.self !== window.top;
	let form: HTMLFormElement;

	const close = (event: Event): void => {
		event?.preventDefault();
		window.parent.postMessage({ showModal: false }, '*');
	};
</script>

<form bind:this={form}>
	<div class="underlay" />
	<div class="overlay">
		<div class="center">
			<div class="modal">
				{#if isFramed}
					<button class="close" on:click={close}>x</button>
				{/if}
				{$t('modal_dialog')}
			</div>
		</div>
	</div>
</form>

<style lang="postcss">
	div.underlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full bg-black opacity-20;
	}
	div.overlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full flex items-center justify-center;
	}
	div.center {
		@apply relative w-full max-w-lg max-h-full m-auto top-auto;
	}
	div.modal {
		@apply relative bg-background-950 rounded-lg shadow p-10 border border-100 flex  flex-col justify-between space-y-6 text-white;
	}
	button.close {
		@apply absolute top-0 right-0 text-gray-500 text-base font-medium border-[1px] border-gray-600 w-8 h-8 flex items-center justify-center rounded-lg;
	}
	button.close:hover {
		@apply text-gray-400  border-gray-500;
	}
</style>
