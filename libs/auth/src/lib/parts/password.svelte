<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import EyeIcon from '$lib/icons/eye.svelte';
	import EyeSlashIcon from '$lib/icons/eyeslash.svelte';
	import IncorrectIcon from '$lib/icons/incorrect.svelte';
	import LockIcon from '$lib/icons/lock.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { t } from '$lib/locale/i18n';
	import { statePassword, statePasswordSet } from '../state';
	import { FormMode } from '../types';

	export let required = true;
	export let incorrect = false;
	export let mode: FormMode = FormMode.Login;

	let element: HTMLInputElement;
	let valid = false;
	let revealed = false;
	let value = '';
	let confirmed = false;

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

	const onRemove = (event: Event) => {
		event.preventDefault();
		statePassword.set('');
		value = '';
		// statePasswordConfirmed.set(false);
		valid = false;
		confirmed = false;
	};
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<LockIcon />
		</div>
		<input
			type="password"
			name="password"
			id="password"
			placeholder={mode === FormMode.Register ? $t('choose_a_password') : $t('password')}
			minlength="8"
			{required}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			{value}
		/>
		<a class="trailing-icon" href={'#'} on:click={onRevealToggle} tabindex="-1">
			{#if revealed}
				<EyeSlashIcon />
			{:else}
				<EyeIcon />
			{/if}
		</a>
	</div>
	{#if incorrect}<IncorrectIcon />{:else if valid}
		<CheckIcon />
	{/if}
</span>

<style lang="postcss">
	.section {
		@apply pt-4 flex;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-auto;
	}
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-10;
	}
</style>
