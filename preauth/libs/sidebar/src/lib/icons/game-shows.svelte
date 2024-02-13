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

<svg {width} {height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M7.37812 11.3438L13.2188 7.625L7.37812 3.90625V11.3438ZM6.21875 16.375V14.625H2.0625C1.7125 14.625 1.40625 14.4937 1.14375 14.2312C0.88125 13.9687 0.75 13.6625 0.75 13.3125V1.9375C0.75 1.5875 0.88125 1.28125 1.14375 1.01875C1.40625 0.75625 1.7125 0.625 2.0625 0.625H16.9375C17.2875 0.625 17.5938 0.75625 17.8562 1.01875C18.1187 1.28125 18.25 1.5875 18.25 1.9375V13.3125C18.25 13.6625 18.1187 13.9687 17.8562 14.2312C17.5938 14.4937 17.2875 14.625 16.9375 14.625H12.7812V16.375H6.21875Z"
		{fill}
	/>
</svg>
