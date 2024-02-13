<script lang="ts">
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

{#if isLoggedIn}
	<button on:click={logout}>Logout</button>
{/if}

<style lang="postcss">
	button {
		@apply bg-background-900 text-white text-sm p-2 rounded-md border border-100 ml-4;
	}
	button:focus,
	button:hover {
		@apply border-blue-500;
	}
</style>
