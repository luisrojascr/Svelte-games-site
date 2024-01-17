<script lang="ts">
	export let stroke: number;
	export let progress: number;
	export let frontColor: string;
	export let backColor: string;

	const circumference = 163 * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
</script>

<svg class="wrapper" viewBox="0 0 400 400">
	<circle r="163" cx="200" cy="200" stroke-width="14" fill="none" stroke="rgb(17, 26, 65)" />
	<circle r="163" cx="200" cy="200" stroke-width={stroke} fill="none" stroke={backColor} />
	<circle
		stroke={frontColor}
		fill="transparent"
		stroke-width={stroke}
		stroke-dasharray={`${circumference} ${circumference}`}
		style="stroke-dashoffset: {strokeDashoffset};"
		r="163"
		cx="200"
		cy="200"
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
