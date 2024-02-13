<script lang="ts">
	import AmaticLogo from '$lib/assets/providers/amatic.svg';
	import AuthenticGamingLogo from '$lib/assets/providers/authenticgaming.svg';
	import BelatraLogo from '$lib/assets/providers/belatra.svg';
	import BetSoftLogo from '$lib/assets/providers/betsoft.svg';
	import BetSolutionsLogo from '$lib/assets/providers/betsolutions.svg';
	import Bigtimemg from '$lib/assets/providers/bigtimemg.svg';
	import BoomingGames from '$lib/assets/providers/boominggames.svg';
	import { Marquee } from 'flowbite-svelte';
</script>

<div class="marquee-container">
	<Marquee speed={0.2} hoverSpeed={0.1}>
		<a class="marquee-link" href="/provider/amatic">
			<img class="marquee-img" alt="flowbite-svelte icon logo" src={AmaticLogo} loading="lazy" />
		</a>
		<a class="marquee-link" href="/provider/authenticgaming">
			<img
				class="marquee-img"
				alt="flowbite-svelte icon logo"
				src={AuthenticGamingLogo}
				loading="lazy"
			/>
		</a>
		<a class="marquee-link" href="/provider/belatra">
			<img class="marquee-img" alt="flowbite-svelte icon logo" src={BelatraLogo} loading="lazy" />
		</a>
		<a class="marquee-link" href="/provider/betsoft">
			<img class="marquee-img" alt="flowbite-svelte icon logo" src={BetSoftLogo} loading="lazy" />
		</a>
		<a class="marquee-link" href="/provider/betsolutions">
			<img
				class="marquee-img"
				alt="flowbite-svelte icon logo"
				src={BetSolutionsLogo}
				loading="lazy"
			/>
		</a>
		<a class="marquee-link" href="/provider/bgaming">
			<img class="marquee-img" alt="flowbite-svelte icon logo" src={Bigtimemg} loading="lazy" />
		</a>
		<a class="marquee-link" href="/provider/boominggames">
			<img class="marquee-img" alt="flowbite-svelte icon logo" src={BoomingGames} loading="lazy" />
		</a>
	</Marquee>
</div>

<style lang="postcss">
	.marquee-container {
		@apply bg-gray-900;
	}
	.marquee-link {
		@apply relative;
	}
	.marquee-link:hover {
		@apply top-[-4px];
	}
	.marquee-img {
		@apply w-40 h-[50px];
	}
	:global(.marquee-container > div:first-child) {
		@apply relative flex overflow-hidden w-[100%] py-3;
	}
	:global(.marquee-container > div > div) {
		@apply flex justify-around items-center min-w-[100%];
	}
</style>
