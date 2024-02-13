<script lang="ts">
	import { spring } from 'svelte/motion';
	import { fly, scale } from 'svelte/transition';
</script>

<button class="tile-button">
	<div transition:fly={{ y: 20, duration: 300 }}>
		<div transition:scale={{ duration: 300 }}>
			<div class="tile-content"></div>
		</div>
	</div>
	<div class="tile-cover"></div>
</button>

<style lang="postcss">
	.tile-button {
		position: relative;
		font-size: 1.5em;
		border-radius: 4px;
		transition-duration: 300ms;
		transition-property: background-color, box-shadow;
		padding: 0;
		margin: 0;
	}

	.tile-button::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	.tile-button:active {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	.tile-button:disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 1;
	}

	.tile-cover {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		transition-duration: 300ms;
		transition-property: background-color;
		box-shadow: 0 3px 0 0 rgb(17, 26, 65);
		border-radius: 0.3em;
		background-color: rgb(71, 82, 124);
		opacity: 1;
	}

	.tile-cover:hover {
		background-color: rgb(104, 117, 167);
		transition-duration: 300ms;
		transition-property: background-color, box-shadow;
	}

	.tile-content {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;

		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
		background-color: rgb(17, 26, 65);
	}

	.tile-content svg {
		width: 100%;
		height: 100%;
		transform: translate3d(0px, 0px, 0px);
	}
</style>
