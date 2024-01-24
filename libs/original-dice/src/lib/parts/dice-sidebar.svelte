<script lang="ts">
	import { decimalCryptoDisplay, getNextDecimal } from '../utils/helper.js';
	import LabelInput from './components/common/label-input.svelte';
	import Tooltip from './components/common/tooltip.svelte';

	enum BettingVariants {
		MANUAL = 'MANUAL',
		AUTO = 'AUTO'
	}

	let betAmount: string;
	let selectedFiatCurrency: any;
	let coinPriceData: any;
	let currentWalletState: any;

	let active = true;

	let bettingVariant = BettingVariants.MANUAL;

	let gameInProgress = false;
	let loading = false;
	let autoBetInProgress = false;

	function setActiveVariant(variant: BettingVariants) {
		if (!gameInProgress && !loading && !autoBetInProgress) {
			bettingVariant = variant;
		}
	}
</script>

<div class="game-sidebar-wrapper">
	<!-- MOBILE -->
	<!-- <div class="sidebar-main">
		<div class="first-line-bet">
			<Tooltip />
			<LabelInput type={'number'} />
		</div>
	</div> -->
	<!-- MOBILE -->

	<!-- DESKTOP -->
	<div class="sidebar-main">
		<div class="betting-variant-line">
			<button
				class="betting-variant-button"
				style="background-color: {bettingVariant === BettingVariants.MANUAL
					? '#4769FC'
					: '#3F4B79'}; opacity: {bettingVariant === BettingVariants.MANUAL ? 1 : 0.7};"
				on:click={() => setActiveVariant(BettingVariants.MANUAL)}
				disabled={gameInProgress || loading || autoBetInProgress}
				data-testid="manual-bet"
			>
				<span class="button-text">Manual</span>
			</button>
			<button
				class="betting-variant-button"
				style="background-color: {bettingVariant === BettingVariants.AUTO
					? '#4769FC'
					: '#3F4B79'}; opacity: {bettingVariant === BettingVariants.AUTO ? 1 : 0.7};"
				on:click={() => setActiveVariant(BettingVariants.AUTO)}
				disabled={gameInProgress || loading || autoBetInProgress}
				data-testid="auto-bet"
			>
				<span class="button-text">Auto</span>
			</button>
		</div>
		{#if bettingVariant === BettingVariants.MANUAL}
			<Tooltip />
			<!-- FIRST INPUT -->
			<LabelInput
				min={0}
				step={selectedFiatCurrency && coinPriceData
					? '0.01'
					: getNextDecimal(decimalCryptoDisplay(0, currentWalletState))}
				type={'number'}
				value={betAmount}
				dataTestId="bet-amount"
				integerOnly={true}
				disabled={gameInProgress || loading || autoBetInProgress}
			/>

			<!-- SECOND INPUT -->
			<LabelInput type="text" />
		{/if}
	</div>
</div>

<style lang="postcss">
	.game-sidebar-wrapper {
		display: flex;
		flex-direction: column;
		-webkit-box-align: stretch;
		align-items: stretch;
		min-width: 275px;
		/* width: 100%; */
		/* max-width: ${(props): string => (props.change ? '500px' : '285px')}; */
	}

	.sidebar-main {
		width: 100%;
		height: 100%;
		padding: 16px;
		border-radius: 4px;
		background-color: #222c55;
	}

	/* .sidebar-main > * + * {
		margin-top: 1rem;
	} */

	.first-line-bet {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.first-line-bet div:first-child {
		margin-right: 15px;
	}

	.betting-variant-line {
		display: inline-flex;
		width: 100%;
	}

	.betting-variant-line button:first-child {
		border-bottom-right-radius: 0;
		border-top-right-radius: 0;
	}

	.betting-variant-line button:last-child {
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
	}

	.betting-variant-button {
		flex: 0 0 50%;
		touch-action: manipulation;
		position: relative;
		display: inline-flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;

		padding: 9px 1em;
		border-radius: 4px;
		font-family: 'Open Sans', serif;
		font-size: 10px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: 0.91px;
		text-align: center;

		color: #ffffff;
	}

	.betting-variant-button span {
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.betting-variant-button:active span {
		transform: scale(0.95);
	}

	.button-text {
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: 600;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 1px;
		text-align: center;
		color: #ffffff;
	}
</style>
