<script lang="ts">
	import ApeCrash1 from '$lib/ape/ape-crash1.svg';
	import ApeCrash2 from '$lib/ape/ape-crash2.svg';
	import Ape from '$lib/ape/ape.svg';
	import Ray from '$lib/ape/ray.svg';
	import Layer1 from '$lib/ape/zone1-layer1.svg';
	import Layer2 from '$lib/ape/zone1-layer2.svg';
	import Layer3 from '$lib/ape/zone1-layer3.svg';
	import Layer4 from '$lib/ape/zone1-layer4.svg';
	import { onDestroy } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	let playing = false;
	let crashing = false;
	let paused = false;
	let showFirstApeCrash = true;
	let crashInterval: NodeJS.Timeout | undefined;
	let crashTimeout: NodeJS.Timeout | undefined;
	const pauseDuration = 2000;
	const durationTime = 120000;

	let backgroundLastVal = 0;
	let midgroundLastVal = 0;
	let midfrontgroundLastVal = 0;
	let foregroundLastVal = 0;

	let background = tweened(backgroundLastVal, { duration: durationTime, easing: cubicOut });
	let midground = tweened(midgroundLastVal, { duration: durationTime, easing: cubicOut });
	let midfrontground = tweened(midfrontgroundLastVal, { duration: durationTime, easing: cubicOut });
	let foreground = tweened(foregroundLastVal, { duration: durationTime, easing: cubicOut });

	const setAnimation = (value: number) => {
		background.set(value);
		midground.set(value * 1.6283);
		midfrontground.set(value * 3.5614); // 14370
		foreground.set(value * 5.0211); // 20260
	};

	const startAnimation = () => {
		setAnimation(paused ? backgroundLastVal : -4024);
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

	const handleRain = () => {
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

	onDestroy(() => {
		clearInterval(crashInterval);
		clearTimeout(crashTimeout);
	});
</script>

<div class="game-container">
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
	<button class="rain-button" on:click={handleRain}>Make it rain</button>
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
