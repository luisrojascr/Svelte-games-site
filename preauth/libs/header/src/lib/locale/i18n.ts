import type { LocaleKeyValues } from '@infinitro/global';
import { locale } from '@infinitro/global';
import { derived } from 'svelte/store';
import translations from './translations';

export { locale };
export const locales = Object.keys(translations);

function translate(locale: string, key: string, vars: LocaleKeyValues) {
	if (!translations[locale]) {
		console.warn(`Missing translation for locale "${locale}"`);
		if (locale !== 'en') return translate('en', key, vars);
		return key;
	}
	if (!translations[locale] || !translations[locale][key]) {
		console.warn(`Missing translation for key "${key}" in locale "${locale}"`);
		if (locale !== 'en') return translate('en', key, vars);
		return key;
	}

	let text = translations[locale][key];
	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key: string, vars: LocaleKeyValues = {}) =>
			translate($locale, key, vars)
);
