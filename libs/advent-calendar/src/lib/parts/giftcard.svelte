<script lang="ts">
	import type { CalendarDayUser } from '$lib/api/api';
	import { CalendarOpenDay } from '$lib/api/api';
	import Day from '$lib/images/day.svelte';
	import Modal from '$lib/parts/modal.svelte';
	import { loggedIn, token } from '$lib/token';
	import { DayState } from '../types';

	export let day: number;
	export let state: DayState;
	export let currentDay: number;

	let isHovered: boolean = false;
	let showModal: boolean = false;
	let displayReward: boolean = false;
	let _loggedIn: boolean | undefined = undefined;
	let _token: string | null | undefined = undefined;
	let title: string = '';
	let description: string = '';

	// TODO: get daysClaimed from user state API
	let daysClaimed: number[] = [1, 2].filter((day) => day < currentDay);

	loggedIn.subscribe((value: boolean | undefined) => {
		_loggedIn = value;
	});

	token.subscribe((value: string | null | undefined) => {
		_token = value;
	});

	const handleClaim = async (event: Event): Promise<void> => {
		console.log(`logged In ${_loggedIn}`);
		event.preventDefault();
		event.cancelBubble = true;
		if (_loggedIn === false) {
			parent.postMessage({ showLogin: true }, '*');
		} else if (_loggedIn === true) {
			try {
				const vars = { variables: { day, month: 12 } };
				console.log(`posting ${JSON.stringify(vars)}`);
				const result = await CalendarOpenDay(vars);
				title = result?.data?.calendarOpenDay?.title || '';
				description = result?.data?.calendarOpenDay?.description || '';
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
			<div class="modal-gift-image">
				<Day {day} state={DayState.Current} />
			</div>

			{#if displayReward || state === DayState.Past}
				<p><b>{title}</b></p>
				<p>{description}</p>
			{:else}
				<h2 class="modal-title">DAY {day}</h2>
				<button class="claim-btn" on:click={handleClaim}>Claim</button>
			{/if}
		</div>
	</Modal>
{/if}

<style lang="postcss">
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
		@apply flex items-center justify-center mt-3;
	}
	.modal-title {
		@apply font-bold mt-3;
	}
	.modal-gift-claimed {
		@apply uppercase text-green-600 mt-3;
	}
	.claim-btn {
		@apply bg-[#fab259] px-3 py-2 rounded-lg mt-4 w-[129px] hover:bg-[#efa040] uppercase font-semibold;
	}
</style>
