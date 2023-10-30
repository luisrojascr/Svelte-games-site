<script lang="ts">
	import { AsyncLoginCheck, Login, LoginCheck } from '$lib/api/api';
	import Email from '$lib/parts/email.svelte';
	import Password from '$lib/parts/password.svelte';
	import Terms from '$lib/parts/terms.svelte';
	import Totp from '$lib/parts/totp.svelte';
	import Username from '$lib/parts/username.svelte';
	import Wallet from '$lib/parts/wallet.svelte';
	import { deleteToken, loggedIn, verifyToken } from '$lib/token';
	import type { Log } from 'ethers';
	import { checkContractWalletSignature } from 'siwe';
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
	let check: LoginCheck | undefined = undefined;

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

	const loginCheck = async () => {
		const vars = { variables: { emailAddress, magicLinkToken, googleAuthToken, walletAddress } };
		console.log(`posting ${JSON.stringify(vars)}`);
		const result = await AsyncLoginCheck(vars);
		console.log(`LoginCheck result: ${JSON.stringify(result, null, 2)}`);
		if (result.data?.loginCheck) {
			check = result.data.loginCheck;
			if (check.isRegistered === true) {
				formMode = FormMode.Login;
				// check if ready to log in
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
				ready = isReady();
			} else if (check.isRegistered === false) {
				formMode = FormMode.Register;

				// check if ready to go to next step of registration
				if (walletAddress.length > 0 && check.walletConfirmed) {
					emailRequired = false;
					passwordRequired = false;
				}
				if (emailAddress.length > 0 && check.emailConfirmed) {
					stateShowPassword.set(true);
				}
			}
		}
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

	const isReady = (): boolean => {
		if (isLoggedIn) return true;
		if (form && !form.checkValidity()) return false;
		if (check?.isRegistered === false) {
			if (check.emailConfirmed || check.walletConfirmed) {
				if (formPage === 1) return true;
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

	const submit = (event: Event): void => {
		event.preventDefault();
		if (isLoggedIn) {
			const url = import.meta.env.VITE_AUTH_URL;
			window.location.replace(url);
			return;
		}
		ready = isReady();
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
				console.log(`submit registration`);
				return;
			}
		}
		if (formMode === FormMode.Login) {
			submitting = true;
			try {
				(async () => {
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
						const login = result.data.login;
						if (login.token) {
							if (verifyToken(login.token)) {
								setTimeout(() => {
									if (isLoggedIn) {
										const url = import.meta.env.VITE_AUTH_URL;
										window.location.replace(url);
									}
								}, 10);
							}
						} else {
							if (login.passwordConfirmed === false) passwordIncorrect = true;
							if (login.totpConfirmed === false) totpIncorrect = true;
						}
					} else {
						console.log(`Login error: ${JSON.stringify(result, null, 2)}`);
					}
				})().catch((error) => {
					const errorStr = `${error}`.toLowerCase();
					console.log(errorStr);
					submitting = false;
				});
			} catch (e) {
				console.log(`LoginCheck error ${e}`);
				submitting = false;
			}
		}
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
	stateUsername.subscribe((value) => {
		username = value;
		ready = isReady();
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

	statePasswordSet.subscribe((value) => {
		if (value) {
			ready = isReady();
		} else {
			ready = false;
		}
	});

	stateTotpSet.subscribe((value) => {
		if (value) {
			ready = isReady();
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

	stateTermsConfirmed.subscribe((value) => {
		termsConfirmed = value;
		ready = isReady();
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
				<button class="playnow" on:click={submit} disabled={!ready && !submitting && !isLoggedIn}
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
