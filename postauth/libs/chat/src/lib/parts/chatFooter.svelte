<script lang="ts">
	import BusinessSendPlaneFill from '$lib/icons/businessSendPlaneFill.svelte';
	import DropletFill from '$lib/icons/dropletFill.svelte';
	import FaSolidAt from '$lib/icons/faSolidAt.svelte';
	import FinanceMoneyDollarCircleLine from '$lib/icons/financeMoneyDollarCircleLine.svelte';
	import HappyFace from '$lib/icons/happyFace.svelte';
	import TrophyFill from '$lib/icons/trophyFill.svelte';
	import BiggestWinners from '$lib/parts/biggestWinners.svelte';
	import RainModal from '$lib/parts/rainModal.svelte';
	import TipModal from '$lib/parts/tipModal.svelte';
	import { Popover } from 'flowbite-svelte';
	import Select from 'svelte-select';

	let items = [
		'Global',
		'Sports',
		'English',
		'Português',
		'Indonesian',
		'Руccкий',
		'فارسی',
		'Español',
		'Filipino',
		'Deutsch',
		'Français',
		'Urdu'
	];

	let showRainModal = false;
	let showTipModal = false;
	let text = '';
	const maxLength = 160;

	function remainingCharacters(str: string) {
		return maxLength - str.length;
	}
</script>

<div class="chat_footer">
	<div class="chat_footer__content">
		<div class="chat_footer__messageLine">
			<div class="chat_footer__messageText">
				<textarea placeholder="Enter your message" maxlength={maxLength} bind:value={text} />
				<div class="chat_text__features">
					<span>{remainingCharacters(text)}</span>
					<button class="chat_footer__commandsLine-button"><HappyFace /> </button>
				</div>
			</div>
			<div class="chat_footer__messageSend">
				<button type="button">
					<BusinessSendPlaneFill />
				</button>
			</div>
		</div>
		<div class="chat_footer__commandsLine">
			<Select {items} value="English" class="chat_select__room" />

			<button type="button" id="rain" on:click={() => (showRainModal = true)}>
				<DropletFill />
			</button>
			<button type="button" id="tag">
				<FaSolidAt />
			</button>

			<button type="button" id="tip" on:click={() => (showTipModal = true)}
				><FinanceMoneyDollarCircleLine />
			</button>
			<button type="button" id="winners">
				<TrophyFill />
			</button>
			<Popover
				class="w-[17rem] text-sm font-light "
				title="Biggest Winner Today"
				placement="left"
				trigger="click"
				triggeredBy="#winners"
			>
				<BiggestWinners />
			</Popover>
		</div>
	</div>
</div>

<RainModal bind:showRainModal />
<TipModal bind:showTipModal />

<style lang="postcss">
	.chat_footer {
		@apply w-full p-4 pb-0;
	}
	.chat_footer__content {
		@apply flex w-full flex-col;
	}
	.chat_footer__messageLine {
		@apply flex justify-between items-center;
	}
	.chat_footer__messageText {
		@apply flex rounded border border-solid border-primary-600 bg-primary-900 justify-between items-center h-16 w-full;
	}
	.chat_footer__messageLine textarea {
		@apply h-14 w-full text-sm border-none whitespace-pre-wrap break-words leading-5 bg-primary-900 p-2 cursor-text min-h-[3rem] resize-none;
	}
	.chat_footer__messageLine span {
		@apply inline-flex justify-center items-center text-xs leading-6 text-gray-200;
	}
	.chat_footer__messageLine button {
		@apply inline-flex items-center border-none p-2;
	}
	.chat_text__features {
		@apply flex flex-col;
	}
	.chat_text__features button {
		@apply py-0;
	}
	.chat_footer__messageSend {
		@apply flex items-center rounded border border-solid border-primary-600 bg-green-600 ml-2 h-16 w-[22%] justify-center;
	}
	.chat_footer__messageSend:hover {
		@apply bg-green-700;
	}
	.chat_footer__commandsLine {
		@apply flex w-full justify-between mt-4 mb-4;
	}
	.chat_footer__commandsLine-button {
		@apply text-sm relative inline-flex items-center justify-center rounded py-2 px-4 p-3;
	}
	textarea:focus {
		@apply outline-none;
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
	:global(.chat_select__room) {
		background-color: #2c3763 !important;
		border: none !important;
		width: 60% !important;
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
	:global(.chat_icon.trophy:hover) {
		fill: #fbbe00;
	}
</style>
