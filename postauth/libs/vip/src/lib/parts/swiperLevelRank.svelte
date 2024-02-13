<script lang="ts">
	import BlueWhale from '$lib/assets/Ranks/blue-whale.svg';
	import Crab from '$lib/assets/Ranks/crab.svg';
	import Dolphin from '$lib/assets/Ranks/dolphin.svg';
	import ElectricEel from '$lib/assets/Ranks/electric-eel.svg';
	import GreatWhiteShark from '$lib/assets/Ranks/great-white-shark.svg';
	import KillerWhale from '$lib/assets/Ranks/killer-whale.svg';
	import Minnow from '$lib/assets/Ranks/minnow.svg';
	import Octopus from '$lib/assets/Ranks/octopus.svg';
	import Plankton from '$lib/assets/Ranks/plankton.svg';
	import Shrimp from '$lib/assets/Ranks/shrimp.svg';
	import Swordfish from '$lib/assets/Ranks/swordfish.svg';
	import Plants from '$lib/assets/plants.svg';
	import WaterBlue from '$lib/assets/water-fill-blue.svg';
	import WaterGreen from '$lib/assets/water-fill-green.svg';

	export let levelName: string;
	export let success: boolean;
	export let current: boolean;

	type animalImagesType = {
		[key: string]: string; // index signature
		'blue-whale': string;
		crab: string;
		dolphin: string;
		'electric-eel': string;
		'great-white-shark': string;
		'killer-whale': string;
		minnow: string;
		octopus: string;
		plankton: string;
		shrimp: string;
		swordfish: string;
	};

	const animalImages: animalImagesType = {
		'blue-whale': BlueWhale,
		crab: Crab,
		dolphin: Dolphin,
		'electric-eel': ElectricEel,
		'great-white-shark': GreatWhiteShark,
		'killer-whale': KillerWhale,
		minnow: Minnow,
		octopus: Octopus,
		plankton: Plankton,
		shrimp: Shrimp,
		swordfish: Swordfish
	};
</script>

<div class={`slider-level-icon ${current ? 'current' : ''}`}>
	<div class="slider-level-card">
		<img class="slider-level-image" src={animalImages[levelName]} alt="" />
		<img class="slider-background-plants" src={Plants} alt="Plants" />

		{#if success || current}
			<div class={`slider-level-fill ${success ? 'success' : current ? 'current' : ''}`}>
				{#if success}
					<img class="slider-level-fill-img" src={WaterGreen} alt="" />
				{:else}
					<img class="slider-level-fill-img" src={WaterBlue} alt="" />
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.slider-level-icon {
		@apply flex justify-center items-center bg-gray-300 overflow-hidden m-auto w-[64px] h-[47.09px];
	}
	.slider-level-icon.current {
		@apply w-[83px] h-[57px] bg-primary-200;
	}
	.slider-level-icon img {
		@apply w-[50px] h-[50px];
	}
	.slider-level-card {
		@apply relative flex flex-col justify-end h-full w-full;
	}
	.slider-level-image {
		@apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2];
	}
	.slider-background-plants {
		@apply absolute top-1/2 bottom-1/2 z-[1];
	}
	.slider-level-fill {
		@apply w-full relative;
	}
	.slider-level-fill.success {
		@apply bg-green-600 h-[92%];
	}
	.slider-level-fill.current {
		@apply bg-primaryBlue h-[4%];
	}
	.slider-level-fill-img {
		@apply top-[-4px] h-[9px] w-full absolute;
	}
</style>
