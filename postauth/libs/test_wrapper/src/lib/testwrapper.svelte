<script lang="ts">
	import LanguageSelector from '$lib/locale/selector.svelte';
	import TestUser from '$lib/test/testuser.svelte';
</script>

<div>
	<div class="testwrapper space-x-6">
		<LanguageSelector />
		<TestUser />
	</div>
	<slot />
</div>

<style lang="postcss">
	div.testwrapper {
		@apply bg-background-950 text-white p-1 border-b-2 border-b-red-500 flex flex-row w-full space-x-6;
	}
</style>
