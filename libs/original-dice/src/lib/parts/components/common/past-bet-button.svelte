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

<style>
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
		font-family: 'Open Sans', serif;
		font-size: 11px;
		font-weight: bold;
		text-align: center;
		border-radius: 4px;
		padding: 4px;
		min-width: 9ch;
		max-width: 9ch;
		white-space: nowrap;
		touch-action: manipulation;
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition:
			background 300ms ease,
			opacity 1000ms ease,
			transform 400ms ease;
		font-variant-numeric: tabular-nums;

		animation: slideIn 0.4s ease;
	}

	.past-bet-button.win {
		background-color: #01d180;
		color: #101940;
	}

	.past-bet-button:not(.win) {
		background-color: #3f4b79;
		color: #ffffff;
	}
</style>
