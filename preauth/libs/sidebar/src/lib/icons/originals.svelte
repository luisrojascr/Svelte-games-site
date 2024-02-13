<script lang="ts">
	import { icon, iconActive, iconHover } from './colors';
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
	<path d="M11.3566 3.78516H5.24023L8.30533 14.0001L11.3566 3.78516Z" {fill} />
	<path d="M4.70345 2.71643L7.3374 0H2.34277L4.70345 2.71643Z" {fill} />
	<path d="M3.77081 2.90546L1.5767 0.380859L0 2.90546H3.77081Z" {fill} />
	<path d="M9.26855 0L11.89 2.73016L14.2684 0H9.26855Z" {fill} />
	<path d="M10.9046 2.90491H5.68164L8.3063 0.201172L10.9046 2.90491Z" {fill} />
	<path d="M16.5231 3.7832L9.33496 13.3365L12.1882 3.7832H16.5231Z" {fill} />
	<path d="M15.0357 0.380859L12.8359 2.90613H16.6129L15.0357 0.380859Z" {fill} />
	<path d="M7.27356 13.3322L0.0898438 3.7832H4.4115L7.27356 13.3322Z" {fill} />
</svg>
