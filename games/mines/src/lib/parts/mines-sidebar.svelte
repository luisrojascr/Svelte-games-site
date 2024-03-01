<script lang="ts">
	import { derived, get, writable } from 'svelte/store';

	import CoinIcon from '$lib/parts/components/common/crypto-icon-getter.svelte';
	import FiatCoinIcon from '$lib/parts/components/common/icon-getter.svelte';
	import CustomButton from './components/common/custom-button.svelte';
	import CustomDropdown from './components/common/custom-dropdown.svelte';
	import LabelInput from './components/common/label-input.svelte';

	import InfinityIcon from '$lib/assets/images/InfinityIcon.svelte';
	import PercentIcon from '$lib/assets/images/PercentIcon.svelte';

	import { Tooltip } from '@svelte-plugins/tooltips';

	import type { Option } from './store/mines-types';

	import { BettingVariants, CurrencyEnum, OnLoss, OnWin } from '$lib/utils/cc.js';

	import {
		decimalCryptoDisplay,
		decimalDisplayLength,
		getNextDecimal,
		roundOff2
	} from '../utils/helper.js';

	import {
		autoBetInProgress,
		betAmount,
		coinPriceData,
		curBalance,
		currentWalletState,
		gameInProgress,
		handleAutoBet,
		handleBet,
		handleCashout,
		handleRandomClick,
		initialBetAmount,
		inputStopOnLoss,
		inputStopOnProfit,
		leftGems,
		loading,
		maxBet,
		numOfBets,
		numOfMines,
		onLoss,
		onWin,
		selectedFiatCurrency,
		selectedOnLoss,
		selectedOnWin,
		totalMultiplier
	} from '$lib/parts/store/store';

	let tooltip = false;

	const bettingVariant = writable(BettingVariants.MANUAL);

	function setActiveVariant(variant: BettingVariants) {
		if (!get(gameInProgress) && !get(autoBetInProgress)) {
			bettingVariant.set(variant);
		}
	}

	function handleOnWinReset() {
		selectedOnWin.set(OnWin.AUTO);
		onWin.set('0.00');
	}

	function handleOnWinIncrease() {
		selectedOnWin.set(OnWin.INCREASE);
	}

	function handleOnLossReset() {
		selectedOnLoss.set(OnLoss.AUTO);
		onLoss.set('0.00');
	}

	function handleOnLossIncrease() {
		selectedOnLoss.set(OnLoss.INCREASE);
	}

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

	$: inputLossDisabled = $selectedOnLoss === OnLoss.AUTO;

	$: inputWinDisabled = $selectedOnWin === OnWin.AUTO;

	$: isDisabled = get(gameInProgress) || get(autoBetInProgress);

	let buttonText: string;
	let clickAction: any;

	$: {
		if ($autoBetInProgress) {
			buttonText = 'Stop Autobet';
			clickAction = handleCashout;
		} else {
			buttonText = 'Start Autobet';
			clickAction = handleAutoBet;
		}
	}

	$: currentOption = {
		value: $numOfMines,
		label: $numOfMines.toString()
	};

	$: isBetAmountValid =
		(parseFloat($betAmount) > 0 && parseFloat($betAmount) < 1) || parseFloat($betAmount) >= 1;
</script>

