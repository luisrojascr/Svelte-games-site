<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgClose from 'svelte-icons-pack/cg/CgClose';
	import VscInfo from 'svelte-icons-pack/vsc/VscInfo';

	const dispatch = createEventDispatcher();

	function handleOpenRules() {
		dispatch('openRulesModal', { someData: 'Hello from child' });
	}
	function handleClose() {
		dispatch('closeChat', { someData: 'Close chat' });
	}
</script>

<div class="chat_header">
	<h2>Flush Chat</h2>
	<div class="icons">
		<button type="button" on:click={handleOpenRules}
			><Icon src={VscInfo} size="16" className="chat_icon" /></button
		>
		<button type="button" on:click={handleClose}
			><Icon src={CgClose} size="16" className="chat_icon" /></button
		>
	</div>
</div>

<style lang="postcss">
	.chat_header {
		@apply flex items-center justify-between p-[1.22rem] border border-solid border-primary-600 border-t-0;
	}
	.icons {
		@apply flex items-center justify-between w-2/12;
	}
	:global(.chat_icon) {
		fill: #929abe;
	}
	:global(.chat_icon:hover) {
		fill: white;
	}
</style>
