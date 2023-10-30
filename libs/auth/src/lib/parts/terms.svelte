<script lang="ts">
	import { stateTermsConfirmed } from '../state';

	let _element: HTMLInputElement;
	const onCheck = () => stateTermsConfirmed.set(_element.checked);
</script>

<span class="section">
	<span class="terms">
		<input type="checkbox" name="terms" id="terms" bind:this={_element} on:click={onCheck} />
		I agree with the Privacy Policy, Terms of Use, Gambling isn't forbidden by my local authorities,
		I'm at least 18 years old, and the use of multiple accounts is prohibited.
	</span>
</span>

<style lang="postcss">
	.section {
		@apply pt-2 flex flex-col items-baseline;
	}
	input {
		@apply w-5 h-5 sm:w-8 sm:h-8 mr-2 relative top-1;
	}
	.terms {
		@apply text-white text-sm sm:text-base;
	}
</style>
