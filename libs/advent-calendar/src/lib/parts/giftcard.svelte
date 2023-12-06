<script lang="ts">
	import type { CalendarDayUser } from '$lib/api/api';
	import { CalendarClaimDayEligible, CalendarOpenDay } from '$lib/api/api';
	import Day from '$lib/images/day.svelte';
	import Modal from '$lib/parts/modal.svelte';
	import { loggedIn, token } from '$lib/token';
	import { DayState } from '../types';

	const month = 12;
	export let day: number;
	export let state: DayState;
	export let currentDay: number;
	export let data: CalendarDayUser;

	let isHovered: boolean = false;
	let showModal: boolean = false;
	let displayReward: boolean = data.claimedAt != null;
	let disclaimer: string = '';
	let submitting: boolean = false;

	let _loggedIn: boolean | undefined = undefined;
	loggedIn.subscribe((value: boolean | undefined) => (_loggedIn = value));

	let _token: string | null | undefined = undefined;
	token.subscribe((value: string | null | undefined) => (_token = value));

	// allows subcomponents to update of form validation check, for changes is required fields
	const forRender = (ms: number = 0): Promise<void> => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	// timer (if promo has a time for player to take an action)
	let hasTimer: boolean = false;
	let timeRemaining: string = '';
	const minTime = 8; // at least two hours to take action if promo claimed at 23:59 UTC
	let testHoursOffset = 0;
	let testMinuteOffset = 0;

	const calcRemaining = () => {
		let now = new Date();
		now.setUTCHours(now.getUTCHours() + testHoursOffset);
		now.setUTCMinutes(now.getUTCMinutes() + testMinuteOffset);
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

	const handleOpen = async (event: Event): Promise<void> => {
		event.preventDefault();
		event.cancelBubble = true;
		if (_loggedIn === false) {
			parent.postMessage({ showLogin: true }, '*');
		} else if (_loggedIn === true) {
			try {
				const vars = { variables: { day, month: 12 } };
				submitting = true;
				console.log(`posting ${JSON.stringify(vars)}`);
				const result = await CalendarOpenDay(vars);
				console.log(`result: ${JSON.stringify(result, null, 2)}`);
				submitting = false;
				if (result?.data?.calendarOpenDay) data = result!.data!.calendarOpenDay;
				open();
			} catch (e) {
				console.log(`error opening day: ${e}`);
			}
		}
	};

	const open = () => {
		if (day === 3) {
			// TODO: return disclaimer and timer in metadata
			calcRemaining();
			setInterval(() => calcRemaining(), 1000);
			hasTimer = true;
			// title = 'Free Spins';
			// description = 'Deposit at least $20 before time expires and receive 50 free spins!';
			// disclaimer = 'Return here when time expires to play your free spins.';
		}
		if (disclaimer == '' && (data?.freeSpins ?? 0) > 0) {
			disclaimer = `depositing players only`;
		}
		displayReward = true;
	};
	if (data.claimedAt != null) {
		open();
	}

	const handleClaim = async (event: Event): Promise<void> => {
		event.preventDefault();
		event.cancelBubble = true;
		if (_loggedIn === false) {
			parent.postMessage({ showLogin: true }, '*');
		} else if (_loggedIn === true) {
			try {
				const vars = { variables: { day, month: 12 } };
				submitting = true;
				console.log(`posting ${JSON.stringify(vars)}`);
				const result = await CalendarClaimDayEligible(vars);
				console.log(`result: ${JSON.stringify(result, null, 2)}`);
				submitting = false;
				if (result?.data?.calendarClaimDayEligible) data = result!.data!.calendarClaimDayEligible;

				if (data.claimedEligibleAt == null && !data.isEligible) {
					disclaimer =
						'It appears you have not met the requirements to claim this reward. If you feel this is in error, contact customer support.';
				}
			} catch (e) {
				console.log(`error claiming day eligibility: ${e}`);
			}
		}
	};
</script>

<div class="giftcard">
	{#if day >= 1 && day <= 25}
		<button
			class="button {state !== DayState.Current && data.claimedAt == null ? 'disabled' : ''}"
			on:mouseover={() => (isHovered = state === DayState.Past)}
			on:mouseout={() => (isHovered = false)}
			on:mouseleave={() => (isHovered = false)}
			on:focus={() => {}}
			on:blur={() => {}}
			on:click={() => (showModal = state === DayState.Current || data.claimedAt != null)}
			disabled={state !== DayState.Current && data.claimedAt == null}
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
				<p><b>{data.title}</b></p>
				{#if data.claimedEligibleAt != null && data.freeSpins}
					You earned {data.freeSpins} free spins!
					<p class="disclaimer">
						Head over to Sweet Bonanza Xmas by Pragmatic to play them (max win: $100)
					</p>
				{:else}
					<p>{data.description}</p>

					{#if data.hasEligibility && data.claimedAt != null && data.claimedEligibleAt == null && !(data.isEligible === false)}
						<button class="claim-btn" on:click={handleClaim} disabled={submitting}>Claim</button>
					{/if}
					{#if disclaimer}
						<p class="disclaimer">{disclaimer}</p>
					{/if}
				{/if}
			{:else}
				<h2 class="modal-title">DAY {day}</h2>
				<button class="claim-btn" on:click={handleOpen} disabled={submitting}>Open</button>
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
