<script lang="ts">
	import type { CalendarDayUser } from '$lib/api/api';
	import { AsyncGetCalendar } from '$lib/api/api';
	import CalendarBannerMobile from '$lib/images/calendar-banner-mobile.svelte';
	import CalendarBanner from '$lib/images/calendar-banner.svelte';
	import { loggedIn } from '$lib/token';
	import { onMount } from 'svelte';
	import ExtraGiftsPopup from './parts/extraGiftsPopup.svelte';
	import Giftcard from './parts/giftcard.svelte';
	import { DayState } from './types';

	let isMobile = false;
	let isExtraGiftsPopupOpen = true;
	let _loggedIn: boolean | undefined = undefined;

	let testHoursOffset = 0;
	let testMinuteOffset = 0;

	let now = new Date();
	now.setUTCHours(now.getUTCHours() + testHoursOffset);
	now.setUTCMinutes(now.getUTCMinutes() + testMinuteOffset);
	let timerString = now.toUTCString();
	let currentDay = now.getUTCDate();

	setInterval(() => {
		now = new Date();
		now.setUTCHours(now.getUTCHours() + testHoursOffset);
		now.setUTCMinutes(now.getUTCMinutes() + testMinuteOffset);
		timerString = now.toUTCString();
		currentDay = now.getUTCDate();
	}, 1000);

	const state = (day: number): DayState => {
		if (day === currentDay) {
			return DayState.Current;
		} else if (day < currentDay) {
			return DayState.Past;
		} else {
			return DayState.Future;
		}
	};

	const startDay = 1;
	const endDay = 31;
	let days: CalendarDayUser[] = Array.from({ length: endDay + 1 }, (_, index) => index)
		.filter((day) => day + 1 >= startDay)
		.map((day) => ({
			month: 12,
			day: day + 1
		}));

	function updateScreenSize() {
		isMobile = window.innerWidth < 640;
	}

	loggedIn.subscribe(async (value) => {
		_loggedIn = value;
		if (_loggedIn) {
			try {
				const vars = { variables: { month: 12 } };
				const result = await AsyncGetCalendar(vars);
				console.log(`result: ${JSON.stringify(result, null, 2)}`);
				days = Array.from({ length: endDay + 1 }, (_, index) => index)
					.filter((day) => day + 1 >= startDay)
					.map((day): CalendarDayUser => {
						let data = result?.data?.getCalendar?.daysOpened?.find((rec) => rec.day === day + 1);
						if (day === 0 || day === 1) {
							data = {
								...data,
								month: 12,
								day: day + 1,
								title: 'Double VIP Points',
								description:
									'All games played for the rest of this day will earn double VIP points!',

								claimedAt: new Date()
							} as CalendarDayUser;
						} else {
							data = {
								...data,
								month: 12,
								day: day + 1
							} as CalendarDayUser;
						}
						return data;
					});
			} catch (error) {
				console.log(`error getting calendar: ${error}`);
			}
		}
	});

	const handleClosePopup = () => {
		isExtraGiftsPopupOpen = false;
	};

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
		{#key currentDay && days}
			{#each days as day}
				<Giftcard day={day.day} state={state(day.day)} {currentDay} data={day} />
			{/each}
		{/key}
	</div>
</div>

{#if isExtraGiftsPopupOpen}
	<div class="extragifts-container">
		<ExtraGiftsPopup isMobile on:closePopup={handleClosePopup} />
	</div>
{/if}

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
	.extragifts-container {
		@apply flex max-w-screen-xl mx-auto px-9 pb-8 justify-center;
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
		.extragifts-container {
			@apply justify-end;
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
