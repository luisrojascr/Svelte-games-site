import type {
	ApolloQueryResult,
	ObservableQuery,
	QueryOptions,
	WatchQueryOptions
} from '@apollo/client';
import client from '@infinitro/global';
import gql from 'graphql-tag';
import type { Readable } from 'svelte/store';
import { readable } from 'svelte/store';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	UUID: { input: any; output: any };
};

export type CasinoGame = {
	__typename?: 'CasinoGame';
	category?: Maybe<Scalars['String']['output']>;
	description?: Maybe<Scalars['String']['output']>;
	edge?: Maybe<Scalars['Float']['output']>;
	hasDemo?: Maybe<Scalars['Boolean']['output']>;
	name?: Maybe<Scalars['String']['output']>;
	provider?: Maybe<Scalars['String']['output']>;
	slug?: Maybe<Scalars['String']['output']>;
	thumbnailUrl?: Maybe<Scalars['String']['output']>;
	thumbnailUrlLow?: Maybe<Scalars['String']['output']>;
};

export type ChatMessage = {
	__typename?: 'ChatMessage';
	_id: Scalars['String']['output'];
	chatLanguage?: Maybe<Scalars['String']['output']>;
	chatModeratorId?: Maybe<Scalars['String']['output']>;
	createdAt: Scalars['Int']['output'];
	isChatModerator?: Maybe<Scalars['Boolean']['output']>;
	levelReached?: Maybe<Scalars['String']['output']>;
	message: Scalars['String']['output'];
	userId: Scalars['String']['output'];
	username: Scalars['String']['output'];
};

export type Context = {
	__typename?: 'Context';
	get: Context;
};

export type MutationRoot = {
	__typename?: 'MutationRoot';
	getContext: Context;
	heartbeat: Scalars['Boolean']['output'];
};

export type Provider = {
	__typename?: 'Provider';
	name: Scalars['String']['output'];
	thumbnailUrl: Scalars['String']['output'];
};

export type QueryRoot = {
	__typename?: 'QueryRoot';
	/** Returns the sum of a and b */
	add: Scalars['Int']['output'];
	allBets: Array<SlimBet>;
	betFeed: Array<SlimBet>;
	casinoGameList: Array<Scalars['String']['output']>;
	chatMessages: Array<ChatMessage>;
	getContext: Context;
	getGames: Array<CasinoGame>;
	getNewAndPopularGames: Array<CasinoGame>;
	getProviders: Array<Provider>;
	health: ServerState;
};

export type QueryRootAddArgs = {
	a: Scalars['Int']['input'];
	b: Scalars['Int']['input'];
};

export type QueryRootAllBetsArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryRootChatMessagesArgs = {
	chatLanguage?: InputMaybe<Scalars['String']['input']>;
};

export type QueryRootGetGamesArgs = {
	category?: InputMaybe<Scalars['String']['input']>;
	input?: InputMaybe<Scalars['String']['input']>;
	provider?: InputMaybe<Scalars['String']['input']>;
	slug?: InputMaybe<Scalars['String']['input']>;
	sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ServerState = {
	__typename?: 'ServerState';
	appName: Scalars['String']['output'];
	appVersion: Scalars['String']['output'];
	envAccount: Scalars['String']['output'];
	gitMessage: Scalars['String']['output'];
	instanceId: Scalars['UUID']['output'];
	libVersion: Scalars['String']['output'];
	mongoConnected: Scalars['Boolean']['output'];
	now: Scalars['String']['output'];
	port: Scalars['Int']['output'];
	postgresConnected: Scalars['Boolean']['output'];
	startedAt: Scalars['String']['output'];
};

export type SlimBet = {
	__typename?: 'SlimBet';
	_id: Scalars['String']['output'];
};

export type SubscriptionRoot = {
	__typename?: 'SubscriptionRoot';
	interval: Scalars['Int']['output'];
};

export type SubscriptionRootIntervalArgs = {
	n?: Scalars['Int']['input'];
};

export type ServerStateQueryVariables = Exact<{ [key: string]: never }>;

export type ServerStateQuery = {
	__typename?: 'QueryRoot';
	health: {
		__typename?: 'ServerState';
		appName: string;
		appVersion: string;
		envAccount: string;
		gitMessage: string;
		instanceId: any;
		libVersion: string;
		mongoConnected: boolean;
		now: string;
		postgresConnected: boolean;
		startedAt: string;
	};
};

export const ServerStateDoc = gql`
	query ServerState {
		health {
			appName
			appVersion
			envAccount
			gitMessage
			instanceId
			libVersion
			mongoConnected
			now
			postgresConnected
			startedAt
		}
	}
`;
export const ServerState = (
	options: Omit<WatchQueryOptions<ServerStateQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<ServerStateQuery> & {
		query: ObservableQuery<ServerStateQuery, ServerStateQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: ServerStateDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<ServerStateQuery> & {
			query: ObservableQuery<ServerStateQuery, ServerStateQueryVariables>;
		}
	>({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
		q.subscribe((v: any) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const AsyncServerState = (
	options: Omit<QueryOptions<ServerStateQueryVariables>, 'query'>
) => {
	return client.query<ServerStateQuery>({ query: ServerStateDoc, ...options });
};
