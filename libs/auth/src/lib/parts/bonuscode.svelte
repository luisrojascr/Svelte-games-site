<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import GiftIcon from '$lib/icons/gift.svelte';
	import IncorrectIcon from '$lib/icons/incorrect.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { stateBonusCode, stateBonusCodeConfirmed } from '../state';

	let element: HTMLInputElement;
	let confirmed = false;
	let incorrect = false;
	let value = '';

	const onChange = () => {
		const _valid = element.checkValidity();
		if (_valid) stateBonusCode.set(element.value);
		else stateBonusCode.set('');
	};

	const onBlur = (event: Event) => {
		const _valid = element.value.length > 0 && element.checkValidity();
		if (_valid && !confirmed) {
			confirmBonusCode(event);
		}
	};

	stateBonusCode.subscribe((value) => {
		if (value) {
			value = value;
			if (element) element.value = value;
		}
	});

	stateBonusCodeConfirmed.subscribe((value) => {
		confirmed = value;
	});

	export const confirmBonusCode = (event: Event): Promise<boolean> => {
		event.preventDefault();
		return new Promise((resolve) => {
			let resolved = false;
			if (!element.checkValidity() || confirmed) return;
			try {
				resolve(false);
			} catch (e) {
				console.error(`caught ${e}`);
				stateBonusCodeConfirmed.set(false);
			}
		});
	};

	const onRemove = (event: Event) => {
		event.preventDefault();
		stateBonusCode.set('');
		value = '';
		stateBonusCodeConfirmed.set(false);
		confirmed = false;
	};
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon"><GiftIcon /></div>
		<input
			type="email"
			name="email"
			id="email"
			placeholder={`bonus code (optional)`}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			disabled={confirmed}
			{value}
		/>
		{#if confirmed}
			<a class="trailing-icon" href={'#'} on:click={onRemove} tabindex="-1">
				<RemoveIcon />
			</a>
		{/if}
	</div>
	{#if incorrect}<IncorrectIcon />{:else if confirmed}
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
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
