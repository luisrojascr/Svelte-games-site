<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ChatFooter from './components/chatFooter.svelte';
	import ChatHeader from './components/chatHeader.svelte';
	import ChatMessage from './components/chatMessage.svelte';
	import Modal from './components/modal.svelte';
	import data from './data/messageData.json';

	const dispatch = createEventDispatcher();

	const messagesData = data.messagesData;
	let showModal = false;

	function handleOpenRules(event: any) {
		dispatch('openRulesModal', event.detail);
		showModal = true;
	}

	function handleCloseChat(event: any) {
		dispatch('closeChat', event.detail);
	}
</script>

<div class="chat_container">
	<ChatHeader on:openRulesModal={handleOpenRules} on:closeChat={handleCloseChat} />
	<Modal bind:showModal>
		<h2 slot="header" class="text-white">Chat Rules</h2>
		<ol class="definition-list py-4">
			<li class="pb-2">
				1. Don't spam, harass or be offensive to other users. Also, avoid using CAPS! No one likes
				to be screamed at!
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
	<div class="chat_content">
		<ChatMessage {messagesData} />
	</div>
	<ChatFooter />
</div>

<style lang="postcss">
	.chat_container {
		@apply flex relative flex-col z-50 overflow-hidden top-0 right-0 bottom-0 bg-primary-900 text-white border-l border-l-primary-600 w-80 h-screen;
	}
	.chat_content {
		@apply overflow-x-hidden min-h-0 overflow-y-auto break-words w-full px-4 py-3;
	}
</style>
