<script lang="ts">
	import { stateTotp, stateTotpSet } from '../state';

	let _element: HTMLInputElement;
	let _confirmed = false;
	let _incorrect = false;

	const onChange = () => {
		_confirmed = _element.checkValidity();
		_incorrect = false;
		stateTotp.set(_confirmed ? _element.value : '');
		stateTotpSet.set(_confirmed);
	};

	const onBlur = (event: Event) => {
		if (!_incorrect) {
			_confirmed = _element.checkValidity();
			stateTotp.set(_confirmed ? _element.value : '');
			stateTotpSet.set(_confirmed);
		}
	};
</script>

<span class="section">
	<div class="relative w-full">
		<input
			type="text"
			name="totp"
			id="totp"
			placeholder={`TOTP code`}
			minlength="6"
			maxlength="6"
			required
			bind:this={_element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
		/>
	</div>
	{#if _confirmed}
		<svg
			class="check"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 16 12"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 5.917 5.724 10.5 15 1.5"
			/>
		</svg>
	{/if}
</span>

<style lang="postcss">
	.section {
		@apply pt-6 flex;
	}
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-12;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3;
	}
</style>
