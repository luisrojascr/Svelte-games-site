<script lang="ts">
	// Lightweight carousel https://www.npmjs.com/package/siema
	import Siema from 'siema';
	import { createEventDispatcher, onMount } from 'svelte';

	export let perPage = 4;
	export let loop = true;
	export let autoplay = 0;
	export let duration = 200;
	export let easing = 'ease-out';
	export let startIndex = 0;
	export let draggable = true;
	export let multipleDrag = true;
	export let controls = true;
	export let threshold = 20;
	export let rtl = false;

	let currentIndex = startIndex;
	let siema: Element;
	let controller: any;
	let timer: ReturnType<typeof setInterval> | null = null;
	const dispatch = createEventDispatcher();

	onMount(() => {
		controller = new (Siema as any)({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
			duration,
			easing,
			startIndex,
			draggable,
			multipleDrag,
			threshold,
			rtl,
			onChange: handleChange
		});

		setAutoplay();
		return () => {
			clearAutoplay();
			controller.destroy();
		};
	});

	function clearAutoplay() {
		if (timer) clearInterval(timer);
		timer = null;
	}

	function setAutoplay() {
		clearAutoplay();
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	export function left() {
		controller.prev();
	}

	export function right() {
		controller.next();
	}

	export function go(index: number) {
		controller.goTo(index);
	}

	export function pause() {
		if (timer !== null) {
			clearInterval(timer);
			// After clearing, set timer to null to avoid trying to clear the same interval again
			timer = null;
		}
	}

	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	function handleChange(event: Event) {
		currentIndex = controller.currentSlide;
		dispatch('change', {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		});
	}

	function handleAutoplayReset() {
		clearAutoplay();
		setAutoplay();
	}

	function resetInterval(node: HTMLElement, condition: boolean) {
		if (condition) {
			node.addEventListener('click', handleAutoplayReset);
		}

		return {
			destroy() {
				node.removeEventListener('click', handleAutoplayReset);
			}
		};
	}
</script>

<div class="carousel">
	<div class="slides" bind:this={siema}>
		<slot />
	</div>
	{#if controls}
		<button class="left" on:click={left} use:resetInterval={!!autoplay} aria-label="left">
			<slot name="left-control" />
		</button>
		<button class="right" on:click={right} use:resetInterval={!!autoplay} aria-label="right">
			<slot name="right-control" />
		</button>
	{/if}
</div>

<style lang="postcss">
	.carousel {
		@apply relative w-full justify-center items-center;
	}

	button {
		@apply absolute w-10 h-10 top-1/2 z-50 -mt-5 border-0 bg-transparent;
	}
	button:focus {
		@apply outline-none;
	}
	.left {
		@apply left-[2vw];
	}

	.right {
		@apply right-[2vw];
	}
</style>
