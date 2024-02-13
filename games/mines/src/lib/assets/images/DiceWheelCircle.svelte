<script lang="ts">
	export let strokeDashoffset: number;
</script>

<svg class="wrapper" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
	<circle r="144" cx="200" cy="200" stroke-width="14" fill="none" stroke="#01d180" />
	<circle
		r="144"
		cx="200"
		cy="200"
		stroke-width="14"
		fill="none"
		stroke="#ff2c55"
		stroke-dasharray="904.7786842338604"
		stroke-dashoffset={strokeDashoffset}
	/>
</svg>

<style>
	.wrapper {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%) rotate(-90deg);
	}
</style>
