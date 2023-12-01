<script lang="ts">
	import Day_1 from '$lib/images/day-1.svelte';
	import Day_10 from '$lib/images/day-10.svelte';
	import Day_11 from '$lib/images/day-11.svelte';
	import Day_12 from '$lib/images/day-12.svelte';
	import Day_13 from '$lib/images/day-13.svelte';
	import Day_14 from '$lib/images/day-14.svelte';
	import Day_15 from '$lib/images/day-15.svelte';
	import Day_16 from '$lib/images/day-16.svelte';
	import Day_17 from '$lib/images/day-17.svelte';
	import Day_18 from '$lib/images/day-18.svelte';
	import Day_19 from '$lib/images/day-19.svelte';
	import Day_2 from '$lib/images/day-2.svelte';
	import Day_20 from '$lib/images/day-20.svelte';
	import Day_21 from '$lib/images/day-21.svelte';
	import Day_22 from '$lib/images/day-22.svelte';
	import Day_23 from '$lib/images/day-23.svelte';
	import Day_24 from '$lib/images/day-24.svelte';
	import Day_25 from '$lib/images/day-25.svelte';
	import Day_3 from '$lib/images/day-3.svelte';
	import Day_4 from '$lib/images/day-4.svelte';
	import Day_5 from '$lib/images/day-5.svelte';
	import Day_6 from '$lib/images/day-6.svelte';
	import Day_7 from '$lib/images/day-7.svelte';
	import Day_8 from '$lib/images/day-8.svelte';
	import Day_9 from '$lib/images/day-9.svelte';
	import Modal from '$lib/parts/modal.svelte';
	import { loggedIn } from '$lib/token';
	import { DayState } from '../types';

	export let day: number;
	export let state: DayState;
	export let currentDay: number;

	let isHovered = false;
	let showModal = false;
	let displayReward = false;
	let _loggedIn: boolean | undefined = undefined;

	// TODO: get daysClaimed from user state API
	let daysClaimed: number[] = [1, 2].filter((day) => day < currentDay);

	loggedIn.subscribe((value) => {
		_loggedIn = value;
	});

	const days = [
		Day_1,
		Day_2,
		Day_3,
		Day_4,
		Day_5,
		Day_6,
		Day_7,
		Day_8,
		Day_9,
		Day_10,
		Day_11,
		Day_12,
		Day_13,
		Day_14,
		Day_15,
		Day_16,
		Day_17,
		Day_18,
		Day_19,
		Day_20,
		Day_21,
		Day_22,
		Day_23,
		Day_24,
		Day_25
	];

	function handleClaim(event: Event) {
		console.log(`logged In ${_loggedIn}`);
		event.preventDefault();
		event.cancelBubble = true;
		if (_loggedIn === false) {
			parent.postMessage({ showLogin: true }, '*');
		} else if (_loggedIn === true) {
			displayReward = true;
		}
	}
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
			<svelte:component this={days[day - 1]} {state} />
		</button>
	{/if}
</div>

{#if showModal}
	<Modal bind:showModal>
		<div class="modal-content">
			<div class="modal-gift-image">
				<svelte:component this={days[day - 1]} state={DayState.Current} />
			</div>

			{#if displayReward || state === DayState.Past}
				<p><b>Double VIP Points</b></p>
				<p>All games played for the rest of this day will earn double VIP points!</p>
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
