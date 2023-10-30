<script lang="ts">
	import { stateUsername, stateUsernameConfirmed } from '../state';

	let element: HTMLInputElement;
	let confirmed = false;
	const _pattern = /[a-zA-Z0-9]{6,10}/;

	const onChange = () => {
		const valid = element.checkValidity() && _pattern.test(element.value);
		console.log(`username onChange ${valid}`);
		// confirmed = valid;
		if (confirmed) stateUsername.set(element.value);
		else stateUsername.set('');
	};

	const onBlur = (event: Event) => {
		const valid = element.value.length > 0 && element.checkValidity();
	};

	stateUsername.subscribe((value) => {
		if (value && element) {
			element.value = value;
		}
	});

	stateUsernameConfirmed.subscribe((value) => {
		confirmed = value;
	});
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<svg
				class="leading-icon-svg"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 14 18"
			>
				<path
					d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
				/>
			</svg>
		</div>
		<input
			type="username"
			name="username"
			id="username"
			minlength="6"
			maxlength="10"
			required
			autocomplete="off"
			placeholder={`choose username`}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			disabled={confirmed}
		/>
	</div>
	{#if confirmed}
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
	.leading-icon-svg {
		@apply w-4 h-4 text-white;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3 pl-2;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
