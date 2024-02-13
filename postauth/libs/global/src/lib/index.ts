import type { LocaleKeyValues, LocaleTranslation } from '@infinitro/global';
import {
	languages,
	locale,
	loggedIn,
	relativeHref,
	token,
	username,
	verifyToken
} from '@infinitro/global';
import { setClient } from 'svelte-apollo';
import { client } from './api_client';

export {
	client,
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
