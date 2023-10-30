<script lang="ts">
	import { stateTotp, stateTotpSet } from '../state';

	export let incorrect = false;

	let element: HTMLInputElement;
	let valid = false;
	let allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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
			autocomplete="off"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			on:keypress={onKeyPress}
			on:paste={onPaste}
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
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-12;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3 pl-2;
	}
</style>
