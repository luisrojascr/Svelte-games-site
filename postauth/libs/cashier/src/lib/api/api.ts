import client from "@infinitro/global-postauth";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, QueryOptions
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
  Decimal: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Claims = {
  __typename?: 'Claims';
  exp: Scalars['Int']['output'];
  iat: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  iss?: Maybe<Scalars['String']['output']>;
  kid?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  userObjectId?: Maybe<Scalars['ObjectId']['output']>;
  userUuid?: Maybe<Scalars['UUID']['output']>;
  username: Scalars['String']['output'];
};

export type Context = {
  __typename?: 'Context';
  get: Context;
};

export enum CryptoToken {
  BNB_BNB = 'BNB_BNB',
  BNB_USDT = 'BNB_USDT',
  BTC_BTC = 'BTC_BTC',
  DOGE_DOGE = 'DOGE_DOGE',
  ETH_ETH = 'ETH_ETH',
  ETH_USDC = 'ETH_USDC',
  ETH_USDT = 'ETH_USDT',
  LTC_LTC = 'LTC_LTC',
  POLYGON_MATIC = 'POLYGON_MATIC',
  POLYGON_USDC = 'POLYGON_USDC',
  POLYGON_USDT = 'POLYGON_USDT'
}

export type CurrencyLimit = {
  __typename?: 'CurrencyLimit';
  minDeposit: Scalars['Decimal']['output'];
  minWithdrawal: Scalars['Decimal']['output'];
  token?: Maybe<CryptoToken>;
};

export type CurrencyLimits = {
  __typename?: 'CurrencyLimits';
  limits: Array<CurrencyLimit>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  getContext: Context;
  testuserLogin: TestUser;
};


export type MutationRootTestuserLoginArgs = {
  userNumber: Scalars['Int']['input'];
};

export type PlayerWallet = {
  __typename?: 'PlayerWallet';
  available: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  authcheck: Claims;
  cashierMinLimits: CurrencyLimits;
  getContext: Context;
  health: ServerState;
  wallets: Array<PlayerWallet>;
};

export enum Role {
  ANY = 'ANY',
  MODERATOR = 'MODERATOR',
  NONE = 'NONE',
  STAFF = 'STAFF',
  USER = 'USER'
}

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

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  interval: Scalars['Int']['output'];
};


export type SubscriptionRootIntervalArgs = {
  n?: Scalars['Int']['input'];
};

export type TestUser = {
  __typename?: 'TestUser';
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthCheckQuery = { __typename?: 'QueryRoot', authcheck: { __typename?: 'Claims', id: string, username: string, role?: Role | null } };

export type CashierMinLimitsQueryVariables = Exact<{ [key: string]: never; }>;


export type CashierMinLimitsQuery = { __typename?: 'QueryRoot', cashierMinLimits: { __typename?: 'CurrencyLimits', limits: Array<{ __typename?: 'CurrencyLimit', token?: CryptoToken | null, minDeposit: any, minWithdrawal: any }> } };

export type ServerStateQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerStateQuery = { __typename?: 'QueryRoot', health: { __typename?: 'ServerState', appName: string, appVersion: string, envAccount: string, gitMessage: string, instanceId: any, libVersion: string, mongoConnected: boolean, now: string, postgresConnected: boolean, startedAt: string } };

export type WalletsQueryVariables = Exact<{ [key: string]: never; }>;


export type WalletsQuery = { __typename?: 'QueryRoot', wallets: Array<{ __typename?: 'PlayerWallet', id: any, available: any, type: string }> };


export const AuthCheckDoc = gql`
    query AuthCheck {
  authcheck {
    id
    username
    role
  }
}
    `;
export const CashierMinLimitsDoc = gql`
    query CashierMinLimits {
  cashierMinLimits {
    limits {
      token
      minDeposit
      minWithdrawal
    }
  }
}
    `;
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
export const WalletsDoc = gql`
    query Wallets {
  wallets {
    id
    available
    type
  }
}
    `;
export const AuthCheck = (
            options: Omit<
              WatchQueryOptions<AuthCheckQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<AuthCheckQuery> & {
              query: ObservableQuery<
                AuthCheckQuery,
                AuthCheckQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: AuthCheckDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<AuthCheckQuery> & {
                query: ObservableQuery<
                  AuthCheckQuery,
                  AuthCheckQueryVariables
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
        
              export const AsyncAuthCheck = (
                options: Omit<
                  QueryOptions<AuthCheckQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<AuthCheckQuery>({query: AuthCheckDoc, ...options})
              }
            
export const CashierMinLimits = (
            options: Omit<
              WatchQueryOptions<CashierMinLimitsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<CashierMinLimitsQuery> & {
              query: ObservableQuery<
                CashierMinLimitsQuery,
                CashierMinLimitsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: CashierMinLimitsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<CashierMinLimitsQuery> & {
                query: ObservableQuery<
                  CashierMinLimitsQuery,
                  CashierMinLimitsQueryVariables
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
        
              export const AsyncCashierMinLimits = (
                options: Omit<
                  QueryOptions<CashierMinLimitsQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<CashierMinLimitsQuery>({query: CashierMinLimitsDoc, ...options})
              }
            
export const ServerState = (
            options: Omit<
              WatchQueryOptions<ServerStateQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<ServerStateQuery> & {
              query: ObservableQuery<
                ServerStateQuery,
                ServerStateQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: ServerStateDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<ServerStateQuery> & {
                query: ObservableQuery<
                  ServerStateQuery,
                  ServerStateQueryVariables
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
        
              export const AsyncServerState = (
                options: Omit<
                  QueryOptions<ServerStateQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<ServerStateQuery>({query: ServerStateDoc, ...options})
              }
            
export const Wallets = (
            options: Omit<
              WatchQueryOptions<WalletsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<WalletsQuery> & {
              query: ObservableQuery<
                WalletsQuery,
                WalletsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: WalletsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<WalletsQuery> & {
                query: ObservableQuery<
                  WalletsQuery,
                  WalletsQueryVariables
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
        
              export const AsyncWallets = (
                options: Omit<
                  QueryOptions<WalletsQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<WalletsQuery>({query: WalletsDoc, ...options})
              }
            