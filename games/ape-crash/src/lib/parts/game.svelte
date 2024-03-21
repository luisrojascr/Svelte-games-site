<script lang="ts">
	import ApeCrash1 from '$lib/ape/ape-crash1.svg';
	import ApeCrash2 from '$lib/ape/ape-crash2.svg';
	import Ape from '$lib/ape/ape.svg';
	import Ray from '$lib/ape/ray.svg';

	import { onDestroy, onMount } from 'svelte';
	import { backIn, backOut, circIn, cubicIn, expoIn } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import { derived, get, writable } from 'svelte/store';

	import Layer1 from '$lib/ape/zone1-layer1.svg';
	import Layer2 from '$lib/ape/zone1-layer2.svg';
	import Layer3 from '$lib/ape/zone1-layer3.svg';
	import Layer4 from '$lib/ape/zone1-layer4.svg';

	import Layer5 from '$lib/ape/zone2-layer1.svg';
	import Layer6 from '$lib/ape/zone2-layer2.svg';
	import Layer7 from '$lib/ape/zone2-layer3.svg';
	import Layer8 from '$lib/ape/zone2-layer4.svg';

	import Layer9 from '$lib/ape/zone3-layer1.svg';
	import Layer10 from '$lib/ape/zone3-layer2.svg';
	import Layer11 from '$lib/ape/zone3-layer3.svg';
	import Layer12 from '$lib/ape/zone3-layer4.svg';

	import Layer13 from '$lib/ape/zone4-layer1.svg';
	import Layer14 from '$lib/ape/zone4-layer2.svg';
	// import Layer15 from "$lib/ape/zone4-layer3.svg";
	import Layer16 from '$lib/ape/zone4-layer4.svg';

	import Layer17 from '$lib/ape/zone5-layer1.svg';
	import Layer18 from '$lib/ape/zone5-layer2.svg';
	import Layer19 from '$lib/ape/zone5-layer3.svg';
	import Layer20 from '$lib/ape/zone5-layer4.svg';

	let playing = false;
	let crashing = false;
	let paused = true; // Default to true
	let showFirstApeCrash = true;
	let gameContainer: HTMLElement | undefined;
	let gameContainerWidth: number;

	let lastBackgroundVal = 0;
	let lastMidgroundVal = 0;
	let lastMidfrontgroundVal = 0;
	let lastForegroundVal = 0;

	// Define constants for repeated values and default states
	let durationTime = writable(2000); // Start at 2000
	const minDuration = 1000; // Minimum duration of 1000
	let durationDecrementInterval: any;

	const startDurationDecrement = () => {
		if (durationDecrementInterval) clearInterval(durationDecrementInterval);

		durationDecrementInterval = setInterval(() => {
			durationTime.update((n) => {
				let newDuration = n - 10;
				if (newDuration <= minDuration) {
					clearInterval(durationDecrementInterval);
					newDuration = minDuration;
				}
				return newDuration;
			});
		}, 1000);
	};

	const pauseDuration = 2000;
	const maxBackgroundOffset = -50000;
	const foregroundMultipliersByWidth = [
		{ width: 1535, multiplier: 5.204 },
		{ width: 1279, multiplier: 4.915 },
		{ width: 1023, multiplier: 4.659 },
		{ width: 767, multiplier: 4.542 },
		{ width: 640, multiplier: 4.516 }
	];

	let background = tweened(0, { duration: $durationTime, easing: circIn });
	let midground = tweened(0, { duration: $durationTime, easing: circIn });
	let midfrontground = tweened(0, { duration: $durationTime, easing: circIn });
	let foreground = tweened(0, { duration: $durationTime, easing: circIn });

	// Reactively update the animations when durationTime changes
	$: {
		background = tweened($background, { duration: $durationTime, easing: circIn });
		midground = tweened($midground, { duration: $durationTime, easing: circIn });
		midfrontground = tweened($midfrontground, { duration: $durationTime, easing: circIn });
		foreground = tweened($foreground, { duration: $durationTime, easing: circIn });
	}

	let multiplier = 1.0;
	let betMultiplier = 1.1;
	let animationFrameId: number | undefined;
	let animationProgress = multiplier;

	$: probabilityPercentage = calculateProbability(betMultiplier).toFixed(2) + '%';

	// Calculate foreground multiplier in a more efficient way
	const calculateForegroundMultiplier = (): number => {
		const screenWidth = window.innerWidth;
		for (const { width, multiplier } of foregroundMultipliersByWidth) {
			if (screenWidth <= width) return multiplier;
		}
		// Handle edge case for small screen widths dynamically
		if (screenWidth <= 567) {
			return calculateDynamicForegroundMultiplier(screenWidth);
		}
		return 5.5348; // Default
	};

	const calculateDynamicForegroundMultiplier = (screenWidth: number): number => {
		const baseSize = 567;
		const baseMultiplier = 4.478;
		const reductionPer10px = 0.00835;
		const sizeDifference = baseSize - screenWidth;
		const multiplierAdjustment = Math.floor(sizeDifference / 10) * reductionPer10px;
		return baseMultiplier - multiplierAdjustment;
	};

	// Refactor probability calculation to use parameters instead of accessing outer scope directly
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
		midground.set(value * 1.6283);
		midfrontground.set(value * 3.5614);
		const foregroundMultiplier = calculateForegroundMultiplier();
		foreground.set(value * foregroundMultiplier);
	};

	const startAnimation = () => {
		const maxOffset = maxBackgroundOffset;
		const randomStartPos = Math.floor(Math.random() * maxOffset);

		startDurationDecrement();
		// resetGameState();

		setAnimation(-randomStartPos);
		animationFrameId = requestAnimationFrame(animate);

		const startButton = document.getElementById('startAnimationButton') as HTMLButtonElement;
		if (startButton) {
			startButton.disabled = true;
		}

		playing = true;
		paused = false;
	};

	const animate = () => {
		if (playing && !crashing) {
			setAnimation(paused ? 0 : maxBackgroundOffset); // Simplify background width value
			animationFrameId = requestAnimationFrame(animate);
			multiplier += 0.01;
			animationProgress = multiplier;
		}
	};

	// Combine the resetLayerPositions into resetGameState
	const resetGameState = () => {
		cancelAnimation(); // Extracted cancelAnimationFrame to its own function

		multiplier = 1.0;
		crashing = false;
		paused = true;

		background.set(typeof lastBackgroundVal !== 'undefined' ? lastBackgroundVal : 0, {
			duration: 10
		});
		midground.set(typeof lastMidgroundVal !== 'undefined' ? lastMidgroundVal : 0, { duration: 10 });
		midfrontground.set(typeof lastMidfrontgroundVal !== 'undefined' ? lastMidfrontgroundVal : 0, {
			duration: 10
		});
		foreground.set(typeof lastForegroundVal !== 'undefined' ? lastForegroundVal : 0, {
			duration: 10
		});
	};

	const cancelAnimation = () => {
		background.set(get(background));
		midground.set(get(midground));
		midfrontground.set(get(midfrontground));
		foreground.set(get(foreground));

		if (animationFrameId !== undefined) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = undefined;
		}
	};

	const resetAnimation = () => {
		playing = false;
		paused = true;
		crashing = false;
		multiplier = 1.0;

		const startButton = document.getElementById('startAnimationButton') as HTMLButtonElement;
		if (startButton) {
			startButton.disabled = false;
		}
	};

	const handleReset = () => {
		playing = false;
		paused = true;
		crashing = false;
		multiplier = 1.0;

		background.set(0, { duration: 10 });
		midground.set(0, { duration: 10 });
		midfrontground.set(0, { duration: 10 });
		foreground.set(0, { duration: 10 });
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
			playing = false;
			crashing = true;
			cancelAnimation();

			lastBackgroundVal = $background;
			lastMidgroundVal = $midground;
			lastMidfrontgroundVal = $midfrontground;
			lastForegroundVal = $foreground;

			setTimeout(() => {
				toggleApeCrashImage();
				crashing = false;
				resetAnimation();
			}, pauseDuration);
		}

		const startButton = document.getElementById('startAnimationButton') as HTMLButtonElement;
		if (startButton) {
			startButton.disabled = false;
		}
	};

	const toggleApeCrashImage = () => {
		showFirstApeCrash = !showFirstApeCrash;
		setTimeout(toggleApeCrashImage, 3000); // Recursion instead of setInterval
	};

	// A function to stop the animation
	function stopAnimation() {
		playing = false;
		if (animationFrameId !== undefined) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = undefined;
		}
	}

	let zone2Opacity = 0;
	let zone3Opacity = 0;
	let zone4Opacity = 0;
	let zone5Opacity = 0;

	$: if (animationProgress > 26 && animationProgress <= 29) {
		// Start increasing opacity when progress is between
		zone2Opacity = ((animationProgress - 15) / 10) * 1;
	} else if (animationProgress > 26) {
		zone2Opacity = 1;
	} else {
		zone2Opacity = 0;
	}

	$: if (animationProgress > 43.5 && animationProgress <= 38.5) {
		// Start increasing opacity when progress is between
		zone3Opacity = ((animationProgress - 15) / 10) * 1;
	} else if (animationProgress > 43.5) {
		zone3Opacity = 1;
	} else {
		zone3Opacity = 0;
	}

	$: if (animationProgress > 56 && animationProgress <= 58) {
		// Start increasing opacity when progress is between
		zone4Opacity = ((animationProgress - 15) / 10) * 1;
	} else if (animationProgress > 56) {
		zone4Opacity = 1;
	} else {
		zone4Opacity = 0;
	}

	$: if (animationProgress > 68 && animationProgress <= 70) {
		// Start increasing opacity when progress is between
		zone5Opacity = ((animationProgress - 15) / 10) * 1;
	} else if (animationProgress > 68) {
		zone5Opacity = 1;
	} else {
		zone5Opacity = 0;
	}

	$: if (animationProgress >= 75) {
		stopAnimation();
	}

	let backgroundWidth: any;

	function measureBackground() {
		const img = new Image();
		img.onload = function () {
			//@ts-ignore
			backgroundWidth = this.naturalWidth;
			console.log('Background width: ', backgroundWidth);
		};
		img.src = 'ape-crash/src/lib/ape/zone1-layer4.svg'; // Adjust the path accordingly
	}

	onMount(() => {
		measureBackground();
		gameContainerWidth = gameContainer?.clientWidth || 0;
	});

	onDestroy(() => {
		resetGameState;
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

	<div>
		<div class="background-container">
			<div class="layer background-layer z-[-2]">
				{#if animationProgress < 31}
					<img
						src={Layer1}
						alt="Zone 1 Background"
						class=""
						style:transform="translateX({$background}px)"
						id="zone1-background"
					/>
				{/if}

				{#if animationProgress < 46 && animationProgress > 18}
					<div class="zone-background" style="opacity: {zone2Opacity}">
						<img
							src={Layer5}
							alt="Zone 2 Background"
							class=""
							id="zone2-background"
							style:transform="translateX({$background + 4555}px)"
						/>
					</div>
				{/if}

				{#if animationProgress < 60 && animationProgress > 37}
					<div class="zone-background" style="opacity: {zone3Opacity}">
						<img
							src={Layer9}
							alt="Zone 3 Background"
							class=""
							id="zone3-background"
							style:transform="translateX({$background + 9355}px)"
						/>
					</div>
				{/if}

				{#if animationProgress < 71 && animationProgress > 48}
					<div class="zone-background" style="opacity: {zone4Opacity}">
						<img
							src={Layer13}
							alt="Zone 4 Background"
							class=""
							id="zone4-background"
							style:transform="translateX({$background + 13555}px)"
						/>
					</div>
				{/if}
				{#if animationProgress < 100 && animationProgress > 58}
					<div class="zone-background" style="opacity: {zone5Opacity}">
						<img
							src={Layer17}
							alt="Zone 5 Background"
							class=""
							id="zone5-background"
							style:transform="translateX({$background + 18555}px)"
						/>
					</div>
				{/if}
			</div>
		</div>

		<div class="layer midground-layer" style:transform="translateX({$midground}px)">
			{#if animationProgress < 31}
				<img src={Layer2} alt="Zone 1 Midground" />
			{/if}

			{#if animationProgress < 46 && animationProgress > 18}
				<div class="">
					<img
						src={Layer6}
						alt="Zone 2 Midground"
						class=""
						style:transform="translateX({8190}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 60 && animationProgress > 37.5}
				<div class="">
					<img
						src={Layer10}
						alt="Zone 3 Midground"
						class=""
						style:transform="translateX({14790}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 71 && animationProgress > 48.5}
				<div class="">
					<img
						src={Layer14}
						alt="Zone 4 Midground"
						class=""
						style:transform="translateX({23990}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 100 && animationProgress > 58.5}
				<div class="">
					<img
						src={Layer18}
						alt="Zone 5 Midground"
						class=""
						style:transform="translateX({29990}px)"
					/>
				</div>
			{/if}
		</div>

		<div class="layer midfrontground-layer" style:transform="translateX({$midfrontground}px)">
			{#if animationProgress < 31}
				<img src={Layer3} alt="Layer 3" />
			{/if}

			{#if animationProgress < 46 && animationProgress > 18}
				<div class="">
					<img
						src={Layer7}
						alt="Zone 2 Midfrontground"
						class=""
						style:transform="translateX({15290}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 60 && animationProgress > 38}
				<div class="">
					<img
						src={Layer11}
						alt="Zone 3 Midfrontground"
						class=""
						style:transform="translateX({30090}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 71 && animationProgress > 49}
				<div class="">
					<img
						src={Layer11}
						alt="Zone 4 Midfrontground"
						class=""
						style:transform="translateX({45390}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 100 && animationProgress > 59}
				<div class="">
					<img
						src={Layer19}
						alt="Zone 5 Midfrontground"
						class=""
						style:transform="translateX({60190}px)"
					/>
				</div>
			{/if}
		</div>

		<div class="layer foreground-layer" style:transform="translateX({$foreground}px)">
			{#if animationProgress < 31}
				<img src={Layer4} alt="Layer 4" />
			{/if}

			{#if animationProgress < 46 && animationProgress > 18}
				<div class="">
					<img
						src={Layer8}
						alt="Zone 2 Foreground"
						class=""
						style:transform="translateX({23690}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 60 && animationProgress > 38.5}
				<div class="">
					<img
						src={Layer12}
						alt="Zone 3 Foreground"
						class=""
						style:transform="translateX({47690}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 71 && animationProgress > 49.5}
				<div class="">
					<img
						src={Layer16}
						alt="Zone 4 Foreground"
						class=""
						style:transform="translateX({72690}px)"
					/>
				</div>
			{/if}

			{#if animationProgress < 100 && animationProgress > 59.5}
				<div class="">
					<img
						src={Layer20}
						alt="Zone 5 Foreground"
						class=""
						style:transform="translateX({95690}px)"
					/>
				</div>
			{/if}
		</div>
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
	<button id="startAnimationButton" class="play-button" on:click={startAnimation}>
		Start Animation
	</button>
	<button class="rain-button" on:click={handleCrash}>Make it crash</button>
	<button class="reset-button" on:click={handleReset}>Reset</button>
</div>

<style lang="postcss">
	.game-container {
		@apply relative overflow-hidden w-full h-[420px];
	}

	.background-container {
		display: flex;
		min-width: 100%;
		transition: transform 2s;
		/* position: absolute; */
	}

	.zone-background {
		transition: opacity 10s ease;
		opacity: 0;
	}

	.visible {
		opacity: 1;
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
		@apply absolute w-full h-full top-0 bottom-0 left-0 will-change-transform;
	}
	.foreground-layer {
		@apply z-20;
	}

	/* .background-layer-2 {
    display: absolute;
  } */

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
