<script lang="ts">
	import WelcomeBanner from './welcome.svelte';
</script>

<div class="banner">
	<WelcomeBanner />
</div>
<div class="content">
	<div class="buttons">
		<button class="accept">Accept</button>
		<button class="decline">Decline</button>
	</div>
</div>

<style lang="postcss">
	div.banner {
		@apply w-full flex justify-center;
	}
	div.content {
		@apply px-10 pb-8;
	}
	div.buttons {
		@apply w-full flex flex-row justify-around p-5;
	}
	div.buttons button {
		@apply w-1/3 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
	}
	div.buttons button.accept {
		@apply text-white bg-green-700;
	}
	div.buttons button.decline {
		@apply text-white bg-red-700;
	}
	p.top-caption {
		@apply pb-2 pt-2 text-gray-400;
	}
</style>
