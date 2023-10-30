<script lang="ts">
	import { AsyncUsernameCheck } from '$lib/api/api';
	import { stateUsername, stateUsernameConfirmed } from '../state';

	const MINLEN = 6;
	const MAXLEN = 16;
	const PATTERN = /[a-zA-Z0-9]{MINLEN,MAXLEN}/;

	let element: HTMLInputElement;
	let confirmed = false;
	let incorrect = false;
	let value = '';

	const onChange = () => {
		const valid = element.checkValidity() && PATTERN.test(element.value);
		incorrect = false;
	};

	const onBlur = (event: Event) => {
		const valid = element.checkValidity() && PATTERN.test(element.value);
		(async () => usernameCheck(element.value))().catch((error) => {
			const errorStr = `${error}`.toLowerCase();
			console.log(errorStr);
		});
	};

	stateUsername.subscribe((value) => {
		if (value) {
			value = value;
			if (element) element.value = value;
		}
	});

	stateUsernameConfirmed.subscribe((value) => {
		confirmed = value;
	});

	const usernameCheck = async (username: string): Promise<boolean> => {
		const vars = { variables: { username } };
		console.log(`posting ${JSON.stringify(vars)}`);
		const result = await AsyncUsernameCheck(vars);
		console.log(`Username result: ${JSON.stringify(result, null, 2)}`);
		if (result.data?.usernameCheck) {
			const check = result.data.usernameCheck;
			if (check.available === true) {
				confirmed = true;
				stateUsername.set(username);
				return true;
			} else if (check.available === false) {
				incorrect = true;
			}
		}
		return false;
	};
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
			minlength={MINLEN}
			maxlength={MAXLEN}
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
	{:else if confirmed}
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
	.incorrect {
		@apply w-8 h-8 text-red-400 pt-3 pl-2;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
