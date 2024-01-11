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

	let multiplier = 1.0;
	let betMultiplier = 1.1;
	let animationFrameId: number | undefined;

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

	// Function to calculate the crash probability based on the multiplier
	function calculateProbability(multiplier: number): number {
		// Define a base multiplier and the corresponding probability of not crashing
		const baseMultiplier = 1.0;
		const baseProbability = 1.0; // 100% chance of not crashing at 1.0x

		// Calculate the decrease in the probability of not crashing per step
		const decreasePerStep = 0.0001;

		// Calculate the number of steps above the base multiplier
		const stepsAboveBase = (multiplier - baseMultiplier) / 0.01;

		// Calculate the current probability of not crashing
		let currentProbability = baseProbability - stepsAboveBase * decreasePerStep;

		// Ensure the probability doesn't fall below zero
		currentProbability = Math.max(currentProbability, 0);
		console.log(currentProbability);

		return currentProbability;
	}

	// Function to calculate the probability percentage
	// function calculateProbability(multiplier: number): number {
	// 	// Base values at 1.01x
	// 	const baseMultiplier = 1.01;
	// 	const baseProbability = 98.02; // 98.02% at 1.01x

	// 	// Calculate the decrease rate per 0.01 increase in multiplier
	// 	const decreasePerStep = 0.96; // Adjust this rate to match your actual data

	// 	// Calculate how many steps above the base multiplier
	// 	const steps = (multiplier - baseMultiplier) / 0.01;

	// 	// Calculate and return the current probability
	// 	return baseProbability - steps * decreasePerStep;
	// }

	$: probabilityPercentage = calculateProbability(betMultiplier).toFixed(2) + '%';

	// Function to decide if the game should crash at the current multiplier
	function shouldCrash(): boolean {
		const notCrashingProbability = calculateProbability(multiplier);
		const randomChance = Math.random();
		return randomChance > notCrashingProbability; // Crash if the random chance exceeds the probability of not crashing
	}

	const startAnimation = () => {
		resetGameState(); // Reset the game state before starting

		function animate() {
			if (playing && !crashing) {
				// Increase the multiplier
				multiplier += 0.01;

				// Check if the game should crash
				if (shouldCrash()) {
					crashing = true;
					handleCrash();
				} else {
					const backgroundWidthValue = 5155 - gameContainerWidth;
					setAnimation(paused ? backgroundLastVal : -backgroundWidthValue);
					animationFrameId = requestAnimationFrame(animate);
				}
			}
		}

		// Start the animation loop
		animationFrameId = requestAnimationFrame(animate);
		playing = true;
		paused = false;
	};

	const resume = () => {
		startAnimation();
	};

	// Handle the game crash
	const handleCrash = () => {
		if (playing) {
			crashing = true;

			// Immediately stop the animations and freeze the layers in their current positions
			background.set($background, { duration: 0 });
			midground.set($midground, { duration: 0 });
			midfrontground.set($midfrontground, { duration: 0 });
			foreground.set($foreground, { duration: 0 });

			crashTimeout = setTimeout(() => {
				toggleApeCrashImage();
				crashing = false;
				resetAnimation();
			}, pauseDuration);
		}
	};

	function resetGameState() {
		// Stop any existing animation frame
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		multiplier = 1.0;
		crashing = false;
		paused = false;
	}

	const resetAnimation = () => {
		playing = false;
		paused = false;
		crashing = false;
		multiplier = 1.0;
		clearInterval(crashInterval);
		clearTimeout(crashTimeout);

		background.set(0, { duration: 100 });
		midground.set(0, { duration: 100 });
		midfrontground.set(0, { duration: 100 });
		foreground.set(0, { duration: 100 });
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

	function increaseBet() {
		betMultiplier += 0.1;
	}

	function decreaseBet() {
		if (betMultiplier > 1.1) {
			betMultiplier -= 0.1;
		}
	}

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