<div class="game-sidebar-wrapper">
	<div class="sidebar-main">
		<div class="betting-variant-line">
			<button
				class="betting-variant-button"
				style="background-color: {$bettingVariant === BettingVariants.MANUAL
					? '#4769FC'
					: '#3F4B79'}; opacity: {$bettingVariant === BettingVariants.MANUAL ? 1 : 0.7};"
				on:click={() => setActiveVariant(BettingVariants.MANUAL)}
				data-testid="manual-bet"
				disabled={isDisabled}
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
				disabled={isDisabled}
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
			</div>

			{#if $gameInProgress}
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
		{/if}

		<!-- AUTO BET HERE  -->
		{#if $bettingVariant === BettingVariants.AUTO}
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
			</div>

			{#if $gameInProgress}
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
			{/if}

			<!-- DROPDOWN -->
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

			<div>
				<LabelInput
					min={0}
					step={$selectedFiatCurrency && $coinPriceData
						? '0.01'
						: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
					type={'number'}
					valueStore={numOfBets}
					dataTestId="bet-amount"
					integerOnly={true}
					labelContent="Number Of Bets"
					allowUpdate={false}
					disabled={$loading || $gameInProgress || $autoBetInProgress}
				>
					<div slot="count">
						{#if $numOfBets === 0}
							<InfinityIcon />
						{:else}
							<div class="bet-countdown">
								<span>{$numOfBets}</span>
							</div>
						{/if}
					</div>
				</LabelInput>
			</div>

			{#if !$autoBetInProgress}
				<div>
					<LabelInput
						min={0}
						step={selectedFiatCurrency && coinPriceData
							? '0.01'
							: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
						type={'number'}
						valueStore={onWin}
						dataTestId="on-win"
						integerOnly={true}
						labelContent="ON WIN"
						buttonsPosition={'start'}
						disabled={$loading || $gameInProgress || $autoBetInProgress || inputWinDisabled}
					>
						<PercentIcon width="11px" height="13px" fill="#848aa0" slot="inputIcon" />

						<div class="btn-parent-v2" slot="buttons">
							<button
								class="buttons-v2"
								disabled={$loading || $gameInProgress || $autoBetInProgress}
								class:selected={$selectedOnWin === OnWin.AUTO}
								on:click={handleOnWinReset}
							>
								<span>RESET</span>
							</button>
							<button
								class="buttons-v2"
								disabled={$loading || $gameInProgress || $autoBetInProgress}
								class:selected={$selectedOnWin === OnWin.INCREASE}
								on:click={handleOnWinIncrease}
							>
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
						valueStore={numOfBets}
						dataTestId="on-loss"
						integerOnly={true}
						labelContent="ON LOSS"
						buttonsPosition={'start'}
						disabled={$loading || $gameInProgress || $autoBetInProgress || inputLossDisabled}
					>
						<PercentIcon width="11px" height="13px" fill="#848aa0" slot="inputIcon" />

						<div class="btn-parent-v2" slot="buttons">
							<button
								class="buttons-v2"
								disabled={$loading || $gameInProgress || $autoBetInProgress}
								class:selected={$selectedOnLoss === OnLoss.AUTO}
								on:click={handleOnLossReset}
							>
								<span>RESET</span>
							</button>
							<button
								class="buttons-v2"
								disabled={$loading || $gameInProgress || $autoBetInProgress}
								class:selected={$selectedOnLoss === OnLoss.INCREASE}
								on:click={handleOnLossIncrease}
							>
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
						valueStore={inputStopOnProfit}
						dataTestId="bet-amount"
						integerOnly={true}
						disabled={$loading || $gameInProgress || $autoBetInProgress}
						labelContent="Stop On Profit"
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
				<div>
					<LabelInput
						min={0}
						step={selectedFiatCurrency && coinPriceData
							? '0.01'
							: getNextDecimal(decimalCryptoDisplay(0, $currentWalletState.type))}
						type={'number'}
						valueStore={inputStopOnLoss}
						dataTestId="bet-amount"
						integerOnly={true}
						disabled={$loading || $gameInProgress || $autoBetInProgress}
						labelContent="Stop On Loss"
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
			{/if}

			<div>
				<CustomButton
					type="submit"
					onClick={clickAction}
					width={'100%'}
					bgColor={$autoBetInProgress ? '#ff2c55' : '#00b16c'}
					color={'#fff'}
					padding={'16px'}
					margin={'10px 0px'}
					disabled={(gameInProgress && 25 - $numOfMines - $leftGems == 0) ||
						!gameInProgress ||
						!isBetAmountValid}
					dataTestId={'bet-button'}
					{buttonText}
				></CustomButton>
			</div>
		{/if}

		<!-- <div>
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
				</div> -->

		<!-- <div>
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
				</div> -->
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

	.betting-variant-button:active span {
		@apply transform scale-95;
	}

	.mines-autobet {
		@apply flex;
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

	.btn-parent-v2 {
		@apply flex gap-2 h-full;
	}

	.buttons-v2 {
		@apply relative text-[9px] font-bold leading-[1.6] tracking-[0.91px] text-center inline-flex justify-center items-center flex-shrink-0 rounded-sm py-[2px] px-2 my-1;
		background-color: #3f4b79;
		color: #848aa0;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.buttons-v2.selected {
		background-color: #4769fc;
		color: #ffffff;
	}

	.buttons-v2 span {
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.buttons-v2:disabled {
		@apply cursor-not-allowed;
	}

	.buttons-v2.active span {
		transform: scale(0.95);
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
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

	.bet-countdown {
		@apply relative;
	}

	.bet-countdown span {
		@apply inline-flex flex-shrink-0 justify-center items-center font-bold text-blue-500 w-[18px] whitespace-nowrap absolute top-1/2 transform -translate-x-1 -translate-y-1/2 pointer-events-none cursor-text right-[0.75em];
	}

	@media (min-width: 750px) {
		.game-sidebar-wrapper {
			@apply max-w-[292.5px];
		}
	}
</style>
