<script lang="ts">
	import type { LoginResult } from '$lib/api/api';
	import { Login, Registration } from '$lib/api/api';
	import Email from '$lib/parts/email.svelte';
	import Password from '$lib/parts/password.svelte';
	import Terms from '$lib/parts/terms.svelte';
	import Totp from '$lib/parts/totp.svelte';
	import Username from '$lib/parts/username.svelte';
	import Wallet from '$lib/parts/wallet.svelte';
	import { deleteToken, loggedIn, verifyToken } from '$lib/token';
	import {
		stateEmail,
		stateGoogleToken,
		stateMagicToken,
		statePassword,
		statePasswordSet,
		stateReset,
		stateShowPassword,
		stateShowTotp,
		stateTermsConfirmed,
		stateTotp,
		stateTotpSet,
		stateUsername,
		stateWalletAddress,
		stateWalletConfirmed
	} from './state';
	import { FormMode } from './types';

	let form: HTMLFormElement;
	let formMode: FormMode = FormMode.Login;
	let formPage = 1;
	let isLoggedIn: boolean | undefined = undefined;
	let showPassword = false;
	let showTotp = false;
	let ready = false;
	let submitting = false;
	let check: LoginResult | undefined = undefined;

	let emailIncorrect = false;
	let emailRequired = true;
	let passwordIncorrect = false;
	let passwordRequired = false;
	let totpIncorrect = false;

	let emailAddress = '';
	let googleAuthToken = '';
	let magicLinkToken = '';
	let password = '';
	let termsConfirmed = false;
	let totp = '';
	let username = '';
	let walletAddress = '';

	// allows subcomponents to update of form validation check, for changes is required fields
	const forRender = (ms: number = 0): Promise<void> => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const loginCheck = async () => {
		submitting = true;
		await forRender();
		try {
			const vars = { variables: { emailAddress, magicLinkToken, googleAuthToken, walletAddress } };
			console.log(`posting ${JSON.stringify(vars)}`);
			const result = await Login(vars);
			console.log(`LoginCheck2 result: ${JSON.stringify(result, null, 2)}`);
			if (result.data?.login) {
				check = result.data.login;
				if (check.isRegistered === true) {
					formMode = FormMode.Login;
					// check if ready to log in
					if (check.token) {
						if (verifyToken(check.token)) {
							setTimeout(() => {
								if (isLoggedIn) {
									const url = import.meta.env.VITE_AUTH_URL;
									window.location.replace(url);
								}
							}, 10);
						}
					} else {
						if (check.passwordConfirmed === false) passwordIncorrect = true;
						if (check.totpConfirmed === false) totpIncorrect = true;
					}
					if (
						check.hasPassword &&
						!check.hasGoogle
						// && (password.length > 0 || !check.walletConfirmed)
					) {
						stateShowPassword.set(true);
					} else {
						statePassword.set('');
					}
					if (check.hasTotp) {
						stateShowTotp.set(true);
					}
					if (walletAddress.length > 0 && check.walletConfirmed) {
						emailRequired = false;
						passwordRequired = false;
					}
					ready = await isReady();
					console.log(`ready: ${ready}`);
				} else if (check.isRegistered === false) {
					// check if ready to go to next step of registration
					formMode = FormMode.Register;
					if (walletAddress.length > 0 && check.walletConfirmed) {
						console.log(`set email as not required`);
						emailRequired = false;
						passwordRequired = false;
					}
					if (emailAddress.length > 0 && check.emailConfirmed) {
						stateShowPassword.set(true);
					}
					ready = await isReady();
					console.log(`ready: ${ready}`);
				}
			}
		} catch (e) {
			console.log(`LoginCheck error ${e}`);
		}
		submitting = false;
		console.log('submitting false');
	};

	const switchMode = (event: Event, _mode: FormMode): void => {
		if (check?.isRegistered === true && _mode === FormMode.Register) {
			event.preventDefault();
			return;
		}
		if (check?.isRegistered === false && _mode === FormMode.Login) {
			event.preventDefault();
			return;
		}
		formMode = _mode;
	};

	const isReady = async (): Promise<boolean> => {
		if (isLoggedIn) return true;
		await forRender();
		if (form && !form.checkValidity()) {
			console.log(`fail form validity`);
			return false;
		}
		if (check?.isRegistered === false) {
			if (check.walletConfirmed) {
				if (formPage === 1) return true;
				if (formPage === 2 && username.length > 0 && termsConfirmed) return true;
			}
			if (check.emailConfirmed) {
				if (formPage === 1 && (googleAuthToken || password.length > 0)) return true;
				if (formPage === 2 && username.length > 0 && termsConfirmed) return true;
			}
		} else if (check?.isRegistered === true) {
			if (
				walletAddress.length > 0 &&
				check.walletConfirmed &&
				(!check.hasTotp || totp.length > 0)
			) {
				return true;
			}
			if (
				emailAddress.length > 0 &&
				check.emailConfirmed &&
				(!check.hasTotp || totp.length > 0) &&
				(!check.hasPassword || password.length > 0 || (check.hasGoogle && googleAuthToken))
			) {
				return true;
			}
		}
		return false;
	};

	const submit = async (event: Event): Promise<void> => {
		event.preventDefault();
		if (submitting) return;
		if (isLoggedIn) {
			const url = import.meta.env.VITE_AUTH_URL;
			window.location.replace(url);
			return;
		}
		ready = await isReady();
		if (!ready && form.checkValidity()) {
			submitting = false;
			form.reportValidity();
			return;
		}
		if (formMode === FormMode.Register) {
			if (formPage === 1) {
				formPage = 2;
				ready = false;
				return;
			} else if (formPage === 2) {
				submitting = true;
				console.log(`submitting ${submitting}`);
				await forRender(10);
				try {
					const vars = {
						variables: {
							emailAddress,
							magicLinkToken,
							googleAuthToken,
							password,
							username,
							walletAddress
						}
					};
					console.log(`posting ${JSON.stringify(vars)}`);
					const result = await Registration(vars);
					console.log(`Registration result: ${JSON.stringify(result, null, 2)}`);
					setTimeout(() => (submitting = false), 1000);
					if (result.data?.registration) {
						check = result.data.registration;
						if (check.token) {
							if (verifyToken(check.token)) {
								setTimeout(() => {
									if (isLoggedIn) {
										const url = import.meta.env.VITE_AUTH_URL;
										window.location.replace(url);
									}
								}, 10);
							}
						} else {
							if (check.passwordConfirmed === false) passwordIncorrect = true;
							if (check.totpConfirmed === false) totpIncorrect = true;
						}
					} else {
						console.log(`Registration error: ${JSON.stringify(result, null, 2)}`);
					}
					return;
				} catch (e) {
					console.log(`Registration error ${e}`);
				}
			}
		}
		if (formMode === FormMode.Login) {
			submitting = true;
			await forRender();
			try {
				const vars = {
					variables: {
						emailAddress,
						magicLinkToken,
						googleAuthToken,
						password,
						totp,
						walletAddress
					}
				};
				console.log(`posting ${JSON.stringify(vars)}`);
				const result = await Login(vars);
				console.log(`Login result: ${JSON.stringify(result, null, 2)}`);
				setTimeout(() => (submitting = false), 1000);
				if (result.data?.login) {
					check = result.data.login;
					if (check.token) {
						if (verifyToken(check.token)) {
							setTimeout(() => {
								if (isLoggedIn) {
									const url = import.meta.env.VITE_AUTH_URL;
									window.location.replace(url);
								}
							}, 10);
						}
					} else {
						if (check.passwordConfirmed === false) passwordIncorrect = true;
						if (check.totpConfirmed === false) totpIncorrect = true;
					}
				} else {
					console.log(`Login error: ${JSON.stringify(result, null, 2)}`);
				}
			} catch (e) {
				console.log(`LoginCheck error ${e}`);
			}
		}
		submitting = false;
		console.log('submitting false');
	};

	const logout = (): void => {
		deleteToken();
		stateReset();
	};

	loggedIn.subscribe((value: boolean | undefined) => (isLoggedIn = value));

	stateEmail.subscribe((value) => {
		emailAddress = value;
	});
	statePassword.subscribe((value) => {
		password = value;
	});
	stateTotp.subscribe((value) => {
		totp = value;
	});
	stateUsername.subscribe(async (value) => {
		username = value;
		ready = await isReady();
	});
	stateWalletAddress.subscribe((value) => {
		walletAddress = value;
	});
	stateShowPassword.subscribe((value) => {
		showPassword = value;
	});
	stateShowTotp.subscribe((value) => {
		showTotp = value;
	});

	statePasswordSet.subscribe(async (value) => {
		if (value) {
			ready = await isReady();
		} else {
			ready = false;
		}
	});

	stateTotpSet.subscribe(async (value) => {
		if (value) {
			ready = await isReady();
		} else {
			ready = false;
		}
	});

	stateMagicToken.subscribe((value) => {
		magicLinkToken = value;
		if (!emailAddress || !magicLinkToken) return;
		(async () => loginCheck())().catch((error) => {
			const errorStr = `${error}`.toLowerCase();
			console.log(errorStr);
		});
	});

	stateGoogleToken.subscribe((value) => {
		googleAuthToken = value;
		if (!emailAddress || !googleAuthToken) return;
		(async () => loginCheck())().catch((error) => {
			const errorStr = `${error}`.toLowerCase();
			console.log(errorStr);
		});
	});

	stateTermsConfirmed.subscribe(async (value) => {
		termsConfirmed = value;
		ready = await isReady();
	});

	stateWalletConfirmed.subscribe((value) => {
		if (!value || !walletAddress) return;
		(async () => loginCheck())().catch((error) => {
			const errorStr = `${error}`.toLowerCase();
			console.log(errorStr);
		});
	});
