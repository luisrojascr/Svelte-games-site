<script lang="ts">
	import Sidebar from '$lib/nav/sidebar.svelte';
	import { menuAutoCollapsed } from '$lib/nav/state';
	import Topnav from '$lib/nav/topnav.svelte';
	import { Chat } from '@infintro/chat';
	import '../app.postcss';

	let showChatSidebar = false;
	// menu auto-collapse indicates whether the sidebar menu should autocollapse on desktop
	// this is set by the hamburger menu button in the topnav when in deskptop (lg) viewarea
	let _menuAutoCollapsed: boolean = false;
	menuAutoCollapsed.subscribe((value: boolean) => (_menuAutoCollapsed = value));

	console.log(`PreAuth website version ${import.meta.env.VITE_APP_VERSION}`);

	function handleCloseChat(event: CustomEvent<{ data: string }>) {
		console.log('handleCloseChat Event received:', event.detail);
		showChatSidebar = false;
	}

	function handleChatToggle(event: MouseEvent) {
		showChatSidebar = !showChatSidebar;
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
</svelte:head>

<div class="main-container">
	<div class="main-wrapper">
		<Topnav />
		<div class="flex h-full overflow-y-visible">
			<Sidebar />
			<div id="main-content" class="main-content">
				<slot />
			</div>
		</div>
	</div>
	{#if showChatSidebar}
		<Chat on:closeChat={handleCloseChat} />
	{/if}
</div>
<button type="button" on:click={handleChatToggle} class="btn-chat-sidebar hidden lg:flex"
	><img src="./chat.svg" alt="" /></button
>

<style type="postcss">
	.main-container {
		@apply flex bg-primary-900 w-full h-full relative;
	}
	.main-wrapper {
		@apply w-full h-screen flex flex-col overflow-hidden relative;
	}
	.main-content {
		@apply flex overflow-hidden h-screen bottom-0 right-0 top-16 left-0 flex-1;
	}
	.btn-chat-sidebar {
		@apply fixed justify-center border-t border-t-primary-600 border-l border-l-primary-600 border-b border-b-primary-600 py-3 px-2 right-0 bottom-4 cursor-pointer rounded-l;
	}
	.btn-chat-sidebar:hover {
		@apply border-l-[#4769fc] border-t-[#4769fc] border-b-[#4769fc];
	}
	:global(body) {
		@apply bg-primary-900;
	}
</style>
