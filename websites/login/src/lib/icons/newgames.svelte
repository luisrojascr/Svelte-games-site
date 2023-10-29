<script lang="ts">
	import { icon, iconHover, iconActive } from '$lib/theme/theme';
	export let size: number = 20;
	export let active: boolean = false;
	export let hover: boolean = false;
	export let color: string | undefined = undefined;
	let width = size;
	let height: number = Math.floor(0.8 * width);
	let fill = color ? color : active ? iconActive : hover ? iconHover : icon;
	$: fill = color ? color : active ? iconActive : hover ? iconHover : icon;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M7.5 0.625C3.70313 0.625 0.625 3.70313 0.625 7.5C0.625 11.2969 3.70313 14.375 7.5 14.375C11.2969 14.375 14.375 11.2969 14.375 7.5C14.375 3.70313 11.2969 0.625 7.5 0.625ZM8.125 10C8.125 10.1658 8.05915 10.3247 7.94194 10.4419C7.82473 10.5592 7.66576 10.625 7.5 10.625C7.33424 10.625 7.17527 10.5592 7.05806 10.4419C6.94085 10.3247 6.875 10.1658 6.875 10V8.125H5C4.83424 8.125 4.67527 8.05915 4.55806 7.94194C4.44085 7.82473 4.375 7.66576 4.375 7.5C4.375 7.33424 4.44085 7.17527 4.55806 7.05806C4.67527 6.94085 4.83424 6.875 5 6.875H6.875V5C6.875 4.83424 6.94085 4.67527 7.05806 4.55806C7.17527 4.44085 7.33424 4.375 7.5 4.375C7.66576 4.375 7.82473 4.44085 7.94194 4.55806C8.05915 4.67527 8.125 4.83424 8.125 5V6.875H10C10.1658 6.875 10.3247 6.94085 10.4419 7.05806C10.5592 7.17527 10.625 7.33424 10.625 7.5C10.625 7.66576 10.5592 7.82473 10.4419 7.94194C10.3247 8.05915 10.1658 8.125 10 8.125H8.125V10Z"
		{fill}
	/>
</svg>
