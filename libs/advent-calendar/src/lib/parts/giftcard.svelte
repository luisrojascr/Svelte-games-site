<script lang="ts">
	import { CalendarOpenDay } from '$lib/api/api';
	import Day from '$lib/images/day.svelte';
	import Modal from '$lib/parts/modal.svelte';
	import { loggedIn, token } from '$lib/token';
	import { DayState } from '../types';

	const month = 12;
	export let day: number;
	export let state: DayState;
	export let currentDay: number;
	export let title: string = '';
	export let description: string = '';

	let isHovered: boolean = false;
	let showModal: boolean = false;
	let displayReward: boolean = false;
	let disclaimer: string = '';

	let _loggedIn: boolean | undefined = undefined;
	loggedIn.subscribe((value: boolean | undefined) => (_loggedIn = value));

	let _token: string | null | undefined = undefined;
	token.subscribe((value: string | null | undefined) => (_token = value));

	// timer (if promo has a time for player to take an action)
	let hasTimer: boolean = false;
	let timeRemaining: string = '';
	const minTime = 2; // at least two hours to take action if promo claimed at 23:59 UTC

	const calcRemaining = () => {
		let now = new Date();
		let expires = new Date();
		expires.setUTCMonth(month - 1);
		expires.setUTCDate(day + 1);
		expires.setUTCHours(minTime, 0, 0);
		const remaining = (expires.valueOf() - now.valueOf()) / 1000;

		timeRemaining =
			expires < now
				? '00:00:00'
				: `${Math.floor(remaining / 3600)
						.toString()
						.padStart(2, '0')}h:${Math.floor((remaining / 60) % 60)
						.toString()
						.padStart(2, '0')}m:${Math.floor(remaining % 60)
						.toString()
						.padStart(2, '0')}s`;
	};

	// TODO: get daysClaimed from user state API
	let daysClaimed: number[] = [1, 2].filter((day) => day < currentDay);

	const handleClaim = async (event: Event): Promise<void> => {
		event.preventDefault();
		event.cancelBubble = true;
		if (_loggedIn === false) {
			parent.postMessage({ showLogin: true }, '*');
		} else if (_loggedIn === true) {
			if (day === 1 || day === 2) {
				title = 'Double VIP Points';
				description = 'All games played for the rest of this day will earn double VIP points!';
				displayReward = true;
				return;
			}
			try {
				const vars = { variables: { day, month: 12 } };
				console.log(`posting ${JSON.stringify(vars)}`);
				const result = await CalendarOpenDay(vars);
				title = result?.data?.calendarOpenDay?.title || '';
				description = result?.data?.calendarOpenDay?.description || '';

				if (day === 3) {
					calcRemaining();
					setInterval(() => calcRemaining(), 1000);
					hasTimer = true;
					title = 'Free Spins';
					description = 'Deposit at least $20 before time expires and receive 50 free spins!';
					disclaimer = 'Return here when time expires to play your free spins.';
					displayReward = true;
				}
				displayReward = true;
			} catch (e) {
				console.log(`error claiming day: ${e}`);
			}
		}
	};
</script>

<div class="giftcard">
	{#if day >= 1 && day <= 25}
		<button
			class="button {state !== DayState.Current && !daysClaimed.includes(day) ? 'disabled' : ''}"
			on:mouseover={() => (isHovered = state === DayState.Past)}
			on:mouseout={() => (isHovered = false)}
			on:mouseleave={() => (isHovered = false)}
			on:focus={() => {}}
			on:blur={() => {}}
			on:click={() => (showModal = state === DayState.Current || daysClaimed.includes(day))}
			disabled={state !== DayState.Current && !daysClaimed.includes(day)}
		>
			<Day {day} {state} />
		</button>
	{/if}
</div>

{#if showModal}
	<Modal bind:showModal>
		<div class="modal-content">
			{#if displayReward || state === DayState.Past}
				{#if hasTimer}
					{#key timeRemaining}
						<p class="timer">{timeRemaining}</p>
					{/key}
				{/if}
			{/if}
			<div class="modal-gift-image">
				<Day {day} state={DayState.Current} />
			</div>

			{#if displayReward || state === DayState.Past}
				<p><b>{title}</b></p>
				<p>{description}</p>

				{#if disclaimer}
					<p class="disclaimer">{disclaimer}</p>
				{/if}
			{:else}
				<h2 class="modal-title">DAY {day}</h2>
				<button class="claim-btn" on:click={handleClaim}>Claim</button>
			{/if}
		</div>
	</Modal>
{/if}

<style lang="postcss">
	.disclaimer {
		@apply text-gray-400 text-xs mt-3;
	}
	.timer {
		@apply text-center text-white font-mono absolute top-8 w-4/5;
	}
	.button {
		@apply flex w-full sm:w-auto;
	}
	.giftcard {
		@apply bg-transparent p-2 flex justify-center items-center h-[254px];
	}
	.disabled {
		@apply opacity-30 cursor-default p-[19px];
	}
	.modal-content {
		@apply text-white text-center p-5;
	}
	.modal-gift-image {
		@apply flex items-center justify-center;
	}
	.modal-title {
		@apply font-bold mt-3;
	}
	.modal-gift-claimed {
		@apply uppercase text-green-600;
	}
	.claim-btn {
		@apply bg-[#fab259] px-3 py-2 rounded-lg mt-4 w-[129px] hover:bg-[#efa040] uppercase font-semibold;
	}
</style>
