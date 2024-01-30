<script lang="ts">
	import { onMount } from 'svelte';
	type Keyframes = string;
	// let bounceDelay: string;
	const createKeyframes = (frames: Keyframes): string => {
		// Access the first stylesheet in the document
		const styleSheet = document.styleSheets[0] as CSSStyleSheet;
		// Generate a unique name for the animation
		const animationName = `animation${Math.round(Math.random() * 100)}`;
		// Create the full rule for the keyframes
		const keyframeRules = `@keyframes ${animationName} { ${frames} }`;
		// Insert the rule into the stylesheet
		styleSheet.insertRule(keyframeRules, styleSheet.cssRules.length);
		return animationName;
	};
	// onMount(() => {
	// 	const keyframes: Keyframes = `
	//     0%, 80%, 100% { transform: scale(0); }
	//     40% { transform: scale(1.0); }
	//   `;
	// 	bounceDelay = createKeyframes(keyframes);
	// });
</script>

<div class="spinner">
	<div class="bounce" />
	<div class="bounce" />
	<div class="bounce" />
</div>

<style lang="postcss">
	@keyframes bounceDelay {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}
	.spinner {
		/* position: relative; */
		width: 70px;
		text-align: center;
	}
	.bounce {
		width: 14px;
		height: 14px;
		background-color: #ffffff;
		border-radius: 100%;
		display: inline-block;
		animation: bounceDelay 1.2s infinite ease-in-out both;
	}
	.bounce:first-child {
		animation-delay: -0.32s;
	}
	.bounce:nth-child(2) {
		animation-delay: -0.16s;
	}
</style>
