<script lang="ts">
	// import { UsernameCheck } from '$lib/api/api';
	import CheckIcon from '$lib/icons/check.svelte';
	import IncorrectIcon from '$lib/icons/incorrect.svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import { t } from '$lib/locale/i18n';

	const MINLEN = 6;
	const MAXLEN = 16;
	const PATTERN = /[a-zA-Z0-9]{MINLEN,MAXLEN}/;

	let element: HTMLInputElement;
	let confirmed = false;
	let incorrect = false;
	let userName = '';

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

	const usernameCheck = async (username: string): Promise<boolean> => {
		const vars = { variables: { username } };
		console.log(`posting ${JSON.stringify(vars)}`);
		// const result = await UsernameCheck(vars);
		// console.log(`Username result: ${JSON.stringify(result, null, 2)}`);
		// if (result.data?.usernameCheck) {
		// 	const check = result.data.usernameCheck;
		// 	if (check.available === true) {
		// 		confirmed = true;
		// 		userName = username;
		// 		return true;
		// 	} else if (check.available === false) {
		// 		incorrect = true;
		// 	}
		// }
		return false;
	};
</script>

<span class="section">
	<div class="input">
		<div class="leading-icon">
			<UserIcon />
		</div>
		<input
			type="username"
			name="username"
			id="username"
			minlength={MINLEN}
			maxlength={MAXLEN}
			required
			autocomplete="off"
			placeholder={$t('choose_a_username')}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			disabled={confirmed}
		/>
	</div>
	{#if incorrect}<IncorrectIcon />{:else if confirmed}
		<CheckIcon />
	{/if}
</span>

<style lang="postcss">
	.section {
		@apply flex w-80;
	}
	div.input {
		@apply relative w-full;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
