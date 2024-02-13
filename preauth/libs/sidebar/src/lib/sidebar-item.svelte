<script lang="ts">
	import { page } from '$app/stores';
	import type { Category } from '$lib/data/categories';
	import IconPicker from '$lib/icons/icon-picker.svelte';
	import { relativeHref } from '@infinitro/global';

	export let category: Category;
	export let isMenuAutoCollapse: boolean;
	export let isMenuAutoCollapsed: boolean;
	export let isMenuMobileOpen: boolean;

	let hover: boolean = false;
	let active: boolean = false;
	let href: string = '';

	[href, active] = relativeHref($page.url.pathname, category.href);
	$: {
		[href, active] = relativeHref($page.url.pathname, category.href);
	}

	const link_over = (event: Event) => {
		hover = true;
	};
	const link_out = (event: Event) => {
		hover = false;
	};
</script>

<a
	{href}
	class="flex items-center text-base font-normal rounded-lg hover:text-white group"
	on:mouseenter={link_over}
	on:mouseleave={link_out}
>
	<div
		class="item
        {active ? `active` : ''}"
	>
		<div class="w-[19px]" />
		<span class="icon">
			<IconPicker icon={category.icon} bind:hover bind:active />
		</span>
		{#if !isMenuAutoCollapse || !isMenuAutoCollapsed || isMenuMobileOpen}
			<span class="text {active ? 'active' : ''}">{category.name}</span>
		{/if}
	</div>
</a>

<style lang="postcss">
	div.item {
		@apply flex w-[95%] cursor-pointer items-center py-[9px] mb-[10px] border-l-[5px] border-transparent rounded-e px-[10px]; /* -2xl:px-3  */
	}
	div.active {
		@apply border-[#01D180] bg-[#2C3763];
	}
	span.icon {
		@apply min-h-[14.67px] min-w-[14.67px];
	}
	span.text {
		@apply flex-1 ml-1 text-xs font-bold leading-[25px] tracking-[1px] uppercase whitespace-nowrap;
	}
	span.active {
		@apply text-white;
	}
</style>
