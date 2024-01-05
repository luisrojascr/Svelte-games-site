<script lang="ts">
	import ApeCrash1 from '$lib/ape/ape-crash1.svg';
	import ApeCrash2 from '$lib/ape/ape-crash2.svg';
	import Ape from '$lib/ape/ape.svg';
	import Ray from '$lib/ape/ray.svg';
	import Layer1 from '$lib/ape/zone1-layer1.svg';
	import Layer2 from '$lib/ape/zone1-layer2.svg';
	import Layer3 from '$lib/ape/zone1-layer3.svg';
	import Layer4 from '$lib/ape/zone1-layer4.svg';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	let playing = false;
	let crashing = false;
	let paused = false;
	let showFirstApeCrash = true;
	let crashInterval: NodeJS.Timeout | undefined;
	let crashTimeout: NodeJS.Timeout | undefined;
	let gameContainer: HTMLElement | undefined;
	let gameContainerWidth: number;
	const pauseDuration = 2000;
	const durationTime = 80000;

	let backgroundLastVal = 0;
	let midgroundLastVal = 0;
	let midfrontgroundLastVal = 0;
	let foregroundLastVal = 0;

	let background = tweened(backgroundLastVal, { duration: durationTime });
	let midground = tweened(midgroundLastVal, { duration: durationTime });
	let midfrontground = tweened(midfrontgroundLastVal, {
		duration: durationTime
	});
	let foreground = tweened(foregroundLastVal, { duration: durationTime });

	console.log(window.innerWidth);

	const setAnimation = (value: number) => {
		background.set(value);
		midground.set(value * 1.6283); // 7690 - 1504
		midfrontground.set(value * 3.5614); // 14370 --- 15490 - 1504
		// foreground.set(value * 5.5348); // 20260

		let foregroundMultiplier;
		if (window.innerWidth <= 1535 && window.innerWidth >= 1280) {
			foregroundMultiplier = 5.204; // Value for screens between 1280px and 1535px
		} else if (window.innerWidth <= 1279 && window.innerWidth >= 1024) {
			foregroundMultiplier = 4.915; // Value for screens between 1024px and 1279px
		} else if (window.innerWidth <= 1023 && window.innerWidth >= 768) {
			foregroundMultiplier = 4.659; // Value for screens 1023px or smaller
		} else if (window.innerWidth <= 767 && window.innerWidth >= 640) {
			foregroundMultiplier = 4.542; // Value for screens 767px or smaller
		} else if (window.innerWidth <= 640 && window.innerWidth >= 600) {
			foregroundMultiplier = 4.516; // Value for screens 640px or smaller
		} else if (window.innerWidth <= 567) {
			// Dynamically calculate foregroundMultiplier for screens smaller than 567px
			const baseSize = 567;
			const baseMultiplier = 4.478;
			const reductionPer10px = 0.00835;
			const sizeDifference = baseSize - window.innerWidth;
			const multiplierAdjustment = Math.floor(sizeDifference / 10) * reductionPer10px;
			foregroundMultiplier = baseMultiplier - multiplierAdjustment;
		} else {
			foregroundMultiplier = 5.5348; // Default value for screens larger than 1535px
		}
		foreground.set(value * foregroundMultiplier); // Apply the calculated multiplier
	};

	const startAnimation = () => {
		console.log('gameContainerWidth: ', gameContainerWidth);
		const backgroundWidthValue = 5155 - gameContainerWidth; // Layer1 SVG width - gameContainerWidth
		setAnimation(paused ? backgroundLastVal : -backgroundWidthValue);
		playing = true;
		paused = false;
	};

	const resetAnimation = () => {
		playing = false;
		paused = false;
		crashing = false;
		clearInterval(crashInterval);
		clearTimeout(crashTimeout);

		background.set(0, { duration: 100 });
		midground.set(0, { duration: 100 });
		midfrontground.set(0, { duration: 100 });
		foreground.set(0, { duration: 100 });
	};

	const pause = () => {
		paused = true;
		backgroundLastVal = $background;
		midgroundLastVal = $midground;
		midfrontgroundLastVal = $midfrontground;
		foregroundLastVal = $foreground;
	};

	const resume = () => {
		startAnimation();
	};

	const handleCrash = () => {
		if (playing) {
			pause();
			crashing = true;
			crashTimeout = setTimeout(() => {
				toggleApeCrashImage();
				crashing = false;
			}, pauseDuration);
			resume();
		}
	};

	const toggleApeCrashImage = () => {
		crashInterval = setInterval(() => (showFirstApeCrash = !showFirstApeCrash), 3000);
	};

	const calculateWidth = (): number => {
		if (!gameContainer) {
			console.error('The game-container element has not been rendered yet.');
			return 0;
		}

		const style = getComputedStyle(gameContainer);
		return parseFloat(style.width);
	};

	onMount(() => {
		// Call the calculateWidth function after the component mounts
		gameContainerWidth = calculateWidth();
		// Optional: do something with the width
	});

	onDestroy(() => {
		clearInterval(crashInterval);
		clearTimeout(crashTimeout);
	});
