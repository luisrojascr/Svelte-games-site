<script lang="ts">
	import { derived } from 'svelte/store';

	import CoinIcon from '$lib/parts/components/common/crypto-icon-getter.svelte';
	import FiatCoinIcon from '$lib/parts/components/common/icon-getter.svelte';
	import CustomButton from './components/common/custom-button.svelte';
	import CustomDropdown from './components/common/custom-dropdown.svelte';
	import LabelInput from './components/common/label-input.svelte';

	import { Tooltip } from '@svelte-plugins/tooltips';

	import type { Option } from './store/mines-types';

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
		gameInProgress,
		handleBet,
		handleCashout,
		handleRandomClick,
		initialBetAmount,
		leftGems,
		loading,
		maxBet,
		numOfMines,
		selectedFiatCurrency,
		totalMultiplier
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
			const doubleAmount = parseFloat(newAmount) * 2;
			const maxAllowedBet = Math.min(
				parseFloat($currentWalletState.available.toString()),
				parseFloat($maxBet)
			);

			//@ts-ignore
			newAmount = Math.min(doubleAmount, maxAllowedBet, 100);
		} else if (mode === 'maxBet') {
			newAmount =
				$selectedFiatCurrency && $coinPriceData
					? //@ts-ignore
						roundOff2(Number($maxBet) * Number($coinPriceData[$currentWalletState.type] || '0'))
					: $maxBet;
		}

		betAmount.set(newAmount);

		initialBetAmount.set(parseFloat(newAmount));
	}

	const options = Array(24)
		.fill(null)
		.map((_, i) => ({
			value: i + 1,
			label: (i + 1).toString()
		}));

	function handleNumOfMinesChange(option: Option) {
		if (typeof option.value === 'number') {
			numOfMines.set(option.value);
		}
	}

	const totalProfit = derived(
		[totalMultiplier, betAmount, currentWalletState],
		//@ts-ignore
		([$totalMultiplier, $betAmount, $currentWalletState]) => {
			if ($totalMultiplier == 1) {
				return '0.0';
			} else {
				return ($betAmount * $totalMultiplier).toFixed(
					decimalDisplayLength($currentWalletState.type)
				);
			}
		}
	);

	const displayProfit = derived(
		[totalProfit, selectedFiatCurrency, coinPriceData, betAmount],
		//@ts-ignore
		([$totalProfit, $selectedFiatCurrency, $coinPriceData, $betAmount]) => {
			const profit = parseFloat($totalProfit);
			if (profit) {
				const deduction = profit - parseFloat($betAmount);
				if ($selectedFiatCurrency && $coinPriceData) {
					return deduction.toFixed(2);
				} else {
					return deduction.toFixed(decimalDisplayLength($currentWalletState.type));
				}
			} else {
				if ($selectedFiatCurrency && $coinPriceData) {
					return Number($totalProfit).toFixed(2);
				} else {
					return Number($totalProfit).toFixed(decimalDisplayLength($currentWalletState.type));
				}
			}
		}
	);

	$: currentOption = {
		value: $numOfMines,
		label: $numOfMines.toString()
	};

	$: isBetAmountValid =
		(parseFloat($betAmount) > 0 && parseFloat($betAmount) < 1) || parseFloat($betAmount) >= 1;
</script>

