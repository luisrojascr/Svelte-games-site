import { writable } from 'svelte/store';

export const locale = writable('en');

export type LocaleKeyValues = {
	[key: string]: string;
};

export type LocaleTranslation = {
	[lang: string]: LocaleKeyValues;
};

export const languages: LocaleKeyValues = {
	cs: 'Čeština',
	de: 'Deutsch',
	en: 'English',
	es: 'Español',
	fr: 'Français',
	it: 'Italiano',
	ja: '日本語',
	pt: 'Português',
	ru: 'Русский',
	zh: '中文'
};
