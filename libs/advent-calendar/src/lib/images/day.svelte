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
	import Day_26 from '$lib/images/day-26.svelte';
	import Day_27 from '$lib/images/day-27.svelte';
	import Day_28 from '$lib/images/day-28.svelte';
	import Day_29 from '$lib/images/day-29.svelte';
	import Day_3 from '$lib/images/day-3.svelte';
	import Day_30 from '$lib/images/day-30.svelte';
	import Day_31 from '$lib/images/day-31.svelte';
	import Day_4 from '$lib/images/day-4.svelte';
	import Day_5 from '$lib/images/day-5.svelte';
	import Day_6 from '$lib/images/day-6.svelte';
	import Day_7 from '$lib/images/day-7.svelte';
	import Day_8 from '$lib/images/day-8.svelte';
	import Day_9 from '$lib/images/day-9.svelte';
	import { DayState } from '../types';

	export let day: number;
	export let state: DayState;

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
		Day_25,
		Day_26,
		Day_27,
		Day_28,
		Day_29,
		Day_30,
		Day_31
	];
</script>

<svelte:component this={days[day - 1]} {state} />
