<script lang="ts">
	import Reward from '$lib/parts/reward.svelte';
	import { TabItem, Tabs } from 'flowbite-svelte';

	// Mocked data for Rewards
	const rewards = [
		{
			rewardName: 'Milestone 1.5',
			milestoneAchived: 2500,
			milestoneGoal: 2500,
			state: 'enable'
		},
		{
			rewardName: 'Milestone 1.6',
			milestoneAchived: 0,
			milestoneGoal: 50000,
			state: 'locked'
		},
		{
			rewardName: 'Milestone 1.75',
			milestoneAchived: 50000,
			milestoneGoal: 60000,
			state: 'locked'
		},
		{
			rewardName: 'Milestone 1.85',
			milestoneAchived: 62500,
			milestoneGoal: 67500,
			state: 'locked'
		},
		{
			rewardName: 'Milestone 2',
			milestoneAchived: 75000,
			milestoneGoal: 80000,
			state: 'locked'
		}
	];
</script>

<section class="ranking">
	<h2 class="ranking-title">Ranking system</h2>
	<Tabs
		style="pill"
		contentClass="rounded-2xl mt-4"
		activeClasses="active"
		inactiveClasses="inactive"
	>
		<TabItem open>
			<span slot="title" class="tab-item-title">Rewards</span>
			{#each rewards as reward}
				<Reward
					rewardName={reward.rewardName}
					milestoneAchived={reward.milestoneAchived}
					milestoneGoal={reward.milestoneGoal}
					state={reward.state}
				/>
			{/each}
		</TabItem>
		<TabItem>
			<span slot="title" class="tab-item-title">Claimed Rewards</span>
			<div>
				<p>
					<b>Claimed Rewards:</b>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
					labore et dolore magna aliqua.
				</p>
			</div>
		</TabItem>
	</Tabs>
</section>

<style lang="postcss">
	section.ranking {
		@apply mb-6 mt-16;
	}
	.ranking-title {
		@apply text-lg font-semibold mb-4;
	}
	.tab-item-title {
		@apply text-primary-300 font-medium text-xs;
	}
	:global(.ranking ul li button) {
		@apply p-2 px-5 mr-3;
	}
	:global(.ranking ul li button.active) {
		@apply rounded-3xl bg-gray-700;
	}
	:global(.ranking ul li button.active span) {
		@apply text-white;
	}
</style>
