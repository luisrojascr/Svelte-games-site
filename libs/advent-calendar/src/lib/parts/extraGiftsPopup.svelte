<script lang="ts">
	import CloseIcon from '$lib/images/close-x.svg';
	import ExtraGiftsModalImg from '$lib/images/extra-gifts-modal-bg.svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let isMobile = false;

	const closePopup = () => {
		dispatch('closePopup');
	};

	const handleExplore = () => {
		console.log('handle explore...');
	};
</script>

<div class="popup-container">
	<button class="close-btn" on:click={closePopup}>
		<img src={CloseIcon} alt="Close icon" />
	</button>
	<img class="extragiftsimg" src={ExtraGiftsModalImg} alt="Extra gifts pop up background" />
	<div class="popup-content">
		<p>
			{#if isMobile}
				Unwrap joy for an extra <span>6 days</span> of festive surprises!
			{:else}
				Extra <span>6 Gifts</span> Added! <br />
				Unwrap daily gifts until the end of the month!
			{/if}
		</p>
		<button on:click={handleExplore}>Explore</button>
	</div>
</div>

<style lang="postcss">
	.popup-container {
		@apply inline-block overflow-hidden relative w-[384px] h-[210px];
	}
	.popup-content {
		@apply relative z-10 p-6 h-[220px];
	}
	.close-btn {
		@apply absolute z-50 top-[9px] right-[8px];
	}
	.popup-container img.extragiftsimg {
		@apply pointer-events-none absolute w-full h-full object-cover;
	}
	.popup-content p {
		@apply text-white text-[21px] font-semibold text-center w-[310px] mt-[14px] mx-auto;
	}
	.popup-content p span {
		@apply text-[#FFDB1E];
	}
	.popup-content button {
		@apply block mt-4 bg-green-600 text-white px-4 py-2 rounded-md transition-colors w-[96px] m-auto text-sm uppercase font-semibold;
	}
	.popup-content button:hover {
		@apply bg-green-700;
	}
</style>
