<script>
	import InfoIconOutline from '$lib/icons/infoIconOutline.svelte';
	import { Modal } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	let showRulesModal = false;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('closeChat', { someData: 'Close chat' });
	}
</script>

<div class="chat_header">
	<h2>Flush Chat</h2>
	<div class="chat_header__icons">
		<button type="button" on:click={() => (showRulesModal = true)}><InfoIconOutline /> </button>
		<button type="button" on:click={handleClose}
			><CloseOutline
				class="w-3 h-3 ml-2 text-white dark:text-white focus:ring-0 dark:focus-within:ring-0"
			/></button
		>
	</div>
</div>

<Modal title="Chat Rules" bind:open={showRulesModal} size="xs" outsideclose>
	<ol class="definition-list py-2">
		<li class="pb-2">
			1. Don't spam, harass or be offensive to other users. Also, avoid using CAPS! No one likes to
			be screamed at!
		</li>

		<li class="pb-2">2. Don't beg or ask for loans, rains, tips and doubling coins.</li>

		<li class="pb-2">3. No suspicious behavior that can be seen as potential scams.</li>

		<li class="pb-2">
			4. Don't engage in any forms of advertising/ trading/ selling/ buying or offering services.
		</li>

		<li class="pb-2">5. Don't use URL shortener. Always submit the original link.</li>

		<li>6. Use the designated language chatrooms accordingly.</li>
	</ol>
</Modal>

<style lang="postcss">
	.chat_header {
		@apply flex items-center justify-between p-[1.22rem] border border-solid border-primary-600 border-t-0;
	}
	.chat_header__icons {
		@apply flex items-center justify-between w-2/12;
	}
	:global(.chat_icon) {
		fill: #929abe;
	}
	:global(.chat_icon:hover) {
		fill: white;
	}
</style>
