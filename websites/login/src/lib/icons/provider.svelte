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

<svg {width} {height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M19.9634 6.5415C20.5923 6.5415 21.1164 6.74984 21.5356 7.16651C21.8501 7.58317 22.0597 8.10401 22.0597 8.62484L13.6746 11.7498L6.33765 9.66651V0.291504H8.32911L15.9805 3.104C16.5046 3.31234 16.819 3.729 16.819 4.24984C16.819 4.56234 16.7142 4.87484 16.5046 5.08317C16.2949 5.29151 15.8757 5.49984 15.5613 5.49984H12.6265L10.7398 4.77067L10.4254 5.70817L12.6265 6.5415H19.9634ZM0.0488281 0.291504H4.24137V11.7498H0.0488281V0.291504Z"
		{fill}
	/>
</svg>
