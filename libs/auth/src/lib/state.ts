import { writable } from 'svelte/store';

export const stateEmail = writable<string>('');
export const stateEmailConfirmed = writable<boolean>(false);
export const stateGoogleToken = writable<string>('');
export const stateMagicToken = writable<string>('');
export const statePassword = writable<string>('');
export const statePasswordSet = writable<boolean>(false);
export const stateRegistered = writable<boolean | undefined>(undefined);
export const stateShowPassword = writable<boolean>(false);
export const stateShowTotp = writable<boolean>(false);
export const stateTotp = writable<string>('');
export const stateTotpSet = writable<boolean>(false);
export const stateUsername = writable<string>('');
export const stateWalletAddress = writable<string>('');
export const stateWalletConfirmed = writable<boolean>(false);
export const stateWalletMessage = writable<string>('');
export const stateWalletSignature = writable<string>('');

export const stateReset = () => {
	stateEmail.set('');
	stateEmailConfirmed.set(false);
	stateGoogleToken.set('');
	stateMagicToken.set('');
	statePassword.set('');
	statePasswordSet.set(false);
	stateRegistered.set(undefined);
	stateShowPassword.set(false);
	stateShowTotp.set(false);
	stateTotp.set('');
	stateTotpSet.set(false);
	stateUsername.set('');
	stateWalletAddress.set('');
	stateWalletConfirmed.set(false);
	stateWalletMessage.set('');
	stateWalletSignature.set('');
};
