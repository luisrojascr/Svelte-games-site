<script lang="ts">
	import Feature from '$lib/parts/feature.svelte';
</script>

<div class="features-grid">
	<Feature
		iconName="elite"
		title="Elite Perks"
		description="Earn increasing Rakeback Wage Percentage, Free Spins, and even cash bonuses straight to
    your wallet upon achieving certain VIP levels. For each $1 spent your VIP points increase
    by 10 points for slots and 5 points for live Casino, or Originals. This steadily allows
    you to receive more exclusive perks and benefits as you achieve higher VIP levels."
	/>
	<Feature
		iconName="cashback"
		title="Cashback Rewards"
		description="As a VIP Club Member, you will receive a partial refund on real money wagers that generate
        no winnings. This increasing perk ensures that even when you make no winnings on a bet,
        you still receive cashback to fuel your way to higher VIP levels, and even greater
        cashback percentages."
	/>
	<Feature
		iconName="freeSpins"
		title="Earn With Free Spins Daily"
		description="Upon reaching the first VIP milestone, players begin to unlock free spins on some of the
        coolest slots on Flush. This increases up to an astonishing 200 free spins as you climb up
        the VIP rankings. Flush VIP gives back and ensures dedicated players are given the
        opportunity to play and earn for being part of the Flush.com family."
	/>
</div>

<style lang="postcss">
	.features-grid {
		@apply grid grid-cols-1 gap-6 mb-12 mt-4;
	}
	@media (min-width: 768px) {
		.features-grid {
			@apply grid-cols-3;
		}
	}
</style>
