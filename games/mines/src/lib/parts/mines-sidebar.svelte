<script lang="ts">
	import CoinIcon from '$lib/parts/components/common/crypto-icon-getter.svelte';
	import FiatCoinIcon from '$lib/parts/components/common/icon-getter.svelte';
	import CustomButton from './components/common/custom-button.svelte';
	import LabelInput from './components/common/label-input.svelte';

	import { Tooltip } from '@svelte-plugins/tooltips';

	import {
		decimalCryptoDisplay,
		decimalDisplayLength,
		getNextDecimal,
		roundOff2
	} from '../utils/helper.js';

	import {
		betAmount,
		coinPriceData,
		curBalance,
		currentWalletState,
		initialBetAmount,
		loading,
		maxBet,
		profitOnWin,
		selectedFiatCurrency
	} from '$lib/parts/store/store';

	let tooltip = false;

	function handleBetAmountChange(mode: string) {
		let newAmount = $betAmount;

		if (mode === 'half') {
			newAmount =
				$selectedFiatCurrency && $coinPriceData
					? (parseFloat($betAmount) / 2).toFixed(2)
					: (parseFloat($betAmount) / 2).toFixed(decimalDisplayLength($currentWalletState.type));
		} else if (mode === 'double') {
			const doubleAmount = parseFloat($betAmount) * 2;
			if (
				doubleAmount <=
				Math.min(parseFloat($currentWalletState.available.toString()), parseFloat($maxBet))
			) {
				newAmount =
					$selectedFiatCurrency && $coinPriceData
						? doubleAmount.toFixed(2)
						: doubleAmount.toFixed(decimalDisplayLength($currentWalletState.type));
			}
		} else if (mode === 'maxBet') {
			newAmount =
				$selectedFiatCurrency && $coinPriceData
					? //@ts-ignore
						roundOff2(Number($maxBet) * Number($coinPriceData[$currentWalletState.type] || '0'))
					: $maxBet;
		}

		if ($betAmount === '0.00000000') {
			newAmount = '0.00000001';
		} else if ($betAmount === '0.00') {
			newAmount = '0.01';
		}

		console.log($betAmount);
		console.log('Bet amount change mode:', mode);

		betAmount.set(newAmount);

		initialBetAmount.set(parseFloat(newAmount));
	}

	function buttonClickHandler() {
		console.log('button test');
	}
</script>

<div class="game-sidebar-wrapper">
	<div class="sidebar-main">
		<!-- FIRST INPUT -->
		<div>
			<div
				style="display: flex; flex-direction: column; justify-content: flex-start; align-items: start;"
				class="label-content"
			>
				<span>Bet Amount</span>
				<button>(Min 0 to 100.00 Max)</button>
				<span>(Balance - {$curBalance})</span>
			</div>
			<LabelInput
				min={0}
				step={$selectedFiatCurrency && $coinPriceData
					? '0.01'
					: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
				type={'number'}
				valueStore={betAmount}
				dataTestId="bet-amount"
				integerOnly={true}
				disabled={$loading}
			>
				<div slot="inputIcon">
					{#if $selectedFiatCurrency}
						<FiatCoinIcon coin={$coinPriceData.Fiat} biggerIcon={true} />
					{:else}
						<CoinIcon pxSize={16} coin={$currentWalletState?.type} />
					{/if}
				</div>
				<div class="btn-parent-v1" slot="buttons">
					<button class="buttons-v1" on:click={() => handleBetAmountChange('half')}>
						<span>½</span>
					</button>
					<button class="buttons-v1" on:click={() => handleBetAmountChange('double')}>
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
			<!-- <LabelInput
				min={0}
				step={$selectedFiatCurrency && $coinPriceData
					? '0.01'
					: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
				type={'number'}
				valueStore={betAmount}
				dataTestId="mines"
				integerOnly={true}
				labelContent="Mines"
			>
				<div slot="inputIcon">
					{#if $selectedFiatCurrency}
						<FiatCoinIcon coin={$coinPriceData.Fiat} biggerIcon={true} />
					{:else}
						<CoinIcon pxSize={16} coin={$currentWalletState?.type} />
					{/if}
				</div>
			</LabelInput> -->
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
	}

	.betting-variant-button:active span {
		@apply transform scale-95;
	}

	.button-text {
		@apply text-sm font-semibold tracking-wide text-center text-white;
	}

	.btn-parent-v1 {
		@apply flex gap-2;
	}

	.buttons-v1 {
		@apply flex justify-center items-center flex-shrink-0 bg-[#3f4b79] rounded-sm py-[5px] px-[9px] text-sm font-medium leading-[1.71] text-center text-white my-1 transition-[background-color_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
	}

	.buttons-v1:last-child {
		@apply text-xs;
	}

	.buttons-v1:hover {
		@apply bg-[#848aa05c] transition-[background-color_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
	}

	.buttons-v1:active span {
		@apply transform scale-95 transition-[background_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
	}

	.tooltip-parent {
		@apply relative top-0;
	}

	.tooltip {
		@apply absolute top-1/2 left-1/2 transform -translate-x-1 -translate-y-1/2 z-[100];
	}

	.is-greater-than-three {
		@apply right-[1em];
	}
</style>
