<script lang="ts">
	import { currencies } from '$lib/data/currencies';
	import CurrencyIcon from '$lib/parts/currencyIcon.svelte';
	import { Button, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';

	export let showRainModal: boolean;

	let text = '';
	let selectedCurrency = { value: 'BTC', label: 'Bitcoin' };
	let focusStates = {
		amountInput: false,
		peopleInput: false,
		messageInput: false
	};

	let items = currencies.map((currency) => ({
		value: currency.code,
		label: currency.name
	}));

	const maxLength = 20;

	function remainingCharacters(str: string) {
		return maxLength - str.length;
	}

	function onFocus(id: string) {
		focusStates = { ...focusStates, [id]: true };
	}

	function onBlur(id: string) {
		focusStates = { ...focusStates, [id]: false };
	}

	function handleCurrencies(item: any) {
		selectedCurrency = item;
	}
</script>

<Modal title="Rain" bind:open={showRainModal} size="xs" outsideclose>
	<div class="dialog_content">
		<div class="amount_input">
			<div class="input_label">
				<div class="rainModal_amount-label">
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
				<div class="rainModal_amount-view">
					<Button
						color="light"
						id="avatar_with_name"
						class="!p-1 !py-2 w-full dark:focus-within:ring-0"
					>
						<CurrencyIcon icon={selectedCurrency.value} />
						<div class="flex items-center ml-2">
							{selectedCurrency.value} ({selectedCurrency.label}) <ChevronDownSolid
								class="w-3 h-3 ml-2 text-white dark:text-white focus:ring-0 dark:focus-within:ring-0"
							/>
						</div>
					</Button>
					<Dropdown class="w-48 overflow-y-auto py-1 h-48" triggeredBy="#avatar_with_name">
						{#each items as item}
							<DropdownItem
								class="flex items-center text-sm gap-2 dark:bg-white-100"
								on:click={() => handleCurrencies(item)}
							>
								<CurrencyIcon icon={item.value} />
								{item.value} ({item.label})
							</DropdownItem>
						{/each}
					</Dropdown>
				</div>
			</div>
		</div>
		<div class="rainModal_unlock-balance">
			<div class="available unlock_item">
				<div class="mr-1">Available:</div>
				<div class="value text-white">0 BTC</div>
			</div>
			<div class="locked unlock_item">
				<a href="/" class="mr-1 underline">Locked funds:</a>
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
	.rainModal_amount-label {
		@apply flex w-full h-full justify-between items-center;
	}
	.rainModal_unlock-balance {
		@apply flex items-end justify-between flex-wrap mt-2;
	}
	.rainModal_amount-view {
		@apply flex items-center w-48 h-full justify-between;
	}
	.btn-button {
		@apply text-sm rounded flex items-center bg-green-600 w-80 font-bold m-auto mt-9 p-4 justify-center;
	}
	.btn-button:hover {
		@apply bg-green-700;
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
	:global(.chat_icon) {
		fill: #929abe;
	}
	:global(.chat_icon:hover) {
		fill: white;
	}
</style>
