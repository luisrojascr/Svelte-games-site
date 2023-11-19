<script lang="ts">
	import CheckIcon from '$lib/icons/check.svelte';
	import EmailIcon from '$lib/icons/email.svelte';
	import RemoveIcon from '$lib/icons/remove.svelte';
	import { t } from '$lib/locale/i18n';
	import { OAuthExtension } from '@magic-ext/oauth';
	import jwt_decode from 'jwt-decode';
	import { Magic } from 'magic-sdk';
	import { onMount } from 'svelte';
	let element: HTMLInputElement;

	export let required = true;
	let email = '';
	let magicToken = '';
	let confirmed = false;

	const magic = new Magic(import.meta.env.VITE_MAGIC_LINK, {
		extensions: [new OAuthExtension()]
	});

	const onChange = () => {
		const _valid = element.checkValidity();
		email = element.value;
	};

	const onBlur = (event: Event) => {
		const _valid = element.value.length > 0 && element.checkValidity();
		if (_valid && !confirmed) {
			confirmWithMagicLink(event);
		}
	};

	const setMagicLinkToken = (email: string, token: string) => {
		if (!token || token.length === 0) return;
		try {
			magicToken = token;
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
						confirmed = false;
						resolve(false);
					})
					.on('done', (result: any) => {
						if (!result) return;
						setMagicLinkToken(__email, result);
						resolved = true;
						confirmed = true;
						resolve(true);
					})
					.on('error', (reason: any) => {
						console.log(`reason: ${reason}`);
						confirmed = false;
					})
					.on('settled', () => {
						console.log(`settled`);
					});
			} catch (e) {
				console.error(`caught ${e}`);
				confirmed = false;
			}
		});
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
	</div>
	{#if confirmed}<CheckIcon />{/if}
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
