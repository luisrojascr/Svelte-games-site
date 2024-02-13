<script lang="ts">
	export let stroke: number;
	export let progress: number;
	export let frontColor: string = '';
	export let backColor: string = '';

	// Constants and reactive statements
	const radius = 163; // This was hard-coded in the original example
	const circumference = radius * 2 * Math.PI;

	// Derived value for strokeDashoffset
	$: strokeDashoffset = circumference - (progress / 100) * circumference;
</script>

<svg class="diceWheelCircleV2SVG" viewBox="0 0 400 400">
	<circle r={radius} cx="200" cy="200" stroke-width="14" fill="none" stroke="rgb(17, 26, 65)" />

	<circle r={radius} cx="200" cy="200" stroke-width={stroke} fill="none" stroke={backColor} />

	<circle
		r={radius}
		cx="200"
		cy="200"
		fill="transparent"
		stroke-width={stroke}
		stroke={frontColor}
		stroke-dasharray={`${circumference} ${circumference}`}
		style={`stroke-dashoffset: ${strokeDashoffset}`}
	/>
</svg>

<style>
	.diceWheelCircleV2SVG {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%) rotate(-90deg);
	}
</style>