</script>

<form bind:this={form} on:submit={submit}>
	<div class="underlay" />
	<div class="overlay">
		<div class="center">
			<div class="modal">
				<h1 class="welcome">Welcome</h1>
				{#if isLoggedIn === false}
					<div class="mode">
						<a
							href={'#'}
							on:click={(e) => switchMode(e, FormMode.Login)}
							class={`mode${formMode === FormMode.Login ? '_selected' : ''}`}>Login</a
						>
						<a
							href={'#'}
							on:click={(e) => switchMode(e, FormMode.Register)}
							class={`mode${formMode === FormMode.Register ? '_selected' : ''}`}>Register</a
						>
					</div>
					{#if formMode === FormMode.Register && formPage === 2}
						<Username />
						<hr />
						<Terms />
					{:else}
						<Email bind:required={emailRequired} />
						<hr />
						<Wallet />
						{#if showPassword}
							<hr />
							<Password
								bind:required={passwordRequired}
								bind:mode={formMode}
								bind:incorrect={passwordIncorrect}
							/>
						{/if}
						{#if showTotp}
							<hr />
							<Totp />
						{/if}
					{/if}
				{/if}
				<hr />
				<button class="playnow" on:click={submit} disabled={submitting || !(isLoggedIn || ready)}
					>Play Now</button
				>
				{#if isLoggedIn === true}
					<div class="logout">
						<a href={'#'} on:click={logout} class="logout">logout</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</form>

<style lang="postcss">
	.header {
		@apply text-white text-xl font-medium;
	}
	.underlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full bg-black opacity-20;
	}
	.overlay {
		@apply z-10 fixed top-0 left-0 right-0 bottom-0 w-full overflow-x-hidden overflow-y-auto h-full flex items-center justify-center;
	}
	.center {
		@apply relative w-full max-w-lg max-h-full m-auto top-auto;
	}
	.modal {
		@apply relative bg-background-950 rounded-lg shadow p-10 border border-100 flex  flex-col justify-between space-y-6;
	}
	.welcome {
		@apply text-white text-5xl font-bold py-2;
	}
	.playnow {
		@apply w-full text-white bg-[#01D180] disabled:bg-gray-300 hover:bg-[#00B16c] focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
	}
	div.logout {
		@apply text-right;
	}
	a.logout {
		@apply text-gray-400 text-xs;
	}
	div.mode {
		@apply border-b-2 border-100 pb-3;
	}
	a.mode_selected {
		@apply text-white text-sm uppercase font-extrabold pr-3 pl-3 pb-3 border-b-4 border-blue-500;
	}
	a.mode {
		@apply text-gray-400 text-sm uppercase font-extrabold pr-3 pl-3 pb-3;
	}
</style>
