<script lang="ts">
	import CashbackBox from '$lib/assets/cashback_box_diamond.svg';
	import Lock from '$lib/assets/lock.svg';
	import { Progressbar } from 'flowbite-svelte';

	export let rewardName: string;
	export let milestoneAchived: number;
	export let milestoneGoal: number;
	export let state: string;
</script>

<div class="reward-container">
	<div class="reward-icon">
		<img src={CashbackBox} alt="Milestone 1.5" width="35" height="35" />
	</div>
	<div class="reward-name">{rewardName}</div>
	<div class="reward-milestone-points">
		<span class="reward-points">
			{milestoneAchived}<span class="reward-points-goal">/ {milestoneGoal} </span>
		</span>
		<Progressbar progress="50" size="h-1.5" class="progress-bar" />
	</div>
	<div class="reward-claim-container">
		{#if state === 'enable'}
			<button class="reward-claim-button"> Claim Rewards </button>
		{:else}
			<img src={Lock} alt="Lock" />
			<span>Locked</span>
		{/if}
	</div>
</div>

<style lang="postcss">
	.reward-container {
		@apply grid grid-cols-reward-col-m items-center w-full bg-gray-700 rounded-2xl border-2 border-primary-700 mb-3;
	}
	.reward-icon {
		@apply border-r-2 border-primary-700 p-3;
	}
	.reward-name {
		@apply flex p-3 items-start text-sm;
	}
	.reward-milestone-points {
		@apply flex flex-col border-r-2 border-l-2 border-primary-700 p-3 items-center;
	}
	.reward-points {
		@apply text-xs w-full;
	}
	.reward-points-goal {
		@apply text-gray-400;
	}
	.reward-claim-container {
		@apply flex p-3 min-w-min justify-center col-span-3 border-t-2 border-primary-700;
	}
	.reward-claim-container img {
		@apply opacity-50;
	}
	.reward-claim-container span {
		@apply flex p-2 text-gray-400 text-xs uppercase opacity-50;
	}
	.reward-claim-button {
		@apply bg-green-600 text-white px-4 py-2 rounded-md transition-colors ml-0 text-sm px-6 uppercase;
	}
	.reward-claim-button:hover {
		@apply bg-green-700;
	}
	:global(.progress-bar) {
		@apply bg-primary-600 w-24 rounded-lg mt-2;
	}

	@media (min-width: 768px) {
		.reward-container {
			@apply grid-cols-reward-col;
		}
		.reward-claim-container {
			@apply flex p-3 min-w-[190px] justify-center col-span-1;
		}
		.reward-claim-button {
			@apply ml-auto;
		}
	}
</style>
