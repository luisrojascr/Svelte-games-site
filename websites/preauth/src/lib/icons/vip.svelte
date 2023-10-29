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
		d="M13.2 13.3016H2.8C2.58 13.3016 2.4 13.4816 2.4 13.7016V14.5016C2.4 14.7216 2.58 14.9016 2.8 14.9016H13.2C13.42 14.9016 13.6 14.7216 13.6 14.5016V13.7016C13.6 13.4816 13.42 13.3016 13.2 13.3016ZM14.8 5.30156C14.1375 5.30156 13.6 5.83906 13.6 6.50156C13.6 6.67906 13.64 6.84406 13.71 6.99656L11.9 8.08156C11.515 8.31156 11.0175 8.18156 10.795 7.79156L8.7575 4.22656C9.025 4.00656 9.2 3.67656 9.2 3.30156C9.2 2.63906 8.6625 2.10156 8 2.10156C7.3375 2.10156 6.8 2.63906 6.8 3.30156C6.8 3.67656 6.975 4.00656 7.2425 4.22656L5.205 7.79156C4.9825 8.18156 4.4825 8.31156 4.1 8.08156L2.2925 6.99656C2.36 6.84656 2.4025 6.67906 2.4025 6.50156C2.4025 5.83906 1.865 5.30156 1.2025 5.30156C0.54 5.30156 0 5.83906 0 6.50156C0 7.16406 0.5375 7.70156 1.2 7.70156C1.265 7.70156 1.33 7.69156 1.3925 7.68156L3.2 12.5016H12.8L14.6075 7.68156C14.67 7.69156 14.735 7.70156 14.8 7.70156C15.4625 7.70156 16 7.16406 16 6.50156C16 5.83906 15.4625 5.30156 14.8 5.30156Z"
		{fill}
	/>
</svg>