</script>

<div bind:this={gameContainer} class="game-container">
	<div class="ape-container">
		<span class="rope"></span>
		{#if crashing}
			{#if showFirstApeCrash}
				<img class="ape-crashing" src={ApeCrash1} alt="Ape" />
			{:else}
				<img class="ape-crashing" src={ApeCrash2} alt="Ape" />
			{/if}
		{:else}
			<img class="ape" src={Ape} alt="Ape" />
		{/if}
	</div>

	{#if crashing}
		<div class="crash">
			<img src={Ray} alt="Ray" />
		</div>
	{/if}

	<!-- Bind the style property to the tweened value for each layer -->
	<div class="layer background-layer" style:transform="translateX({$background}px)">
		<img src={Layer1} alt="Layer 1" />
	</div>
	<div class="layer midground-layer" style:transform="translateX({$midground}px)">
		<img src={Layer2} alt="Layer 2" />
	</div>
	<div class="layer midfrontground-layer" style:transform="translateX({$midfrontground}px)">
		<img src={Layer3} alt="Layer 3" />
	</div>
	<div class="layer foreground-layer" style:transform="translateX({$foreground}px)">
		<img src={Layer4} alt="Layer 4" />
	</div>
</div>
<div class="buttons">
	<button class="play-button" on:click={startAnimation}> Start Animation </button>
	<button class="rain-button" on:click={handleCrash}>Make it crash</button>
	<button class="reset-button" on:click={resetAnimation}>Reset</button>
</div>

<style lang="postcss">
	.game-container {
		@apply relative overflow-hidden w-full h-[420px];
	}
	.game-container img {
		@apply max-w-fit absolute bottom-0;
	}
	.ape-container {
		@apply relative top-[32%] z-10;
	}
	.ape,
	.ape-crashing {
		@apply z-10 w-[60px] top-1/2 left-1/2;
	}
	.ape-crashing {
		transition: opacity 0.5s ease;
		opacity: 1;
		width: 145px;
		top: -19px;
		left: 47%;
	}
	.rope {
		@apply bg-[#a9a9a9] h-[3px] w-full block top-0;
	}
	.crash {
		@apply relative top-[37%] z-10 left-[53%];
	}
	.crash img {
		@apply w-[90px];
	}
	.buttons {
		@apply flex flex-row;
	}
	.play-button,
	.rain-button,
	.reset-button {
		@apply mt-4 bg-green-600 text-white px-4 py-2 rounded-md transition-colors mt-3 ml-0 text-sm px-6;
	}
	.rain-button {
		@apply ml-3 mr-3;
	}
	.layer {
		@apply absolute w-full h-full bottom-0 left-0 will-change-transform;
	}
	.foreground-layer {
		@apply z-20;
	}
</style>
