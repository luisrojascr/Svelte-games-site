<script lang="ts">
	// import { cubicIn, cubicOut } from 'svelte/easing';

	export let win: boolean;
	export let pastBet: any;
	export let id: any;

	let index: number;
</script>

<button
	class="past-bet-button"
	class:win
	class:first={index === 0}
	style:opacity={index >= 5 ? '0' : '1'}
	style:transform={index > 0 ? `translateX(-${index * 100 + index * 12}%)` : 'translateX(0)'}
	data-testid={`past-bet-button:${index}`}
>
	{pastBet}
</button>

<style lang="postcss">
	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	.past-bet-button {
		@apply font-sans text-center text-xs rounded px-1 w-[4rem] h-[24px] whitespace-nowrap touch-manipulation relative inline-flex justify-center items-center duration-300 transition-opacity ease-in-out transition-transform ease-in-out tabular-nums animate-slide-in;
	}

	.past-bet-button.win {
		@apply bg-green-500 text-white;
	}

	.past-bet-button:not(.win) {
		@apply bg-[#ff2c55] text-white;
	}
</style>
