<script lang="ts">
	import Game from '$lib/parts/game.svelte';
</script>

<div class="container">
	<Game />
</div>

<style lang="postcss">
	.container {
		@apply p-4;
	}

	@media (min-width: 1537px) {
		.container {
			max-width: 100%;
		}
	}
</style>
