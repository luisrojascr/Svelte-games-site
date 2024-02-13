<script lang="ts">
	import LanguageSelector from '$lib/locale/selector.svelte';
	import { loggedIn } from '@infinitro/global';

	let isLoggedIn: boolean | undefined = undefined;
	loggedIn.subscribe((value) => {
		isLoggedIn = value;
	});

	const logout = (event: Event) => {
		event.preventDefault();
		loggedIn.set(false);
	};
</script>

<div>
	<div class="testwrapper">
		<LanguageSelector />
		{#if isLoggedIn}
			<button on:click={logout}>Logout</button>
		{/if}
	</div>
	<slot />
</div>

<style lang="postcss">
	div.testwrapper {
		@apply bg-background-950 text-white p-1 border-b-2 border-b-red-500 flex flex-row w-full;
	}
	button {
		@apply bg-background-900 text-white text-sm p-2 rounded-md border border-100 ml-4;
	}
	button:focus,
	button:hover {
		@apply border-blue-500;
	}
</style>
