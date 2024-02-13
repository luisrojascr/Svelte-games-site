<script lang="ts">
	import { icon, iconActive, iconHover } from './colors';
	export let size: number = 20;
	export let active: boolean = false;
	export let hover: boolean = false;
	export let color: string | undefined = undefined;
	let width = size;
	let height: number = Math.floor(0.8 * width);
	let fill: string = color ? color : active ? iconActive : hover ? iconHover : icon;
	$: fill = color ? color : active ? iconActive : hover ? iconHover : icon;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M12.9651 5.04688C10.6307 0.90625 3.78387 0 3.78387 0C3.78387 0 6.94324 3.45 2.90574 6.17812C0.35262 7.9 -0.656755 10.1375 0.436995 12.5813C1.27449 14.4531 3.04637 15.2156 4.95574 15.5C4.04324 13.7781 4.74949 11.675 4.82762 11.45C6.61199 14.15 9.98387 11.45 8.29012 8.51562C10.5089 8.99687 10.8401 12.8469 9.13699 15.25C11.6526 14.4594 13.3276 12.4719 13.787 10.7C14.2714 8.84687 13.9026 6.70312 12.9651 5.04688V5.04688Z"
		{fill}
	/>
</svg>
