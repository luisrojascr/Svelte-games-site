<script lang="ts">
	import { icon, iconHover, iconActive } from '$lib/theme/theme';
	export let size: number = 20;
	export let active: boolean = false;
	export let hover: boolean = false;
	export let color: string | undefined = undefined;
	let width: number = size;
	let height: number = Math.floor(0.8 * width);
	let fill: string = color ? color : active ? iconActive : hover ? iconHover : icon;
	$: fill = color ? color : active ? iconActive : hover ? iconHover : icon;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M12.9735 6.23807L12.5023 5.76688L7.73543 1L2.96069 5.76688L2.4895 6.23807C1.17017 7.55741 1.17017 9.69347 2.4895 11.0128C3.14917 11.6725 4.01302 12.0023 4.87687 12.0023C5.74072 12.0023 6.60457 11.6725 7.26423 11.0128L7.73543 10.5416L8.20662 11.0128C8.86628 11.6725 9.73014 12.0023 10.594 12.0023C11.4578 12.0023 12.3217 11.6725 12.9814 11.0128C14.2928 9.69347 14.2928 7.54955 12.9735 6.23807ZM10.3662 7.90295L10.1306 8.13854L7.73543 10.5338L5.34021 8.13854L5.10461 7.90295C4.44494 7.24328 4.44494 6.16739 5.10461 5.50773C5.43444 5.17789 5.86637 5.01298 6.30615 5.01298C6.73807 5.01298 7.17 5.17789 7.50768 5.50773L7.74328 5.74332L7.97887 5.50773C8.30871 5.17789 8.74064 5.01298 9.18041 5.01298C9.62019 5.01298 10.0443 5.17789 10.3819 5.50773C11.0259 6.16739 11.0259 7.23543 10.3662 7.90295Z"
		{fill}
		style="fill: {fill};"
	/>
	<path
		d="M10.0006 13.7457L7.74609 11.4912L5.49159 13.7457L7.7461 16.0002L10.0006 13.7457Z"
		{fill}
	/>
</svg>
