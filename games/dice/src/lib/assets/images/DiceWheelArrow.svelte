<script lang="ts">
	export let style: string = '';
</script>

<svg class="wrapper" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598 578" {style}>
	<path
		fill="#FFFFFF"
		d="M311.75,192.57L299,7.52l-12.75,185c-53.26,7.04-90.72,55.92-83.68,109.18  c7.04,53.26,55.92,90.72,109.18,83.68s90.72-55.92,83.68-109.18c-5.77-43.61-40.08-77.92-83.68-83.68V192.57z M299,372.27  c-45.99,0-83.27-37.28-83.27-83.27s37.28-83.27,83.27-83.27s83.27,37.28,83.27,83.27c0,0,0,0,0,0  C382.21,334.97,344.97,372.21,299,372.27z"
	/>
</svg>

<style>
	.wrapper {
		z-index: 10;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		stroke-width: 0;
		transform-origin: center center;
		transition-property: transform;
		transition-duration: 400ms;
		transition-timing-function: cubic-bezier(0.62, -0.04, 0.13, 1.12);
		will-change: transform;
	}
</style>
