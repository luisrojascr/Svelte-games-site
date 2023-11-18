<script lang="ts">
	// @ts-nocheck
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineRight from 'svelte-icons-pack/ai/AiOutlineRight';
	import Select from 'svelte-select';
	import { currencies } from '../data/currencies';
	import Modal from './modal.svelte';

	export let showModal;

	let text = '';
	let showCurrencies = false;
	let selectedCurrency = { value: 'BTC', label: 'Bitcoin', icon: '../icons/bitcoin.svg' };
	let focusStates = {
		amountInput: false,
		peopleInput: false,
		messageInput: false
	};

	let items = currencies.map((currency) => ({
		value: currency.code,
		label: currency.name,
		icon: currency.icon
	}));

	const maxLength = 20;

	function remainingCharacters(str) {
		return maxLength - str.length;
	}

	function onFocus(id) {
		focusStates = { ...focusStates, [id]: true };
	}

	function onBlur(id) {
		focusStates = { ...focusStates, [id]: false };
	}

	function handleCurrencies(e: HTMLSelectElement) {
		showCurrencies = false;
		selectedCurrency = e.detail;
	}
</script>

<Modal bind:showModal>
	<h2 slot="header" class="text-white">Rain</h2>
	<div class="dialog_content">
		<div class="amount_input">
			<div class="input_label">
				<div class="amount_label flex w-full h-full justify-between items-center">
					<p>Amount</p>
					<p>Min: 0.00002813 BTC</p>
				</div>
			</div>
			<div class="input_control" class:highlight={focusStates.amountInput}>
				<input
					type="text"
					value="0.00002813"
					class="text-white border-0 outline-none focus:ring-0"
					on:focus={() => onFocus('amountInput')}
					on:blur={() => onBlur('amountInput')}
				/>
				<div class="amount_view">
					{#if showCurrencies}
						<Select {items} showChevron class="select-currency" on:change={handleCurrencies}>
							<div slot="item" let:item>
								<img src={item.icon} alt="Icon" width="20" height="20" />
								{item.value} ({item.label})
							</div>
						</Select>
					{:else}
						<button
							on:click={() => (showCurrencies = !showCurrencies)}
							class="flex items-center bg-transparent dark:bg-transparent dark:hover:bg-transparent p-0"
						>
							<img src={selectedCurrency.icon} class="mr-2" alt="Icon" width="20" height="20" />
							{selectedCurrency.value} ({selectedCurrency.label})<Icon
								src={AiOutlineRight}
								size="16"
								className="chat_icon"
							/></button
						>
					{/if}
				</div>
			</div>
		</div>
		<div class="unlock-balance flex items-end justify-between flex-wrap mt-2">
			<div class="available unlock_item">
				<div class="mr-1">Available:</div>
				<div class="value text-white">0 BTC</div>
			</div>
			<div class="locked unlock_item">
				<a href="/" keep-scroll-position="true" class="mr-1 underline">Locked funds:</a>
				<span class="value text-white">0 BTC</span>
			</div>
		</div>
		<div class="people-input mt-4">
			<div class="input_label">Number of people</div>
			<div class="input_control" class:highlight={focusStates.peopleInput}>
				<input
					type="text"
					class="text-white border-0 outline-none focus:ring-0"
					on:focus={() => onFocus('peopleInput')}
					on:blur={() => onBlur('peopleInput')}
					value="50"
				/>
				<div class="dialog-gray">1~100</div>
			</div>
		</div>
		<div class="rain_textarea mt-4">
			<div class="input_label">Message (Optional)</div>
			<div class="input_control" class:highlight={focusStates.messageInput}>
				<textarea
					bind:value={text}
					on:focus={() => onFocus('messageInput')}
					on:blur={() => onBlur('messageInput')}
				/>
				<div class="rain-len absolute right-5 bottom-3 text-xs">0/{remainingCharacters(text)}</div>
			</div>
		</div>
		<button class="btn-button"
			><div class="button-inner flex items-center justify-center text-white">Pour rain</div></button
		>
	</div>
</Modal>

<style lang="postcss">
	.btn-button {
		@apply text-sm rounded flex items-center bg-green w-80 font-bold m-auto mt-9 p-4 justify-center;
	}
	.btn-button:hover {
		@apply bg-dark-green;
	}
	.dialog_content {
		@apply mt-5;
	}
	.input_label {
		@apply flex items-center h-5 w-full leading-5 mb-2;
	}
	.input_control {
		@apply flex rounded border border-solid border-primary-600 items-center relative px-5 h-14;
	}
	.input_control input {
		@apply flex-1 w-full h-full p-0 bg-transparent;
	}
	.amount_view {
		@apply flex items-center w-40 h-full justify-between;
	}
	.unlock_item {
		@apply flex items-center justify-center;
	}
	.rain_textarea textarea {
		@apply flex-1 w-full h-full min-w-[1rem] py-5 bg-transparent resize-none border-0 outline-none;
	}
	.rain_textarea .input_control {
		@apply h-36;
	}
	.highlight {
		@apply border border-solid border-white;
	}
	textarea:focus {
		@apply ring-0;
	}
	:global(.list-item .item.hover, .list-item .item:active) {
		background: #2c3763 !important;
	}
	:global(.list-item .item.active) {
		background: #46d180 !important;
	}
	:global(.list-item, .selected-item) {
		font-size: 0.875rem !important;
	}
	:global(.list-item .item div) {
		display: flex !important;
		font-size: 0.875rem !important;
	}
	:global(.list-item .item img) {
		margin-right: 0.3rem;
	}
	:global(.select-currency) {
		background-color: #2c3763 !important;
		border: none !important;
		font-size: 0.875rem !important;
	}
	:global(.svelte-select-list) {
		background-color: #111a41 !important;
	}
	:global(.chat_icon) {
		fill: #929abe;
	}
	:global(.chat_icon:hover) {
		fill: white;
	}
</style>
