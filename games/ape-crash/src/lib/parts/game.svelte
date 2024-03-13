<script lang="ts">
  import ApeCrash1 from "$lib/ape/ape-crash1.svg";
  import ApeCrash2 from "$lib/ape/ape-crash2.svg";
  import Ape from "$lib/ape/ape.svg";
  import Ray from "$lib/ape/ray.svg";

  import { onDestroy, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { derived, get, writable } from "svelte/store";

  import Layer1 from "$lib/ape/zone1-layer1.svg";
  import Layer2 from "$lib/ape/zone1-layer2.svg";
  import Layer3 from "$lib/ape/zone1-layer3.svg";
  import Layer4 from "$lib/ape/zone1-layer4.svg";

  import Layer5 from "$lib/ape/zone2-layer1.svg";
  import Layer6 from "$lib/ape/zone2-layer2.svg";
  import Layer7 from "$lib/ape/zone2-layer3.svg";
  import Layer8 from "$lib/ape/zone2-layer4.svg";

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
  const pauseDuration = 2000;
  const durationTime = 80000;
  const maxBackgroundOffset = 5155;
  const foregroundMultipliersByWidth = [
    { width: 1535, multiplier: 5.204 },
    { width: 1279, multiplier: 4.915 },
    { width: 1023, multiplier: 4.659 },
    { width: 767, multiplier: 4.542 },
    { width: 640, multiplier: 4.516 }
  ];

  // Remove redundant stages of "last" state variables
  let background = tweened(0, { duration: durationTime });
  let midground = tweened(0, { duration: durationTime });
  let midfrontground = tweened(0, { duration: durationTime });
  let foreground = tweened(0, { duration: durationTime });

  let multiplier = 1.0;
  let betMultiplier = 1.1;
  let animationFrameId: number | undefined;

  $: probabilityPercentage =
    calculateProbability(betMultiplier).toFixed(2) + "%";

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

  const calculateDynamicForegroundMultiplier = (
    screenWidth: number
  ): number => {
    const baseSize = 567;
    const baseMultiplier = 4.478;
    const reductionPer10px = 0.00835;
    const sizeDifference = baseSize - screenWidth;
    const multiplierAdjustment =
      Math.floor(sizeDifference / 10) * reductionPer10px;
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

  // Omitted shouldCrash function due to lack of usage in script
  const setAnimation = (value: number) => {
    background.set(value);
    midground.set(value * 1.6283);
    midfrontground.set(value * 3.5614);
    const foregroundMultiplier = calculateForegroundMultiplier();
    foreground.set(value * foregroundMultiplier);
  };

  const animate = () => {
    if (playing && !crashing) {
      setAnimation(paused ? 0 : -maxBackgroundOffset); // Simplify background width value
      animationFrameId = requestAnimationFrame(animate);
      multiplier += 0.01;
    }
  };

  // Combine the resetLayerPositions into resetGameState
  const resetGameState = () => {
    cancelAnimation(); // Extracted cancelAnimationFrame to its own function

    multiplier = 1.0;
    crashing = false;
    paused = true;

    background.set(
      typeof lastBackgroundVal !== "undefined" ? lastBackgroundVal : 0,
      {
        duration: 10
      }
    );
    midground.set(
      typeof lastMidgroundVal !== "undefined" ? lastMidgroundVal : 0,
      { duration: 10 }
    );
    midfrontground.set(
      typeof lastMidfrontgroundVal !== "undefined" ? lastMidfrontgroundVal : 0,
      {
        duration: 10
      }
    );
    foreground.set(
      typeof lastForegroundVal !== "undefined" ? lastForegroundVal : 0,
      {
        duration: 10
      }
    );
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

  const startAnimation = () => {
    const maxOffset = maxBackgroundOffset;
    const randomStartPos = Math.floor(Math.random() * maxOffset);

    // resetGameState();

    setAnimation(-randomStartPos);
    animationFrameId = requestAnimationFrame(animate);

    const startButton = document.getElementById(
      "startAnimationButton"
    ) as HTMLButtonElement;
    if (startButton) {
      startButton.disabled = true;
    }

    playing = true;
    paused = false;
  };

  const resetAnimation = () => {
    playing = false;
    paused = true;
    crashing = false;
    multiplier = 1.0;

    const startButton = document.getElementById(
      "startAnimationButton"
    ) as HTMLButtonElement;
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

    const startButton = document.getElementById(
      "startAnimationButton"
    ) as HTMLButtonElement;
    if (startButton) {
      startButton.disabled = false;
    }
  };

  const toggleApeCrashImage = () => {
    showFirstApeCrash = !showFirstApeCrash;
    setTimeout(toggleApeCrashImage, 3000); // Recursion instead of setInterval
  };

  let currentZone = writable(1); // Current zone state

  let zone2BackgroundPosition = tweened(1024, { duration: durationTime });

  // Example function to transition to Zone 2
  function transitionToZone2() {
    currentZone.set(2);
    zone2BackgroundPosition.set(-maxBackgroundOffset);
  }

  $: {
    if ($background <= -maxBackgroundOffset && $currentZone === 1) {
      transitionToZone2();
    }
  }

  let backgroundWidth: any;

  function measureBackground() {
    const img = new Image();
    img.onload = function () {
      //@ts-ignore
      backgroundWidth = this.naturalWidth;
      console.log("Background width: ", backgroundWidth);
    };
    img.src = "ape-crash/src/lib/ape/zone1-layer4.svg"; // Adjust the path accordingly
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
    <!-- ZONE 1 -->
    <div
      class="layer background-layer z-[-2]"
      style:transform="translateX({$background}px)"
    >
      <img
        src={Layer1}
        alt="Zone 1 Background"
        class=""
        id="zone1-background"
      />

      <div class="background-container">
        <img
          src={Layer5}
          alt="Zone 2 Background"
          class=""
          style:transform="translateX({5155}px)"
          id="zone2-background"
        />
      </div>
    </div>

    <div
      class="layer midground-layer"
      style:transform="translateX({$midground}px)"
    >
      <div class="background-container">
        <img src={Layer2} alt="Layer 2" />
        <div class="">
          <img
            src={Layer6}
            alt="Zone 2 Midground"
            class=""
            style:transform="translateX({7590}px)"
          />
        </div>
      </div>
    </div>

    <div
      class="layer midfrontground-layer"
      style:transform="translateX({$midfrontground}px)"
    >
      <div class="background-container">
        <img src={Layer3} alt="Layer 3" />
        <div class="">
          <img
            src={Layer7}
            alt="Zone 2 Midfrontground"
            class=""
            style:transform="translateX({15290}px)"
            id="zone1-background"
          />
        </div>
      </div>
    </div>

    <div
      class="layer foreground-layer"
      style:transform="translateX({$foreground}px)"
    >
      <div class="background-container">
        <img src={Layer4} alt="Layer 4" />
        <div class="">
          <img
            src={Layer8}
            alt="Zone 2 Foreground"
            class=""
            style:transform="translateX({21690}px)"
            id="zone1-background"
          />
        </div>
      </div>
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
  <button
    id="startAnimationButton"
    class="play-button"
    on:click={startAnimation}
  >
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

  .background {
    flex-shrink: 0;
    width: auto;
    height: 100vh;
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
