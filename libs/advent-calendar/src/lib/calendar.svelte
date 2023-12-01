<script lang="ts">
	import Calendar_banner_mobile from '$lib/images/calendar-banner-mobile.svelte';
	import Calendar_banner from '$lib/images/calendar-banner.svelte';
	import { onMount } from 'svelte';
	import Giftcard from './parts/giftcard.svelte';

	let isMobile = false;

	const giftsData = [
		{
			day: 1,
			state: 'ready',
			description: 'Description day 1'
		},
		{
			day: 2,
			state: 'default',
			description: 'Description day 2'
		},
		{
			day: 3,
			state: 'default',
			description: 'Description day 3'
		},
		{
			day: 4,
			state: 'default',
			description: 'Description day 4'
		},
		{
			day: 5,
			state: 'default',
			description: 'Description day 5'
		},
		{
			day: 6,
			state: 'default',
			description: 'Description day 6'
		},
		{
			day: 7,
			state: 'default',
			description: 'Description day 7'
		},
		{
			day: 8,
			state: 'default',
			description: 'Description day 8'
		},
		{
			day: 9,
			state: 'default',
			description: 'Description day 9'
		},
		{
			day: 10,
			state: 'default',
			description: 'Description day 10'
		},
		{
			day: 11,
			state: 'default',
			description: 'Description day 11'
		},
		{
			day: 12,
			state: 'default',
			description: 'Description day 12'
		},
		{
			day: 13,
			state: 'default',
			description: 'Description day 13'
		},
		{
			day: 14,
			state: 'default',
			description: 'Description day 14'
		},
		{
			day: 15,
			state: 'default',
			description: 'Description day 15'
		},
		{
			day: 16,
			state: 'default',
			description: 'Description day 16'
		},
		{
			day: 17,
			state: 'default',
			description: 'Description day 17'
		},
		{
			day: 18,
			state: 'default',
			description: 'Description day 18'
		},
		{
			day: 19,
			state: 'default',
			description: 'Description day 19'
		},
		{
			day: 20,
			state: 'default',
			description: 'Description day 20'
		},
		{
			day: 21,
			state: 'default',
			description: 'Description day 21'
		},
		{
			day: 22,
			state: 'default',
			description: 'Description day 22'
		},
		{
			day: 23,
			state: 'default',
			description: 'Description day 23'
		},
		{
			day: 24,
			state: 'default',
			description: 'Description day 24'
		},
		{
			day: 25,
			state: 'default',
			description: 'Description day 25'
		}
	];

	function updateScreenSize() {
		isMobile = window.innerWidth < 640;
	}

	onMount(() => {
		updateScreenSize();
		window.addEventListener('resize', updateScreenSize);
		return () => {
			window.removeEventListener('resize', updateScreenSize);
		};
	});
</script>

<div class="banner">
	<div class="banner-content">
		{#if isMobile}
			<Calendar_banner_mobile />
		{:else}
			<Calendar_banner />
		{/if}
	</div>
	<div class="grid-cols-custom">
		{#each giftsData as gift}
			<Giftcard day={gift.day} state={gift.state} description={gift.description} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.banner {
		@apply max-w-screen-xl mx-auto py-5;
	}
	.banner-content {
		@apply flex items-center justify-center mt-5;
	}
	.grid-cols-custom {
		@apply grid grid-cols-2 auto-cols-fr gap-4 p-8;
	}

	@media (min-width: 768px) {
		.grid-cols-custom {
			@apply grid grid-cols-3 gap-4 p-8;
		}
	}

	@media (min-width: 1024px) {
		.grid-cols-custom {
			@apply grid grid-cols-4 gap-4 p-8;
		}
	}

	@media (min-width: 1280px) {
		.grid-cols-custom {
			@apply grid grid-cols-5 gap-4 p-8;
		}
	}
</style>
