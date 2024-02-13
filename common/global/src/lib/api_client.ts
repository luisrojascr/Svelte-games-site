import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

// console.log(`API URL: ${import.meta.env.VITE_API_URL}`);
const link = new HttpLink({
	uri: import.meta.env.VITE_API_URL as string
});

const cache = new InMemoryCache();

export const client = new ApolloClient({ link, cache });

export default client;
