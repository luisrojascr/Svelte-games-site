import type { PlayerWallet } from '$lib/api/api';
import type { CryptoCurrencyEnum, CryptoNetworkEnum } from '$lib/crypto/currency';
import { writable } from 'svelte/store';

export enum CashierTab {
	Deposit = 1,
	Offers = 2,
	Withdraw = 3,
	Buy = 4
}

export enum SelectBy {
	Token = 1,
	Network = 2
}

export const stateBonusCode = writable<string>('');
export const stateBonusCodeConfirmed = writable<boolean>(false);
export const stateCurrency = writable<CryptoCurrencyEnum | undefined>(undefined);
export const stateNetwork = writable<CryptoNetworkEnum | undefined>(undefined);
export const stateWallets = writable<PlayerWallet[]>([]);
export const stateTab = writable<CashierTab>(CashierTab.Deposit);
export const stateSelectBy = writable<SelectBy>(SelectBy.Token);

export const stateReset = () => {
	stateBonusCode.set('');
	stateBonusCodeConfirmed.set(false);
	stateCurrency.set(undefined);
	stateNetwork.set(undefined);
	stateWallets.set([]);
};
