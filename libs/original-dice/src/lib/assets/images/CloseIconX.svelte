<script>
	export let width = '12';
	export let height = '12';
	export let stroke = '#7B8AC5';
</script>

<svg {width} {height} viewBox="0 0 12 12">
	<g
		fill="none"
		fill-rule="evenodd"
		{stroke}
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
	>
		<path d="M10 0L0 10M10 10L0 0" transform="translate(1 1)" />
	</g>
</svg>
