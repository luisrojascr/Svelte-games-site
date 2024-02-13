<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import EmailIcon from '$lib/icons/email.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { t } from '$lib/locale/i18n';
	import { OAuthExtension } from '@magic-ext/oauth';
	import { Magic } from 'magic-sdk';
	import { onMount } from 'svelte';
	import { stateEmail, stateEmailConfirmed, stateMagicToken } from '../state';
	let element: HTMLInputElement;
	let confirmed = false;

	export let required = true;

	const magic = new Magic(import.meta.env.VITE_MAGIC_LINK, {
		extensions: [new OAuthExtension()]
	});

	const onChange = () => {
		const _valid = element.checkValidity();
		if (_valid) stateEmail.set(element.value);
	};

	const onBlur = (event: Event) => {
		const _valid = element.value.length > 0 && element.checkValidity();
		if (_valid && !confirmed) {
			confirmWithMagicLink(event);
		}
	};

	stateEmail.subscribe((_value) => {
		if (element) element.value = _value;
	});

	stateEmailConfirmed.subscribe((value) => {
		confirmed = value;
	});

	const setMagicLinkToken = (email: string, token: string) => {
		if (!token || token.length === 0) return;
		try {
			stateMagicToken.set(token);
			stateEmailConfirmed.set(true);
			confirmed = true;
		} catch (e) {
			console.log(`error setting magiclink token: ${e}`);
		}
	};

	onMount(() => {
		magic
			.preload()
			.then(() => console.log('loaded magiclink sdk'))
			.catch((e) => `error loading magiclink sdk: ${e}`);
	});

	export const confirmWithMagicLink = (event: Event): Promise<boolean> => {
		event.preventDefault();
		return new Promise((resolve) => {
			let resolved = false;
			if (!element.checkValidity() || confirmed) return;
			try {
				let __email = element.value;
				const handle = magic.auth.loginWithEmailOTP({ email: __email, showUI: true });
				handle
					// .on('email-otp-sent', () => {
					// 	console.log(`OTP sent`);
					// })
					.on('invalid-email-otp', () => {
						console.log(`Invalid OTP`);
						handle.emit('cancel');
						resolved = true;
						stateEmailConfirmed.set(false);
						resolve(false);
					})
					.on('done', (result) => {
						if (!result) return;
						setMagicLinkToken(__email, result);
						resolved = true;
						resolve(true);
					})
					.on('error', (reason) => {
						console.log(`reason: ${reason}`);
						stateEmailConfirmed.set(false);
					})
					.on('settled', () => {
						console.log(`settled`);
					});
			} catch (e) {
				console.error(`caught ${e}`);
				stateEmailConfirmed.set(false);
			}
		});
	};

	const onRemove = (event: Event) => {
		event.preventDefault();
		stateEmail.set('');
		stateEmailConfirmed.set(false);
		stateMagicToken.set('');
		confirmed = false;
	};
</script>

<span class="section">
	<div class="input">
		<div class="leading-icon">
			<EmailIcon />
		</div>
		<input
			type="email"
			name="email"
			id="email"
			placeholder={`${$t('email_address')}` + (required ? `` : ` (${$t('optional')})`)}
			{required}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			disabled={confirmed}
		/>
		{#if confirmed}
			<a class="trailing-icon" href={'#'} on:click={onRemove} tabindex="-1">
				<RemoveIcon />
			</a>
		{/if}
	</div>
	{#if confirmed}<CheckIcon />{/if}
</span>

<style lang="postcss">
	.section {
		@apply pt-6 flex;
	}
	div.input {
		@apply relative w-full;
	}
	.leading-icon {
		@apply relative top-[28px] left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.trailing-icon {
		@apply relative top-[28px] right-0 flex items-center pr-3.5 pointer-events-auto;
	}
	input,
	input:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	input:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
