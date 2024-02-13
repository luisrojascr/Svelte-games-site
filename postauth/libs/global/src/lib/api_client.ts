import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { token } from '@infinitro/global';

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL as string,
	credentials: 'same-origin'
});

const cache = new InMemoryCache();

let _token: string | null | undefined = undefined;

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			'x-access-token': _token ?? ''
		}
	};
});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache });

token.subscribe((value: string | null | undefined) => {
	_token = value;
	client.clearStore();
});

export { client };
export default client;
