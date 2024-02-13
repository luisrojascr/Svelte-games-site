<script lang="ts">
	import data from '$lib/data/messageData.json';
	import ChatFooter from '$lib/parts/chatFooter.svelte';
	import ChatHeader from '$lib/parts/chatHeader.svelte';
	import ChatMessage from '$lib/parts/chatMessage.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const messagesData = data.messagesData;

	function handleCloseChat(event: any) {
		dispatch('closeChat', event.detail);
	}
</script>

<div class="chat_container">
	<ChatHeader on:closeChat={handleCloseChat} />
	<div class="chat_content">
		<ChatMessage {messagesData} />
	</div>
	<ChatFooter />
</div>

<style lang="postcss">
	.chat_container {
		@apply flex absolute right-0 flex-col z-50 overflow-hidden top-0 right-0 bottom-0 bg-primary-900 text-white border-l border-l-primary-600 w-[25rem] h-screen;
	}
	.chat_content {
		@apply overflow-x-hidden min-h-0 overflow-y-auto break-words w-full px-4 py-3;
	}
</style>
