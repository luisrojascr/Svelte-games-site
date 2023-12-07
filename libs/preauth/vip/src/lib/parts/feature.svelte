<script lang="ts">
	import CashbackIcon from '$lib/assets/cashbackIcon.svg';
	import ElitePerksIcon from '$lib/assets/featureEliteIcon.svg';
	import FreeSpinsIcon from '$lib/assets/freeSpinsIcon.svg';
	export let iconName: string;
	export let title: string;
	export let description: String;

	let icon: string;
	switch (iconName) {
		case 'elite':
			icon = ElitePerksIcon;
			break;
		case 'cashback':
			icon = CashbackIcon;
			break;
		case 'freeSpins':
			icon = FreeSpinsIcon;
			break;
	}
</script>

<div class="feature-content">
	{#if icon}
		<img src={icon} alt="icon" width="70" loading="lazy" />
	{/if}
	<h2 class="feature-title">{title}</h2>
	<p class="feature-description">{description}</p>
	<a class="feature-learn-more" href="/"> Learn more </a>
</div>

<style lang="postcss">
	.feature-content {
		@apply flex flex-col bg-gray-700 p-6 rounded-xl text-center items-center;
	}
	.feature-title {
		@apply text-lg font-bold p-3;
	}
	.feature-description {
		@apply h-[140px] text-[11px] font-normal opacity-80;
	}
	.feature-learn-more {
		@apply text-green-600 font-bold uppercase underline text-sm;
	}
</style>
