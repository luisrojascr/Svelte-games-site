<script lang="ts">
	import CashbackLogo from '$lib/art/cashback.svelte';
	import FreespinLogo from '$lib/art/freespin.svelte';
	import { locale, t } from '$lib/locale/i18n';

	const isFramed = window.self !== window.top;

	const close = (event: Event): void => {
		event?.preventDefault();
		window.parent.postMessage({ showModal: false }, '*');
	};
</script>

<div class="outerpage">
	<div class="page">
		<div class="headers">
			<div class="header hdr-freespins">
				<div class="logo">
					<div class="circle">
						<FreespinLogo />
					</div>
				</div>
				<div class="headercontent">
					<h1>Free spins</h1>
					<p>Enjoy free spins on the house!</p>
				</div>
			</div>
			<div class="header hdr-cashback">
				<div class="logo">
					<div class="circle">
						<CashbackLogo />
					</div>
				</div>
				<div class="headercontent">
					<h1>Cashback</h1>
				</div>
			</div>
		</div>
		<div class="pagecontent">
			<h2>Free spins</h2>
		</div>
		<div class="tabs">
			<h3 class="active">Rewards</h3>
			<h3>Claimed Rewards</h3>
		</div>
		<div class="rewards">
			<div class="item">
				<div />
				<div>milestone</div>
				<div>progress</div>
				<div>status</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	h1 {
		@apply font-sans-2 text-2xl font-semibold;
	}
	h2 {
		@apply font-sans-2 text-xl font-semibold;
	}
	div.outerpage {
		@apply bg-background-950 w-full h-[100vh] p-4;
	}
	div.page {
		@apply bg-background-950 text-white max-w-6xl h-[100vh];
	}
	div.headers {
		@apply flex flex-row w-full gap-x-8 pt-4 pb-4;
	}
	div.header {
		@apply flex flex-row items-center justify-around rounded-lg w-full border border-50 p-4 bg-background-900;
	}
	div.hdr-cashback {
		@apply invisible;
	}
	div.headercontent {
		@apply basis-2/3 p-4;
	}
	div.header p {
		@apply font-sans text-white text-sm font-light opacity-70 pt-3;
	}
	div.logo {
		@apply basis-1/3;
	}
	div.circle {
		@apply rounded-full bg-slate-300 w-32 h-32 pl-3;
	}
	div.header img {
		@apply p-0 w-32 h-32 sm:w-48 sm:h-48;
	}
	div.tabs {
		@apply flex flex-row w-full gap-x-6 pt-4 pb-4 text-[#83869a];
	}
	div.tabs h3 {
		@apply cursor-pointer;
	}
	div.tabs .active {
		@apply text-white;
	}
	div.item {
		@apply flex flex-row items-center justify-around border-50 border border-r-0 rounded-sm w-full bg-background-900;
	}
	div.item div {
		@apply border-50 border-r w-full h-14 border-collapse;
	}
	div.item div:first-child {
		@apply w-20;
	}
	div.item div:last-child {
		@apply w-32;
	}
	div.item div:nth-child(2) {
		@apply grow;
	}
	div.item div:nth-child(3) {
		@apply w-32;
	}
</style>
