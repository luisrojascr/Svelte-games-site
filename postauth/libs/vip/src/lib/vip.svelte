<script>
	import LoyaltyICON from '$lib/assets/loyaltyIcon.svg';
	import CurrentRank from '$lib/parts/currentRank.svelte';
	import FAQ from '$lib/parts/faq.svelte';
	import Offers from '$lib/parts/offers.svelte';
	import Ranking from '$lib/parts/ranking.svelte';
	import SwiperRank from '$lib/parts/swiperRank.svelte';
</script>

<div class="vip-container">
	<!-- Loyalty Header -->
	<div class="main-title-content">
		<img src={LoyaltyICON} alt="Loyalty Icon" />
		<h1 class="main-title">Loyalty</h1>
	</div>

	<!-- Rank and Points -->
	<CurrentRank />

	<!-- Rank Icons -->
	<SwiperRank />

	<!-- Offers -->
	<Offers />

	<!-- Ranking System -->
	<Ranking />

	<!-- FAQ -->
	<FAQ />
</div>

<style lang="postcss">
	.vip-container {
		@apply text-white max-w-6xl mx-auto py-8 px-4;
	}
	.main-title-content {
		@apply flex items-center mb-6;
	}
	.main-title {
		@apply text-2xl font-semibold ml-3;
	}
</style>
