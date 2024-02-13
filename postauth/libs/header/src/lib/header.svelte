<script lang="ts">
	import { page } from '$app/stores';
	import FlushLogo from '$lib/icons/flush-logo.svelte';
	import SearchIcon from '$lib/icons/search.svelte';
	import VipIcon from '$lib/icons/vip.svelte';
	import { loggedIn, relativeHref } from '@infinitro/global-postauth';

	let isLoggedIn: boolean | undefined = undefined;
	loggedIn.subscribe((value) => {
		isLoggedIn = value;
	});

	const logout = (event: Event) => {
		event.preventDefault();
		loggedIn.set(false);
		// TODO: redirect to logged out URL
	};

	let lobbyActive: boolean = false;
	let lobbyHref: string = '/';
	let vipActive: boolean = false;
	let vipHref: string = '/';

	[lobbyHref, lobbyActive] = relativeHref($page.url.pathname, '/');
	[vipHref, vipActive] = relativeHref($page.url.pathname, '/vip/');
	$: {
		[lobbyHref, lobbyActive] = relativeHref($page.url.pathname, '/');
		[vipHref, vipActive] = relativeHref($page.url.pathname, '/vip/');
	}
</script>

<nav>
	<div class="menu">
		<div class="logo">
			<a href={lobbyHref} class="logo">
				<FlushLogo />
			</a>
		</div>
		<div class="rightnav">
			<div class="rightnav2">
				<div class="rightnav-left">
					<a href={vipHref} class="vip">
						<VipIcon />
						<span class="vip">VIP</span>
					</a>
				</div>
				<div class="buttons">
					{#if isLoggedIn}
						<button on:click={logout} class="register btn-register">
							{'LOGOUT'}
						</button>
					{/if}
					<div class="search">
						<SearchIcon />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply fixed z-[1] w-full h-16 bg-[#111A41] align-middle px-0 lg:pl-3;
	}
	div.menu {
		@apply flex justify-between items-center;
	}
	div.logo {
		@apply flex py-0 px-0 h-16 justify-start items-center;
	}
	div.rightnav {
		@apply flex py-0 px-0 items-center h-16;
	}
	div.rightnav2 {
		@apply relative flex items-center;
	}
	div.rightnav-left {
		@apply flex items-center pr-6; /* -md:hidden */
	}
	a.vip {
		@apply flex h-10 items-center justify-center rounded-[20px] bg-[#182350] cursor-pointer py-2 px-4 hover:bg-[#172045]; /* -sm:rounded-[15px] -smmr-[10px] -sm:py-[6px] -sm:px-[10px] */
	}
	span.vip {
		@apply ml-1 pt-[1px] text-xs font-bold uppercase tracking-[1px] text-white;
	}
	div.buttons {
		@apply flex h-16 justify-center items-center px-[20px] bg-[#2D3969]; /*  -sm:px-[15px] */
	}
	button.login {
		@apply text-white font-bold rounded-lg text-xs px-5 py-2.5 mr-2 focus:outline-none;
	}
	button.register {
		@apply text-white bg-[#4769fc] hover:bg-blue-800 font-bold rounded-md text-xs px-6 py-3 mr-2 focus:outline-none;
	}
	div.search {
		@apply ml-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-[#222c55] border-[1px] border-[#313d6b]; /*  -lg:hidden */
	}
	a.logo {
		@apply flex mr-14 pl-7;
	}
	.btn-register {
		transition:
			background-color 0.3s ease 0s,
			opacity 0.3s ease 0s,
			transform 0.1s ease 0s;
		border-radius: 4px;
	}
</style>
