<script lang="ts">
	import { statePassword, statePasswordSet } from '../state';

	let _element: HTMLInputElement;
	let _confirmed = false;
	let _incorrect = false;
	let _revealed = false;

	const onChange = () => {
		_confirmed = _element.checkValidity();
		_incorrect = false;
		statePassword.set(_confirmed ? _element.value : '');
		statePasswordSet.set(_confirmed);
	};

	const onBlur = (event: Event) => {
		if (!_incorrect) {
			_confirmed = _element.checkValidity();
			statePassword.set(_confirmed ? _element.value : '');
			statePasswordSet.set(_confirmed);
		}
	};

	const onRevealToggle = (event: Event) => {
		_revealed = !_revealed;
		_element.type = _revealed ? 'text' : 'password';
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
			placeholder={`password`}
			minlength="8"
			required
			bind:this={_element}
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
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-auto;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3;
	}
	.icon-svg {
		@apply w-6 h-6 text-white;
	}
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-12;
	}
</style>
