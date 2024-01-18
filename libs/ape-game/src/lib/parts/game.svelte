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

	// Game layer state variables
	let backgroundVal = 0;
	let midgroundVal = 0;
	let midfrontgroundVal = 0;
	let foregroundVal = 0;

	// Last values to resume from after crash
	let lastBackgroundVal: number;
	let lastMidgroundVal: number;
	let lastMidfrontgroundVal: number;
	let lastForegroundVal: number;

	// Tweened values for smooth animation
	let background = tweened(backgroundVal, { duration: durationTime });
	let midground = tweened(midgroundVal, { duration: durationTime });
	let midfrontground = tweened(midfrontgroundVal, { duration: durationTime });
	let foreground = tweened(foregroundVal, { duration: durationTime });

	let multiplier = 1.0;
	let betMultiplier = 1.1;
	let animationFrameId: number | undefined;

	$: probabilityPercentage = calculateProbability(betMultiplier).toFixed(2) + '%';

	const calculateForegroundMultiplier = (): number => {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 1535) return 5.204;
		if (screenWidth <= 1279) return 4.915;
		if (screenWidth <= 1023) return 4.659;
		if (screenWidth <= 767) return 4.542;
		if (screenWidth <= 640) return 4.516;
		if (screenWidth <= 567) {
			const baseSize = 567;
			const baseMultiplier = 4.478;
			const reductionPer10px = 0.00835;
			const sizeDifference = baseSize - screenWidth;
			const multiplierAdjustment = Math.floor(sizeDifference / 10) * reductionPer10px;
			return baseMultiplier - multiplierAdjustment;
		}
		return 5.5348; // Default
	};

	const calculateProbability = (multiplier: number): number => {
		const baseMultiplier = 1.0;
		const baseProbability = 1.0;
		const decreasePerStep = 0.0001;
		const stepsAboveBase = (multiplier - baseMultiplier) / 0.01;
		let currentProbability = baseProbability - stepsAboveBase * decreasePerStep;
		currentProbability = Math.max(currentProbability, 0);
		return currentProbability;
	};

	const setAnimation = (value: number) => {
		background.set(value);
		midground.set(value * 1.6283); // 7690 - 1504
		midfrontground.set(value * 3.5614); // 15490 - 1504
		// foreground.set(value * 5.5348); // 20260

		const foregroundMultiplier = calculateForegroundMultiplier();
		foreground.set(value * foregroundMultiplier);
	};

	const animate = () => {
		if (playing && !crashing) {
			const backgroundWidthValue = 5155 - gameContainerWidth;
			setAnimation(paused ? backgroundVal : -backgroundWidthValue);
			animationFrameId = requestAnimationFrame(animate);
			multiplier += 0.01;
		}
	};

	const increaseBet = () => {
		betMultiplier += 0.1;
	};
	const decreaseBet = () => {
		if (betMultiplier > 1.1) {
			betMultiplier -= 0.1;
		}
	};

	const handleCrash = () => {
		if (playing) {
			crashing = true;

			// Store the current positions
			lastBackgroundVal = $background;
			lastMidgroundVal = $midground;
			lastMidfrontgroundVal = $midfrontground;
			lastForegroundVal = $foreground;

			// Immediately stop the animations and freeze the layers in their current positions
			background.set($background, { duration: 10 });
			midground.set($midground, { duration: 10 });
			midfrontground.set($midfrontground, { duration: 10 });
			foreground.set($foreground, { duration: 10 });

			crashTimeout = setTimeout(() => {
				toggleApeCrashImage();
				crashing = false;
			}, pauseDuration);
		}
	};

	const resetGameState = () => {
		// Stop any existing animation frame
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		// Reset game state and positions
		multiplier = 1.0;
		crashing = false;
		paused = false;

		resetLayerPositions();

		console.log(`Random start positions set:
			Background: ${backgroundVal},
			Midground: ${midgroundVal},
			Midfrontground: ${midfrontgroundVal},
			Foreground: ${foregroundVal}`);
	};

	const resetLayerPositions = () => {
		// Set a random value for each game layer
		const maxBackgroundOffset = 5155;
		// backgroundVal = Math.random() * maxBackgroundOffset;
		midgroundVal = Math.random() * maxBackgroundOffset * 1.6283;
		midfrontgroundVal = Math.random() * maxBackgroundOffset * 5.5614;

		// Apply the random values to the tweens
		background.set(0, { duration: 10 });
		midground.set(midgroundVal, { duration: 10 });
		midfrontground.set(midfrontgroundVal, { duration: 10 });
		foreground.set(0, { duration: 10 });
	};

	const startAnimation = () => {
		// Start the animation loop
		animationFrameId = requestAnimationFrame(animate);
		playing = true;
		paused = false;
	};

	const resetAnimation = () => {
		playing = false;
		paused = false;
		crashing = false;
		multiplier = 1.0;
		clearIntervals();
		resetLayerPositions();
		console.log(`RESET BUTTON random start positions set:
			Background: ${backgroundVal},
			Midground: ${midgroundVal},
			Midfrontground: ${midfrontgroundVal},
			Foreground: ${foregroundVal}`);
	};

	const clearIntervals = () => {
		clearInterval(crashInterval);
		clearTimeout(crashTimeout);
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
		resetGameState();
	});

	onDestroy(() => {
		clearIntervals();
		resetGameState();
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

<div class="multiplier-display">
	{multiplier.toFixed(2)}x
</div>

<div class="multiplier-container">
	<button class="multiplier-button" on:click={increaseBet}>Add Bet</button>
	<p class="multiplier-count">{betMultiplier.toFixed(1)}x</p>
	<button class="multiplier-button" on:click={decreaseBet}>Decrease Bet</button>
	<p class="probability-count">{probabilityPercentage}</p>
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
		@apply mt-4 bg-green-600 text-white py-2 rounded-md transition-colors ml-0 text-sm px-6;
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
	.multiplier-display {
		@apply text-white text-4xl;
	}
	.multiplier-container {
		@apply flex items-center gap-6;
	}
	.multiplier-button {
		@apply my-4 bg-gray-700 text-white py-2 rounded-md transition-colors ml-0 text-sm px-6;
	}
	.multiplier-count {
		@apply text-xl text-white;
	}
	.probability-count {
		@apply text-base text-white;
	}
</style>
