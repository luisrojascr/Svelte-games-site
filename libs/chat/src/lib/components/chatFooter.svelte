<script>
	// @ts-nocheck
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiHappy from 'svelte-icons-pack/bi/BiHappy';
	import BsDropletFill from 'svelte-icons-pack/bs/BsDropletFill';
	import BsTrophyFill from 'svelte-icons-pack/bs/BsTrophyFill';
	import FaSolidAt from 'svelte-icons-pack/fa/FaSolidAt';
	import RiBusinessSendPlaneFill from 'svelte-icons-pack/ri/RiBusinessSendPlaneFill';
	import Select from 'svelte-select';
	import RainModal from '../components/rainModal.svelte';

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

	let showModal = false;

	let text = '';
	const maxLength = 160;

	function remainingCharacters(str) {
		return maxLength - str.length;
	}

	function handleRainModal() {
		showModal = !showModal;
	}
</script>

<div class="chat_footer">
	<div class="chat_footer__content">
		<div class="chat_footer__messageLine">
			<div class="chat_footer__messageText">
				<textarea placeholder="Enter your message" maxlength={maxLength} bind:value={text} />
				<div class="chat_text__features">
					<span>{remainingCharacters(text)}</span>
					<button class="chat_footer__commandsLine-button"
						><Icon src={BiHappy} size="22" className="chat_icon" />
					</button>
				</div>
			</div>
			<div class="chat_footer__messageSend">
				<button type="button">
					<Icon src={RiBusinessSendPlaneFill} size="24" color="white" />
				</button>
			</div>
		</div>
		<div class="chat_footer__commandsLine">
			<Select {items} value="English" class="chat_select__room" />

			<button type="button" on:click={handleRainModal}>
				<Icon src={BsDropletFill} size="16" className="chat_icon" /></button
			>
			<button type="button"><Icon src={FaSolidAt} size="16" className="chat_icon" /></button>
			<button type="button"><Icon src={BsTrophyFill} size="16" className="chat_icon" /></button>
		</div>
	</div>
</div>

<RainModal {showModal} />

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
		@apply flex rounded border border-solid border-primary-600 bg-primary-900 justify-between items-center h-16;
	}
	.chat_footer__messageLine textarea {
		@apply h-14 w-full text-sm border-none whitespace-pre-wrap break-words leading-5 bg-primary-900 p-2 cursor-text min-h-[3rem] resize-none;
	}
	.chat_footer__messageLine span {
		@apply inline-flex justify-center items-center text-xs leading-6 text-gray-200;
	}
	.chat_footer__messageLine button {
		@apply inline-flex justify-center items-center border-none p-2 ml-1;
	}
	.chat_text__features {
		@apply flex flex-col;
	}
	.chat_text__features button {
		@apply py-0;
	}
	.chat_footer__messageSend {
		@apply flex items-center rounded border border-solid border-primary-600 bg-green ml-2 h-16 w-1/5;
	}
	.chat_footer__messageSend:hover {
		@apply bg-dark-green;
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
</style>
