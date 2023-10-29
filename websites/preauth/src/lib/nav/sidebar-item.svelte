<script lang="ts">
	import type { Category } from '$lib/data/categories';
	import IconPicker from '$lib/icons/icon-picker.svelte';

	export let category: Category;
	export let isMenuAutoCollapse: boolean;
	export let isMenuAutoCollapsed: boolean;
	export let isMenuMobileOpen: boolean;
	export let activeCategoryHref: string;

	let hover: boolean = false;
	let active: boolean = category.href === activeCategoryHref;

	const link_over = (event: Event) => {
		hover = true;
	};
	const link_out = (event: Event) => {
		hover = false;
	};
</script>

<a
	href={category.href}
	class="flex items-center text-base font-normal rounded-lg hover:text-white group"
	on:mouseenter={link_over}
	on:mouseleave={link_out}
>
	<div
		class="flex w-[95%] cursor-pointer items-center py-[9px] mb-[10px] border-l-[5px] border-transparent -2xl:px-3 rounded-e px-[10px]
        {active ? `!border-[#01D180] bg-[#2C3763]` : ''}"
	>
		<div class="w-[19px]" />
		<span
			class="min-h-[14.67px] min-w-[14.67px]"
			data-tooltip-id="sidebar-tooltip"
			data-tooltip-html="Slots"
		>
			<IconPicker icon={category.icon} bind:hover bind:active />
		</span>
		{#if !isMenuAutoCollapse || !isMenuAutoCollapsed || isMenuMobileOpen}
			<span
				class="flex-1 ml-1 text-xs font-bold leading-[25px] tracking-[1px] uppercase whitespace-nowrap {active
					? 'text-white'
					: ''}">{category.name}</span
			>
		{/if}
	</div>
</a>
