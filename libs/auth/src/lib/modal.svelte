<script lang="ts">
	import { AsyncLoginCheck, Login } from '$lib/api/api';
	import Email from '$lib/parts/email.svelte';
	import Password from '$lib/parts/password.svelte';
	import Totp from '$lib/parts/totp.svelte';
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
		stateTotp,
		stateTotpSet,
		stateWalletAddress,
		stateWalletConfirmed
	} from './state';

	let _form: HTMLFormElement;
	let _email: Email;
	let _wallet: Wallet;
	let _password: Password;
	let _totp: Totp;

	let _loggedIn: boolean | undefined = undefined;
	let _showPassword = false;
	let _showTotp = false;
	let _ready = false;
	let _submitting = false;
	let _email_required = true;

	let emailAddress = '';
	let googleAuthToken = '';
	let magicLinkToken = '';
	let password = '';
	let totp = '';
	let walletAddress = '';

	loggedIn.subscribe((value: boolean | undefined) => (_loggedIn = value));

	stateEmail.subscribe((value) => {
		emailAddress = value;
	});
	statePassword.subscribe((value) => {
		password = value;
	});
	stateTotp.subscribe((value) => {
		totp = value;
		if (totp.length > 0) console.log(`top: ${totp}`);
	});
	stateWalletAddress.subscribe((value) => {
		walletAddress = value;
	});
	stateShowPassword.subscribe((value) => {
		_showPassword = value;
	});
	stateShowTotp.subscribe((value) => {
		_showTotp = value;
	});

	statePasswordSet.subscribe((value) => {
		if (value) {
			if (_form.checkValidity()) {
				_ready = true;
			}
		} else {
			_ready = false;
		}
	});

	stateTotpSet.subscribe((value) => {
		if (value) {
			if (_form.checkValidity()) {
				_ready = true;
			}
		} else {
			_ready = false;
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

	stateWalletConfirmed.subscribe((value) => {
		if (!value || !walletAddress) return;
		(async () => loginCheck())().catch((error) => {
			const errorStr = `${error}`.toLowerCase();
			console.log(errorStr);
		});
	});

	const loginCheck = async () => {
		const vars = { variables: { emailAddress, magicLinkToken, googleAuthToken, walletAddress } };
		console.log(`posting ${JSON.stringify(vars)}`);
		const result = await AsyncLoginCheck(vars);
		console.log(`LoginCheck result: ${JSON.stringify(result, null, 2)}`);
		if (result.data?.loginCheck) {
			const check = result.data.loginCheck;
			if (check.isRegistered === true) {
				// check if ready to log in
				if (check.hasPassword && !check.hasGoogle) stateShowPassword.set(true);
				if (check.hasTotp) {
					stateShowTotp.set(true);
				}
				if (check.walletConfirmed && (!check.hasTotp || totp.length > 0)) {
					_ready = true;
					_email_required = false;
				}
				if (
					check.emailConfirmed &&
					(!check.hasTotp || totp.length > 0) &&
					(!check.hasPassword || password.length > 0 || (check.hasGoogle && googleAuthToken))
				) {
					_ready = true;
				}
			} else if (check.isRegistered === false) {
				// check if ready to go to next step of registration
				if (check.walletConfirmed) {
					_ready = true;
					_email_required = false;
				}
				if (check.emailConfirmed) {
					_ready = true;
				}
			}
		}
	};

	const submit = (event: Event) => {
		if (_loggedIn) {
			event.preventDefault();
			const url = import.meta.env.VITE_AUTH_URL;
			window.location.replace(url);
			return;
		}
		if (_ready && _form.checkValidity()) {
			event.preventDefault();
			_submitting = true;
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
					setTimeout(() => (_submitting = false), 1000);
					if (result.data?.login) {
						const login = result.data.login;
						if (login.token) {
							if (verifyToken(login.token)) {
								setTimeout(() => {
									if (_loggedIn) {
										const url = import.meta.env.VITE_AUTH_URL;
										window.location.replace(url);
									}
								}, 10);
							}
						}
					} else {
						console.log(`Login error: ${JSON.stringify(result, null, 2)}`);
					}
				})().catch((error) => {
					const errorStr = `${error}`.toLowerCase();
					console.log(errorStr);
					_submitting = false;
				});
			} catch (e) {
				console.log(`LoginCheck error ${e}`);
				_submitting = false;
			}
		} else {
			event.preventDefault();
			_form.reportValidity();
			_submitting = false;
		}
		// (async () => {
		// 	console.log(`login as ${email}`);
		// })().catch((error) => {
		// 	const errorStr = `${error}`.toLowerCase();
		// 	if (errorStr.includes('user')) {
		// 		console.log(`user not found`);
		// 	} else if (errorStr.includes('password')) {
		// 		console.log(`invalid password`);
		// 	} else console.log(`got an error: ${errorStr}`);
		// });
	};

	const logout = (): void => {
		deleteToken();
		stateReset();
	};
</script>

<form bind:this={_form} on:submit={submit}>
	<div class="underlay" />
	<div class="overlay">
		<div class="center">
			<div class="modal">
				<h1 class="welcome">Welcome</h1>
				{#if _loggedIn === false}
					<h3 class="header">Login or Register</h3>
					<Email bind:this={_email} bind:required={_email_required} />
					<hr />
					<Wallet bind:this={_wallet} />
					{#if _showPassword}
						<hr />
						<Password bind:this={_password} />
					{/if}
					{#if _showTotp}
						<hr />
						<Totp bind:this={_totp} />
					{/if}
				{/if}
				<hr />
				<button class="playnow" on:click={submit} disabled={!_ready && !_submitting && !_loggedIn}
					>Play Now</button
				>
				{#if _loggedIn === true}
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
</style>
