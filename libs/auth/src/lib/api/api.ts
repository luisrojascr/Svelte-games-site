import client from "$lib/api/api_client";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, QueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Context = {
  __typename?: 'Context';
  get: Context;
};

export type LoginCheck = {
  __typename?: 'LoginCheck';
  emailAddress?: Maybe<Scalars['String']['output']>;
  emailBanned: Scalars['Boolean']['output'];
  emailConfirmed?: Maybe<Scalars['Boolean']['output']>;
  geoBlock: Scalars['Boolean']['output'];
  hasGoogle: Scalars['Boolean']['output'];
  hasPassword: Scalars['Boolean']['output'];
  hasTotp: Scalars['Boolean']['output'];
  hasWallet: Scalars['Boolean']['output'];
  ipReject: Scalars['Boolean']['output'];
  isDuplicate: Scalars['Boolean']['output'];
  isRegistered: Scalars['Boolean']['output'];
  seonReject: Scalars['Boolean']['output'];
  walletAddress?: Maybe<Scalars['String']['output']>;
  walletBanned: Scalars['Boolean']['output'];
  walletConfirmed?: Maybe<Scalars['Boolean']['output']>;
};

export type LoginDeviceCheck = {
  __typename?: 'LoginDeviceCheck';
  deviceId: Scalars['String']['output'];
  sessionId: Scalars['String']['output'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  emailAddress?: Maybe<Scalars['String']['output']>;
  emailBanned: Scalars['Boolean']['output'];
  emailConfirmed?: Maybe<Scalars['Boolean']['output']>;
  geoBlock: Scalars['Boolean']['output'];
  ipReject: Scalars['Boolean']['output'];
  isDuplicate: Scalars['Boolean']['output'];
  passwordConfirmed?: Maybe<Scalars['Boolean']['output']>;
  seonReject: Scalars['Boolean']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  totpConfirmed?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
  walletBanned: Scalars['Boolean']['output'];
  walletConfirmed?: Maybe<Scalars['Boolean']['output']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  getContext: Context;
  login: LoginResult;
};


export type MutationRootLoginArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  seonFingerprint?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  totp?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Returns the sum of a and b */
  add: Scalars['Int']['output'];
  getContext: Context;
  loginCheck: LoginCheck;
  loginDeviceCheck: LoginDeviceCheck;
  usernameCheck: UsernameCheck;
};


export type QueryRootAddArgs = {
  a: Scalars['Int']['input'];
  b: Scalars['Int']['input'];
};


export type QueryRootLoginCheckArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  seonFingerprint?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRootLoginDeviceCheckArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  referUrl?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  userAgent: Scalars['String']['input'];
  utmCampaign?: InputMaybe<Scalars['String']['input']>;
  utmContent?: InputMaybe<Scalars['String']['input']>;
  utmMedium?: InputMaybe<Scalars['String']['input']>;
  utmSource?: InputMaybe<Scalars['String']['input']>;
  utmTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRootUsernameCheckArgs = {
  username: Scalars['String']['input'];
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  interval: Scalars['Int']['output'];
};


export type SubscriptionRootIntervalArgs = {
  n?: Scalars['Int']['input'];
};

export type UsernameCheck = {
  __typename?: 'UsernameCheck';
  available: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  language?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  totp?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'MutationRoot', login: { __typename?: 'LoginResult', success: boolean, username?: string | null, token?: string | null, emailAddress?: string | null, walletAddress?: string | null, emailConfirmed?: boolean | null, walletConfirmed?: boolean | null, passwordConfirmed?: boolean | null, totpConfirmed?: boolean | null, emailBanned: boolean, walletBanned: boolean, isDuplicate: boolean, seonReject: boolean, geoBlock: boolean, ipReject: boolean } };

export type LoginCheckQueryVariables = Exact<{
  language?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginCheckQuery = { __typename?: 'QueryRoot', loginCheck: { __typename?: 'LoginCheck', emailAddress?: string | null, walletAddress?: string | null, emailConfirmed?: boolean | null, walletConfirmed?: boolean | null, isRegistered: boolean, hasGoogle: boolean, hasTotp: boolean, hasWallet: boolean, hasPassword: boolean, emailBanned: boolean, walletBanned: boolean, isDuplicate: boolean, seonReject: boolean, geoBlock: boolean, ipReject: boolean } };

export type UsernameCheckQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsernameCheckQuery = { __typename?: 'QueryRoot', usernameCheck: { __typename?: 'UsernameCheck', username: string, available: boolean } };


export const LoginDoc = gql`
    mutation Login($language: String, $emailAddress: String, $magicLinkToken: String, $googleAuthToken: String, $stag: String, $password: String, $totp: String, $walletAddress: String) {
  login(
    language: $language
    emailAddress: $emailAddress
    magicLinkToken: $magicLinkToken
    googleAuthToken: $googleAuthToken
    stag: $stag
    password: $password
    totp: $totp
    walletAddress: $walletAddress
  ) {
    success
    username
    token
    emailAddress
    walletAddress
    emailConfirmed
    walletConfirmed
    passwordConfirmed
    totpConfirmed
    emailBanned
    walletBanned
    isDuplicate
    seonReject
    geoBlock
    ipReject
  }
}
    `;
export const LoginCheckDoc = gql`
    query LoginCheck($language: String, $emailAddress: String, $magicLinkToken: String, $googleAuthToken: String, $stag: String, $walletAddress: String) {
  loginCheck(
    language: $language
    emailAddress: $emailAddress
    magicLinkToken: $magicLinkToken
    googleAuthToken: $googleAuthToken
    stag: $stag
    walletAddress: $walletAddress
  ) {
    emailAddress
    walletAddress
    emailConfirmed
    walletConfirmed
    isRegistered
    hasGoogle
    hasTotp
    hasWallet
    hasPassword
    emailBanned
    walletBanned
    isDuplicate
    seonReject
    geoBlock
    ipReject
  }
}
    `;
export const UsernameCheckDoc = gql`
    query UsernameCheck($username: String!) {
  usernameCheck(username: $username) {
    username
    available
  }
}
    `;
export const Login = (
            options: Omit<
              MutationOptions<any, LoginMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LoginMutation, LoginMutationVariables>({
              mutation: LoginDoc,
              ...options,
            });
            return m;
          }
export const LoginCheck = (
            options: Omit<
              WatchQueryOptions<LoginCheckQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<LoginCheckQuery> & {
              query: ObservableQuery<
                LoginCheckQuery,
                LoginCheckQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: LoginCheckDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<LoginCheckQuery> & {
                query: ObservableQuery<
                  LoginCheckQuery,
                  LoginCheckQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncLoginCheck = (
                options: Omit<
                  QueryOptions<LoginCheckQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<LoginCheckQuery>({query: LoginCheckDoc, ...options})
              }
            
export const UsernameCheck = (
            options: Omit<
              WatchQueryOptions<UsernameCheckQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<UsernameCheckQuery> & {
              query: ObservableQuery<
                UsernameCheckQuery,
                UsernameCheckQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: UsernameCheckDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<UsernameCheckQuery> & {
                query: ObservableQuery<
                  UsernameCheckQuery,
                  UsernameCheckQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncUsernameCheck = (
                options: Omit<
                  QueryOptions<UsernameCheckQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<UsernameCheckQuery>({query: UsernameCheckDoc, ...options})
              }
            