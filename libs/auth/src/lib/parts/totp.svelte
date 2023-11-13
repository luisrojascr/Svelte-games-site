<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import IncorrectIcon from '$lib/icons/incorrect.svelte';
	import LockIcon from '$lib/icons/lock.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { t } from '$lib/locale/i18n';
	import { stateTotp, stateTotpSet } from '../state';

	export let incorrect = false;

	let element: HTMLInputElement;
	let valid = false;
	let allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let value = '';

	const onChange = () => {
		valid = element.checkValidity();
		incorrect = false;
		stateTotp.set(valid ? element.value : '');
		stateTotpSet.set(valid);
	};

	const onBlur = (event: Event) => {
		if (!incorrect) {
			valid = element.checkValidity();
			stateTotp.set(valid ? element.value : '');
			stateTotpSet.set(valid);
		}
	};

	const onKeyPress = (event: KeyboardEvent) => {
		if (!allowed.includes(event.key)) event.preventDefault();
	};

	const onPaste = (event: ClipboardEvent) => {
		try {
			let paste = event.clipboardData?.getData('text') ?? '';
			paste = paste.replace(/[^0-9]/g, '');
			event.preventDefault();
			if (paste.length > 0) document.execCommand('insertText', false, paste);
		} catch (e) {
			console.log(`error handling paste: ${e}`);
		}
	};

	const onRemove = (event: Event) => {
		event.preventDefault();
		stateTotp.set('');
		value = '';
	};
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<LockIcon />
		</div>
		<input
			type="text"
			name="totp"
			id="totp"
			placeholder={$t('twofa_totp_code')}
			minlength="6"
			maxlength="6"
			required
			autocomplete="off"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			on:keypress={onKeyPress}
			on:paste={onPaste}
			{value}
		/>
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
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-10;
	}
</style>
