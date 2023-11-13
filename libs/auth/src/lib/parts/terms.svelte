<script lang="ts">
	import { t } from '$lib/locale/i18n';
	import { stateTermsConfirmed } from '../state';

	let _element: HTMLInputElement;
	const onCheck = () => stateTermsConfirmed.set(_element.checked);
</script>

<span class="section">
	<span class="terms">
		<!-- <input type="checkbox" name="terms" id="terms" bind:this={_element} on:click={onCheck} /> -->
		{$t('terms')}
	</span>
</span>

<style lang="postcss">
	.section {
		@apply py-4 flex flex-col items-baseline;
	}
	/* input {
		@apply w-5 h-5 sm:w-8 sm:h-8 mr-2 relative top-1;
	} */
	.terms {
		@apply text-white text-sm sm:text-base border-t-[1px] border-b-[1px] border-blue-500 py-2;
	}
</style>
