import { setClient } from 'svelte-apollo';
import { client } from './api_client';
import type { LocaleKeyValues, LocaleTranslation } from './i18n';
import { languages, locale } from './i18n';
import { relativeHref } from './paths';
import { deleteToken, loggedIn, token, username, verifyToken } from './token';

export {
	client,
	deleteToken,
	languages,
	locale,
	loggedIn,
	relativeHref,
	setClient,
	token,
	username,
	verifyToken
};
export type { LocaleKeyValues, LocaleTranslation };

export default client;
