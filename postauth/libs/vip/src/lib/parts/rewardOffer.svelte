<script lang="ts">
	import FreeSpin from '$lib/assets/free-spin.svg';

	// Mocked data
	export let title: string;
	export let description: string;
	export let freeSpinClaimed: boolean;
	export let freeSpinEligible: boolean;
</script>

<div class="free-spin-container">
	<img src={FreeSpin} alt="Free Spin" />
	<div class="free-spin-content">
		<h3 class="free-spin-title">{title}</h3>
		<p>{description}</p>
	</div>
	{#if freeSpinClaimed}
		<button class="claimed-button"> CLAIMED </button>
	{:else if freeSpinEligible}
		<button class="not-elible-button" disabled={freeSpinEligible}> NOT ELIGIBLE </button>
	{:else}
		<button class="claim-free-spin-button"> CLAIM FREE SPIN </button>
	{/if}
</div>

<style lang="postcss">
	.free-spin-container {
		@apply flex flex-col mb-4 bg-primary-800 p-8 rounded-3xl items-center;
	}
	.free-spin-content {
		@apply text-sm mt-2 text-gray-400 ml-5 mr-5 w-[60%];
	}
	.free-spin-title {
		@apply font-bold text-2xl mb-3 text-white text-center;
	}
	.claimed-button {
		@apply mt-4 bg-green-600 text-white px-4 py-2 rounded-md transition-colors mt-3 ml-0 text-sm px-6;
	}
	.claimed-button:hover {
		@apply bg-green-700;
	}
	.not-elible-button {
		@apply mt-4 bg-gray-900 border-2 border-gray-200 text-white px-4 py-2 rounded-md cursor-not-allowed mt-3 ml-0 text-sm px-6;
	}
	.claim-free-spin-button {
		@apply mt-4 bg-green-600 text-white px-4 py-2 rounded-md transition-colors mt-3 ml-0 text-sm px-6;
	}
	.claim-free-spin-button:hover {
		@apply bg-green-700;
	}
	@media (min-width: 640px) {
		.free-spin-container {
			@apply flex-row;
		}
		.free-spin-title {
			@apply text-left;
		}
		.free-spin-content {
			@apply mt-0;
		}
		.claimed-button,
		.not-elible-button,
		.claim-free-spin-button {
			@apply mt-0 ml-auto;
		}
	}
</style>
