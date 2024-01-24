<script>
	import { onMount } from 'svelte';
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
		display: flex;
		-webkit-box-flex: 1;
		flex-grow: 1;
		background-color: rgb(17, 26, 65);
		width: 100%;
		min-width: 300px;
		padding: 30px 0px;
		background-color: rgb(17, 26, 65);
	}

	.main-game-board-wrapper {
		@apply rounded border;
		background-color: #222c5599;
		width: 100%;
		/* display: flex; */
		flex-direction: column;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		align-self: center;
		-webkit-box-flex: 1;
		flex-grow: 1;
		user-select: none;
		position: relative;
		height: 100%;
		overflow: hidden;
		border-radius: 4px;
		border: solid 1px #313d6b;
		border: solid 1px #2c3763;
		/* background-color: #222c56; */
		/* background-color: #222c5599; */
	}
</style>