<div class="game-sidebar-wrapper">
	<div class="sidebar-main">
		<!-- FIRST INPUT -->
		<div>
			<div
				style="display: flex; flex-direction: column; justify-content: flex-start; align-items: start;"
				class="label-content"
			>
				<span>BET AMOUNT</span>
				<button on:click={() => handleBetAmountChange('maxBet')}>(Max - 100.00)</button>
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
				integerOnly={false}
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
			<!-- <div class="tooltip-parent">
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
							action="prop">&nbsp;</Tooltip
						>
					{/if}
				</div>
			</div> -->
		</div>

		{#if $gameInProgress}
			<div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					valueStore={displayProfit}
					dataTestId="profit"
					integerOnly={true}
					labelContent="TOTAL PROFIT ({$totalMultiplier}X)"
				>
					<div slot="inputIcon">
						{#if $selectedFiatCurrency}
							<FiatCoinIcon coin={$coinPriceData.Fiat} biggerIcon={true} />
						{:else}
							<CoinIcon pxSize={16} coin={$currentWalletState?.type} />
						{/if}
					</div>
				</LabelInput>
			</div>

			<div class="first-line">
				<LabelInput
					readOnly
					type={'number'}
					valueStore={numOfMines}
					dataTestId="num-of-mines"
					integerOnly={true}
					disabled={$loading}
					labelContent="MINES"
				/>
				<LabelInput
					readOnly
					type={'number'}
					valueStore={leftGems}
					dataTestId="left-gems"
					integerOnly={true}
					disabled={$loading}
					labelContent="GEMS"
				/>
			</div>
		{/if}

		<!-- DROPDOWN -->
		{#if !$gameInProgress}
			<div>
				<CustomDropdown
					bgBlue={true}
					v3={true}
					labelV2={true}
					wrapperStyle={{ backgroundColor: '#222c56' }}
					buttonStyle={{ backgroundColor: '#222c56', color: '#fff' }}
					{options}
					{currentOption}
					handleOptionClick={handleNumOfMinesChange}
					isMobile={false}
				/>
			</div>
		{/if}

		{#if $gameInProgress}
			<div>
				<CustomButton
					type="submit"
					onClick={handleRandomClick}
					width={'100%'}
					bgColor={'#01d180'}
					color={'#fff'}
					padding={'16px'}
					margin={'10px 0px'}
					disabled={$loading}
					dataTestId={'random-button'}
					buttonText={'PICK RANDOM TILE'}
				></CustomButton>
			</div>

			<div>
				<CustomButton
					type="submit"
					onClick={handleCashout}
					width={'100%'}
					bgColor={'#01d180'}
					color={'#fff'}
					padding={'16px'}
					margin={'10px 0px'}
					disabled={(gameInProgress && 25 - $numOfMines - $leftGems == 0) || !gameInProgress}
					dataTestId={'bet-button'}
					buttonText={'Cashout'}
				></CustomButton>
			</div>
		{:else}
			<div>
				<CustomButton
					type="submit"
					onClick={handleBet}
					width={'100%'}
					bgColor={'#01d180'}
					color={'#fff'}
					padding={'16px'}
					margin={'10px 0px'}
					disabled={(gameInProgress && 25 - $numOfMines - $leftGems == 0) ||
						!gameInProgress ||
						!isBetAmountValid}
					dataTestId={'bet-button'}
					buttonText={'Bet'}
				></CustomButton>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(.tooltip.tooltip-theme) {
		--tooltip-background-color: rgb(255, 255, 255);
		--tooltip-color: #222c55;
		--tooltip-font-size: 10px;
		--tooltip-padding: 8px;
	}

	.game-sidebar-wrapper {
		@apply flex flex-col min-w-[275px];
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

	.first-line-bet :first-child {
		@apply mr-4;
	}

	.betting-variant-line {
		@apply inline-flex w-full mb-2.5;
	}

	.betting-variant-line button :first-child {
		@apply rounded-br-none rounded-tr-none;
	}

	.betting-variant-line button :last-child {
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

	.betting-variant-button :active span {
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

	.buttons-v1 :hover {
		@apply bg-[#848aa05c] transition-[background-color_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
	}

	.buttons-v1:active span {
		@apply transform scale-95 transition-[background_300ms_ease_0s,_opacity_300ms_ease_0s,_transform_100ms_ease_0s];
	}

	.tooltip-parent {
		@apply relative top-0;
	}

	.tooltip {
		@apply absolute left-1/2 transform -translate-x-1 -translate-y-6 z-[100] min-w-44;
	}

	.first-line {
		@apply flex justify-center items-center;
	}

	.first-line :first-child {
		@apply mr-[15px];
	}

	@media (min-width: 750px) {
		.game-sidebar-wrapper {
			@apply max-w-[292.5px];
		}
	}
</style>
