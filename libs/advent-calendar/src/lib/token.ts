import jwtDecode from 'jwt-decode';
import { writable } from 'svelte/store';

export const loggedIn = writable<boolean | undefined>(undefined);
export const username = writable<string>('');
export const token = writable<string | null | undefined>(undefined);

let _token: string | null | undefined = undefined;

type Token = {
	id: string;
	username: string;
	role: string[];
	iat: number;
	exp: number;
};

export const getDomain = (): string => {
	const data = window.location.hostname.split('.');
	if (data.length < 2) return data[0];
	// presumes single level TLDs e.g. .uk but not co.uk
	return `${data[data.length - 2]}.${data[data.length - 1]}`;
};

export const getCookie = (key: string): string | null => {
	const cookies = document.cookie.split(';');
	const cookie = cookies.find((v) => v.trim().startsWith(`${key}=`));
	if (!cookie) return null;
	const values = cookie?.split('=');
	if (values && values.length > 1) return values[1];
	return null;
};

export const setCookie = (key: string, value: string): void => {
	document.cookie = `${key}=${value}; domain=${getDomain()}; path=/;`;
};

export const deleteCookie = (key: string): void => {
	const cookie = `${key}=; domain=${getDomain()}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	console.log(`delete cookie ${cookie}`);
	document.cookie = cookie;
	console.log(`session ${getCookie('session')}`);
};

const initToken = (): Token | null => {
	const _token = getCookie('session');
	console.log(`initToken ${_token}`);
	if (!_token) {
		loggedIn.set(false);
		return null;
	}
	return verifyToken(_token);
};

export const verifyToken = (_token: string): Token | null => {
	try {
		const decoded = jwtDecode(_token) as Token;
		console.log(JSON.stringify(decoded));
		const now = Math.floor(Date.now() / 1000);
		if (!decoded.exp || now > decoded.exp) {
			loggedIn.set(false);
			return null;
		} else {
			// console.log(
			// 	`auth expires in
			// 	${Math.floor((decoded.exp - now) / (60 * 60 * 24))} days
			// 	${Math.floor(((decoded.exp - now) % (60 * 60 * 24)) / (60 * 60))} hours
			// 	${Math.floor(((decoded.exp - now) % (60 * 60)) / 60)} minutes
			// 	${Math.floor((decoded.exp - now) % 60)} seconds`
			// );
			setTimeout(() => loggedIn.set(false), (decoded.exp - now) * 1000);
		}
		// todo: store email in token so we can set/display it here
		token.set(_token);
		loggedIn.set(true);
		return decoded;
	} catch {
		return null;
	}
};

export const deleteToken = (): void => {
	deleteCookie('session');
	token.set(null);
	loggedIn.set(false);
};

loggedIn.subscribe((value) => {
	if (value === false) {
		deleteCookie('session');
		username.set('');
		token.set(null);
	}
});

token.subscribe((value: string | null | undefined) => {
	_token = value;
	if (_token) setCookie('session', _token);
});

initToken();
