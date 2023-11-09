<script lang="ts">
	import { categories } from '$lib/data/categories';
	import IconPicker from '$lib/icons/icon-picker.svelte';
	import { onDestroy, onMount } from 'svelte';
	import SidebarItem from './sidebar-item.svelte';
	import { menuAutoCollapse, menuAutoCollapsed, menuMobileOpen } from './state';

	let _element: HTMLElement;

	let isMenuAutoCollapse: boolean = false;
	let isMenuAutoCollapsed: boolean = false;
	let isMenuMobileOpen: boolean = false;
	let activeCategoryHref: string = '';
	$: activeCategoryHref = window.location.pathname === '' ? '/' : window.location.pathname;

	const sidebarCategories = categories
		.filter((cat) => cat.sidebarOrder && cat.sidebarOrder > 0)
		.sort((a, b) => (a.sidebarOrder! > b.sidebarOrder! ? 1 : -1));

	menuAutoCollapse.subscribe((value: boolean) => (isMenuAutoCollapse = value));
	menuAutoCollapsed.subscribe((value: boolean) => (isMenuAutoCollapsed = value));
	menuMobileOpen.subscribe((value: boolean) => (isMenuMobileOpen = value));

	const expand_over = (event: Event) => {
		if (!isMenuAutoCollapse || !isMenuAutoCollapsed || isMenuMobileOpen) return;
		menuAutoCollapsed.set(false);
	};
	const expand_out = (event: Event) => {
		if (!isMenuAutoCollapse || isMenuAutoCollapsed || isMenuMobileOpen) return;
		menuAutoCollapsed.set(true);
	};
	const click_out = (event: Event) => {
		if (!isMenuMobileOpen) return;
		console.log(`click_out ${isMenuMobileOpen}`);
		let target: HTMLElement | null = event.target as HTMLElement;
		do {
			if (target == _element || target.id === 'toggleSidebarMobile') {
				return;
			}
			target = target?.parentNode as HTMLElement;
		} while (target);
		menuMobileOpen.set(false);
	};

	// const link_over = (event: Event) => {
	// 	const target = event.currentTarget as HTMLAnchorElement;
	// 	const hover_link = target?.getAttribute('href') || '';
	// 	sidebarCategories.forEach((category) => (category.hover = category.href === hover_link));
	// };
	// const link_out = (event: Event) => {
	// 	sidebarCategories.forEach((category) => (category.hover = false));
	// };

	onMount(() => {
		window.addEventListener('click', click_out);
	});

	onDestroy(() => {
		window.removeEventListener('click', click_out);
	});
</script>

<aside
	id="sidebar"
	class="{!isMenuAutoCollapse || !isMenuAutoCollapsed || isMenuMobileOpen
		? 'w-60'
		: 'w-16'} {isMenuMobileOpen
		? 'visible'
		: 'hidden'} bg-[#111A41] lg:visible lg:flex fixed top-0 left-0 z-0 flex-col flex-shrink-0 pt-16 h-full duration-75 transition-width"
	aria-label="Sidebar"
	bind:this={_element}
	on:mouseenter={expand_over}
	on:mouseleave={expand_out}
>
	<div
		class="flex relative flex-col flex-1 pt-2 min-h-0 bg-[#111A41] text-[#a7abbb] fg-red border-r border-t border-[#2D3969]"
	>
		{#each sidebarCategories as category}
			<SidebarItem
				bind:isMenuAutoCollapse
				bind:isMenuAutoCollapsed
				bind:isMenuMobileOpen
				bind:activeCategoryHref
				{category}
			/>
		{/each}
	</div>
</aside>
<div
	class="{!isMenuMobileOpen
		? 'hidden'
		: ''} lg:hidden fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90"
	id="sidebarBackdrop"
/>
