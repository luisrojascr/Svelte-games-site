<script lang="ts">
	import Google from '$lib/parts/google.svelte';
	import { OAuthExtension } from '@magic-ext/oauth';
	import jwt_decode from 'jwt-decode';
	import { Magic } from 'magic-sdk';
	import { onMount } from 'svelte';
	import { stateEmail, stateEmailConfirmed, stateMagicToken } from '../state';

	let element: HTMLInputElement;
	let confirmed = false;
	let value = '';

	export let required = true;

	const magic = new Magic(import.meta.env.VITE_MAGIC_LINK, {
		extensions: [new OAuthExtension()]
	});

	const onChange = () => {
		const _valid = element.checkValidity();
		if (_valid) stateEmail.set(element.value);
		else stateEmail.set('');
	};

	const onBlur = (event: Event) => {
		const _valid = element.value.length > 0 && element.checkValidity();
		if (_valid && !confirmed) {
			confirmWithMagicLink(event);
		}
	};

	stateEmail.subscribe((value) => {
		if (value) {
			value = value;
			if (element) element.value = value;
		}
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
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<svg
				class="leading-icon-svg"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 16"
			>
				<path
					d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
				/>
				<path
					d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
				/>
			</svg>
		</div>
		<input
			type="email"
			name="email"
			id="email"
			placeholder={`email address`}
			{required}
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			on:blur={onBlur}
			disabled={confirmed}
			{value}
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
{#if !confirmed}
	<div class="google">
		<Google />
	</div>
{/if}

<style lang="postcss">
	.google {
		@apply pt-2;
	}
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
