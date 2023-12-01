<script lang="ts">
	import CalendarBannerMobile from '$lib/images/calendar-banner-mobile.svelte';
	import CalendarBanner from '$lib/images/calendar-banner.svelte';
	import { onMount } from 'svelte';
	import Giftcard from './parts/giftcard.svelte';

	let isMobile = false;
	// let testHoursOffset = 0;

	let now = new Date();
	let timerString = now.toUTCString();
	let currentDay = now.getUTCDate();

	setInterval(() => {
		now = new Date();
		// now.setUTCHours(now.getUTCHours() + testHoursOffset);
		timerString = now.toUTCString();
		currentDay = now.getUTCDate();
	}, 1000);

	const state = (day: number) => {
		if (day === currentDay) {
			return 'ready';
		} else if (day < currentDay) {
			return 'default';
		} else {
			return 'default';
		}
	};

	const startDay = 1;
	const endDay = 25;
	const days = Array.from({ length: endDay + 1 }, (_, index) => index)
		.map((day) => day + 1)
		.filter((day) => day >= startDay);

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
			<CalendarBannerMobile />
		{:else}
			<CalendarBanner />
		{/if}
	</div>
	<div class="datetime">{timerString}</div>
	<div class="grid-cols-custom">
		{#each days as day}
			<Giftcard {day} state={state(day)} />
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
	.datetime {
		@apply text-center text-white relative top-8 font-mono;
	}
	.grid-cols-custom {
		@apply grid grid-cols-2 auto-cols-fr gap-4 p-8;
	}
	@media (max-width: 500px) {
		.grid-cols-custom {
			@apply grid grid-cols-1 gap-4 p-8;
		}
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
			@apply grid grid-cols-5 gap-4;
		}
	}
</style>
