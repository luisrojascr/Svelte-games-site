<script lang="ts">
	import PercentIcon from '$lib/assets/images/PercentIcon.svelte';
	import CustomButton from '$lib/parts/components/common/custom-button.svelte';
	import LabelInput from '$lib/parts/components/common/label-input.svelte';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { derived, get, writable } from 'svelte/store';
	import {
		decimalCryptoDisplay,
		decimalDisplayLength,
		getNextDecimal,
		roundOff,
		roundOff2
	} from '../utils/helper.js';

	import {
		BettingVariants,
		autoBetInProgress,
		balanceList,
		betAmount,
		cashout,
		coinPriceData,
		curBalance,
		currentProfit,
		currentWalletState,
		gameInProgress,
		handleAutoBet,
		handleAutoBettingContinuation,
		handleManualBet,
		loading,
		maxBet,
		maxPayoutData,
		minBet,
		profitOnWin,
		resetBoard,
		selectedFiatCurrency
	} from '$lib/parts/store/store.js';

	let tooltip = false;
	let active = true;

	const bettingVariant = writable(BettingVariants.MANUAL);

	function buttonClickHandler() {
		handleManualBet();
	}

	function autoButtonClickHandler() {
		autoBetInProgress.update((state) => !state);
		if (get(autoBetInProgress)) {
			handleAutoBet();
		} else {
			resetBoard(true);
		}
	}

	function setActiveVariant(variant: BettingVariants) {
		bettingVariant.set(variant);
	}

	$: if (Number($betAmount) === 0) {
		if ($selectedFiatCurrency && $coinPriceData) {
			$profitOnWin = '0.00';
		} else {
			$profitOnWin = decimalCryptoDisplay(0, $currentWalletState.type);
		}
	} else {
		const getProfitOnWin = () =>
			parseFloat($betAmount) * parseFloat($cashout) - parseFloat($betAmount);

		if ($selectedFiatCurrency && $coinPriceData) {
			$profitOnWin = isNaN(getProfitOnWin()) ? '' : getProfitOnWin().toFixed(2);
		} else {
			$profitOnWin = isNaN(getProfitOnWin())
				? ''
				: getProfitOnWin().toFixed(decimalDisplayLength($currentWalletState.type));
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
				style="background-color: {$bettingVariant === BettingVariants.MANUAL
					? '#4769FC'
					: '#3F4B79'}; opacity: {$bettingVariant === BettingVariants.MANUAL ? 1 : 0.7};"
				on:click={() => setActiveVariant(BettingVariants.MANUAL)}
				data-testid="manual-bet"
			>
				<span class="button-text">Manual</span>
			</button>
			<button
				class="betting-variant-button"
				style="background-color: {$bettingVariant === BettingVariants.AUTO
					? '#4769FC'
					: '#3F4B79'}; opacity: {$bettingVariant === BettingVariants.AUTO ? 1 : 0.7};"
				on:click={() => setActiveVariant(BettingVariants.AUTO)}
				data-testid="auto-bet"
			>
				<span class="button-text">Auto</span>
			</button>
		</div>

		{#if $bettingVariant === BettingVariants.MANUAL}
			<!-- FIRST INPUT -->
			<div>
				<div
					style="display: flex; flex-direction: column; justify-content: flex-start; align-items: start;"
					class="label-content"
				>
					<span>Bet Amount</span>
					<button>(Min 0 to 100.00 Max)</button>
					<span>(Balance - {$curBalance} and {$currentProfit})</span>
				</div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={$betAmount}
					dataTestId="bet-amount"
					integerOnly={true}
				>
					<div class="btn-parent-v1" slot="buttons">
						<button class="buttons-v1">
							<span>½</span>
						</button>
						<button class="buttons-v1">
							<span>2x</span>
						</button>
					</div>
				</LabelInput>

				<div class="tooltip-parent">
					<div class="tooltip">
						{#if tooltip}
							<Tooltip
								content="<p>Please set a valid bet amount</p>"
								theme="tooltip-theme"
								position="bottom"
								animation="slide"
								align="center"
								bind:show={tooltip}
								autoPosition
								action="prop"
								style={{
									backgroundColor: '#fff',
									fontSize: '10px',
									color: '#222c55',
									padding: '8px'
								}}>&nbsp;</Tooltip
							>
						{/if}
					</div>
				</div>
			</div>

			<!-- SECOND INPUT -->
			<div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={parseFloat($profitOnWin).toFixed(2)}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="Profit on Win"
				/>
			</div>

			<div>
				<CustomButton
					type="submit"
					onClick={buttonClickHandler}
					width={'100%'}
					bgColor={'#01d180'}
					color={'#fff'}
					padding={'16px'}
					margin={'10px 0px'}
					disabled={$loading}
					hoverColor={'#00b16c'}
					dataTestId={'bet-button'}
					buttonText={'Bet'}
				></CustomButton>
			</div>
		{/if}

		{#if $bettingVariant === BettingVariants.AUTO}
			<div>
				<div
					style="display: flex; flex-direction: column; justify-content: flex-start; align-items: start;"
					class="label-content"
				>
					<span>Bet Amount</span>
					<button>(Min 0 to 100.00 Max)</button>
					<span>(Balance - {$curBalance} and {$currentProfit})</span>
				</div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={$betAmount}
					dataTestId="bet-amount"
					integerOnly={true}
				>
					<div class="btn-parent-v1" slot="buttons">
						<button class="buttons-v1">
							<span>½</span>
						</button>
						<button class="buttons-v1">
							<span>2x</span>
						</button>
					</div>
				</LabelInput>

				<div class="tooltip-parent">
					<div class="tooltip">
						{#if tooltip}
							<Tooltip
								content="<p>Please set a valid bet amount</p>"
								theme="tooltip-theme"
								position="bottom"
								animation="slide"
								align="center"
								bind:show={tooltip}
								autoPosition
								action="prop"
								style={{
									backgroundColor: '#fff',
									fontSize: '10px',
									color: '#222c55',
									padding: '8px'
								}}>&nbsp;</Tooltip
							>
						{/if}
					</div>
				</div>
			</div>

			<div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={profitOnWin}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="Number Of Bets"
				>
					<div slot="count" class="bet-countdown">
						<span>1</span>
					</div>
				</LabelInput>
			</div>

			<div>
				<LabelInput
					min={0}
					step={selectedFiatCurrency && coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={betAmount}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="On Loss"
					buttonsPosition={'start'}
				>
					<PercentIcon width="11px" height="13px" fill="#848aa0" slot="inputIcon" />

					<div class="btn-parent-v1" slot="buttons">
						<button class="buttons-v2">
							<span>RESET</span>
						</button>
						<button class="buttons-v2">
							<span>INCREASE BY</span>
						</button>
					</div>
				</LabelInput>
			</div>

			<div>
				<LabelInput
					min={0}
					step={selectedFiatCurrency && coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={betAmount}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="Stop On Profit"
				></LabelInput>
			</div>

			<div>
				<LabelInput
					min={0}
					step={selectedFiatCurrency && coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					value={betAmount}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="Stop On Loss"
				></LabelInput>
			</div>

			<div>
				<div>
					<CustomButton
						type="submit"
						onClick={autoButtonClickHandler}
						width={'100%'}
						bgColor={$autoBetInProgress ? 'red' : '#00b16c'}
						color={'#fff'}
						padding={'16px'}
						margin={'10px 0px'}
						disabled={$loading}
						hoverColor={$gameInProgress ? undefined : '#00b16c'}
						dataTestId={'bet-button'}
						buttonText={$autoBetInProgress ? 'Stop Autobet' : 'Start Autobet'}
					></CustomButton>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.game-sidebar-wrapper {
		@apply flex flex-col items-stretch min-w-[275px];
	}

	.sidebar-main {
		@apply w-full h-full p-4 rounded bg-[#222c55];
	}

	.sidebar-main > * + * {
		@apply mt-4;
	}

	.first-line-bet {
		@apply flex justify-center items-center;
	}

	.first-line-bet div:first-child {
		@apply mr-4;
	}

	.betting-variant-line {
		@apply inline-flex w-full mb-2.5;
	}

	.betting-variant-line button:first-child {
		@apply rounded-br-none rounded-tr-none;
	}

	.betting-variant-line button:last-child {
		@apply rounded-bl-none rounded-tl-none;
	}

	.betting-variant-button {
		@apply flex-none w-1/2 touch-manipulation relative inline-flex justify-center items-center transition-transform duration-300 ease-in-out p-[9px] px-4 rounded-md text-xs font-bold leading-6 tracking-widest text-center text-white;
	}

	.label-content span,
	button {
		@apply inline-flex items-center text-xs font-bold leading-6 tracking-normal text-white opacity-70 transition-all duration-200 ease-out mb-[5px];
	}

	.betting-variant-button span {
		@apply transition-[background_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.betting-variant-button:active span {
		transform: scale(0.95);
	}

	.button-text {
		@apply text-sm font-semibold tracking-wide text-center text-white;
	}

	/* button.bet {
		@apply w-full text-white bg-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 text-center;
	} */

	.btn-parent-v1 {
		@apply flex gap-4;
	}

	.buttons-v1 {
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		border-radius: 2px;
		background-color: #3f4b79;
		padding: 5px 9px;
		font-size: 14px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.71;
		letter-spacing: normal;
		text-align: center;
		color: #ffffff;
		transition:
			background-color 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;

		margin-top: 4px;
		margin-bottom: 4px;
	}

	.buttons-v1:last-child {
		font-size: 12px;
	}

	.buttons-v1:hover {
		background-color: #848aa05c;
		transition:
			background-color 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.buttons-v1:active span {
		transform: scale(0.95);
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.buttons-v2 {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		border-radius: 2px;
		background-color: #4769fc;
		padding: 2px 8px;
		font-size: 9px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: 0.91px;
		text-align: center;
		color: #ffffff;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;

		margin-top: 4px;
		margin-bottom: 4px;
	}

	.buttons-v2 span {
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.buttons-v2.active span {
		transform: scale(0.95);
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.tooltip-parent {
		position: relative;
		top: 0;
	}
	.tooltip {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	.is-greater-than-three {
		/* Your specific styles when the count is greater than three */
		right: 1em;
	}

	.bet-countdown {
		position: relative;
	}

	.bet-countdown span {
		@apply inline-flex flex-shrink-0 justify-center items-center font-bold text-blue-500 w-[18px] whitespace-nowrap absolute top-1/2 -translate-x-1 -translate-y-1/2 pointer-events-none cursor-text right-[0.75em];
	}
</style>
