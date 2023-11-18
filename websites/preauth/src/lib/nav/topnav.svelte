<script lang="ts">
	import FlushLogo from '$lib/icons/flush-logo.svelte';
	import SearchIcon from '$lib/icons/search.svelte';
	import VipIcon from '$lib/icons/vip.svelte';
	import { menuAutoCollapse, menuAutoCollapsed, menuMobileOpen } from './state';

	// menu auto-collapse indicates whether the sidebar menu should autocollapse on desktop
	// this is set by the hamburger menu button in the topnav when in deskptop (lg) viewarea
	let _menuAutoCollapse: boolean = false;
	let _menuAutoCollapsed: boolean = false;
	menuAutoCollapse.subscribe((value: boolean) => (_menuAutoCollapse = value));
	menuAutoCollapsed.subscribe((value: boolean) => (_menuAutoCollapsed = value));
	const toggleMenuAutoCollapse = () => {
		menuAutoCollapse.set(!_menuAutoCollapse);
		menuAutoCollapsed.set(!_menuAutoCollapsed);
	};

	// menu mobile open indicates whether the sidebar menu should be open on mobile
	// this is set by the hamburger menu button in the topnav when in mobile (xs/sm/md) viewarea
	// and is closed by the X menu button in the topnav when in mobile (xs/sm/md) viewarea
	let _menuMobileOpen: boolean = false;
	menuMobileOpen.subscribe((value: boolean) => {
		console.log(`menuMobileOpen is ${_menuMobileOpen}`);
		_menuMobileOpen = value;
	});
	const toggleMenuMobileOpen = () => {
		console.log(`menuMobileOpen was ${_menuMobileOpen}`);
		menuMobileOpen.set(!_menuMobileOpen);
	};
</script>

<nav
	class="flex w-full h-16 bg-[#111A41] align-middle border-b border-[#2D3969] px-0 lg:pl-3 z-[100] justify-center"
>
	<div class="flex justify-between items-center w-full">
		<div class="flex py-0 px-0 h-16 justify-start items-center">
			<a href="./" class="flex mr-14 pl-7">
				<FlushLogo />
			</a>
		</div>
		<div class="flex py-0 px-0 items-center h-16">
			<div class="relative flex items-center">
				<div class="hidden items-center sm:flex pr-6">
					<div
						class="flex h-10 items-center justify-center rounded-[20px] bg-[#182350] cursor-pointer py-2 px-4 hover:bg-[#172045] -sm:rounded-[15px] -smmr-[10px] -sm:py-[6px] -sm:px-[10px]"
					>
						<VipIcon />
						<span class="ml-1 pt-[1px] text-xs font-bold uppercase tracking-[1px] text-white">
							VIP
						</span>
					</div>
				</div>
				<div class="flex h-16 justify-center items-center px-[20px] bg-[#2D3969] -sm:px-[15px]">
					<button
						class="text-white focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-xs px-5 py-2.5 mr-2 focus:outline-none"
					>
						{'LOG IN'}
					</button>
					<button
						class="text-white bg-[#4769fc] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-md text-xs px-6 py-3 mr-2 focus:outline-none btn-register"
					>
						{'SIGN UP'}
					</button>
					<div
						class="ml-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-[#222c55] border-[1px] border-[#313d6b] -lg:hidden"
					>
						<SearchIcon />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	.btn-register {
		transition: background-color 0.3s ease 0s, opacity 0.3s ease 0s, transform 0.1s ease 0s;
		border-radius: 4px;
	}
</style>
