import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { token } from '$lib/token';

let _token: string | null | undefined = undefined;
token.subscribe((value: string | null | undefined) => _token = value);

console.log(`API URL: ${import.meta.env.VITE_API_URL}`);
const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL as string,
	credentials: 'same-origin',
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) =>
	({
	  headers: {
		...headers,
		"x-access-token": _token ?? '',
	  }
	}));

export const client = new ApolloClient({ link: authLink.concat(httpLink), cache });

export default client;
