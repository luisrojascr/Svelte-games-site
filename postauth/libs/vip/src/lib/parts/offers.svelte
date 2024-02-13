<script lang="ts">
	import RewardOffer from '$lib/parts/rewardOffer.svelte';
</script>

<section class="offers">
	<RewardOffer
		title="Free Spin"
		description="Enjoy free spins on the Flush house for reaching a new VIP Rank or on some Milestones!"
		freeSpinClaimed={false}
		freeSpinEligible={false}
	/>
	<RewardOffer
		title="Cashback"
		description="Claim cashback for reaching a new VIP Rank or on some Milestones!"
		freeSpinClaimed={true}
		freeSpinEligible={false}
	/>
</section>

<style lang="postcss">
	section.offers {
		@apply rounded-lg mb-6 mt-10;
	}
</style>
