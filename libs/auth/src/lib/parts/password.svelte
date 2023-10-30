<script lang="ts">
	import { statePassword, statePasswordSet } from '../state';
	import { FormMode } from '../types';

	export let required = true;
	export let incorrect = false;
	export let mode: FormMode = FormMode.Login;

	let element: HTMLInputElement;
	let valid = false;
	let revealed = false;

	const onChange = () => {
		valid = element.value.length > 0 && element.checkValidity();
		incorrect = false;
		statePassword.set(valid ? element.value : '');
		statePasswordSet.set(valid);
	};

	const onBlur = (event: Event) => {
		if (!incorrect) {
			valid = element.value.length > 0 && element.checkValidity();
			statePassword.set(valid ? element.value : '');
			statePasswordSet.set(valid);
		}
	};

	const onRevealToggle = (event: Event) => {
		revealed = !revealed;
		element.type = revealed ? 'text' : 'password';
	};
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<svg
				class="icon-svg"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 16 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
				/>
			</svg>
		</div>
		<input
			type="password"
			name="password"
			id="password"
			placeholder={mode === FormMode.Register ? `choose password` : `password`}
			minlength="8"
			{required}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
		/>
		<a class="trailing-icon" href={'#'} on:click={onRevealToggle} tabindex="-1">
			<svg
				class="icon-svg"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 14"
			>
				<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
					<path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
				</g>
			</svg>
		</a>
	</div>
	{#if incorrect}
		<svg
			class="incorrect"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path
				d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
			/>
		</svg>
	{:else if valid}
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
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-auto;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3 pl-2;
	}
	.incorrect {
		@apply w-8 h-8 text-red-400 pt-3 pl-2;
	}
	.icon-svg {
		@apply w-6 h-6 text-white;
	}
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-12;
	}
</style>
