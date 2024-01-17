<script>
	import { onMount } from 'svelte';
	import DiceBoard from './dice-board.svelte';

	// let mobile = false;
	// let dimensions = { width: 0, height: 0 };

	// // You can create reactive statements for handling dimension changes
	// $: mobile = dimensions.width <= 750;
</script>

<div class="wrapper">
	<div class="main-game-board-wrapper">
		<DiceBoard />
	</div>

	<!-- .main-game-board-wrapper {
	@apply flex flex-col justify-center items-center self-center flex-grow relative h-full overflow-hidden rounded border border-blue-700 bg-blue-800;
	/* Conditional styles for mobile */
	&:mobile {
		@apply max-w-[500px] mr-0 mb-2;
	}
	/* For non-mobile layout */
	&:not(.mobile) {
		@apply max-w-full mr-4 mb-0;
	}
		.wrapper {
		@apply flex flex-grow bg-blue-900 w-full min-w-[300px];
		/* For mobile layout */
		&:mobile {
			@apply flex-col items-center;
		}
		/* For non-mobile layout */
		&:not(.mobile) {
			@apply flex-row;
		}
	}
} -->
</div>

<style lang="postcss">
	.wrapper {
		@apply w-full min-w-[300px];
		background-color: rgb(17, 26, 65);
	}

	.main-game-board-wrapper {
		@apply rounded border;
		background-color: #222c5599;
	}
</style>
