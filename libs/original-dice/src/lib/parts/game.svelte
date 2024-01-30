<script>
	import DiceBoard from './dice-board.svelte';
	import DiceSidebar from './dice-sidebar.svelte';

	// let mobile = false;
	// let dimensions = { width: 0, height: 0 };

	// // You can create reactive statements for handling dimension changes
	// $: mobile = dimensions.width <= 750;
</script>

<div class="wrapper">
	<div class="main-game-board-wrapper">
		<DiceBoard />
	</div>

	<DiceSidebar />
</div>

<style lang="postcss">
	.wrapper {
		@apply flex gap-3.5 grow bg-primary-900 w-full min-w-[300px];
	}

	.main-game-board-wrapper {
		@apply rounded border bg-[#222c5599] w-full flex-col justify-center items-center grow select-none relative overflow-hidden border-[#2c3763];
	}
</style>
