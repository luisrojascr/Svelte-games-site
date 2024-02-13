import client from "@infinitro/global-postauth";
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
  username: Scalars['String']['output'];
};

export type Context = {
  __typename?: 'Context';
  get: Context;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  getContext: Context;
  testuserLogin: TestUser;
};


export type MutationRootTestuserLoginArgs = {
  userNumber: Scalars['Int']['input'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  authcheck: Claims;
  getContext: Context;
  health: ServerState;
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

export type ServerStateQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerStateQuery = { __typename?: 'QueryRoot', health: { __typename?: 'ServerState', appName: string, appVersion: string, envAccount: string, gitMessage: string, instanceId: any, libVersion: string, mongoConnected: boolean, now: string, postgresConnected: boolean, startedAt: string } };

export type TestuserLoginMutationVariables = Exact<{
  userNumber: Scalars['Int']['input'];
}>;


export type TestuserLoginMutation = { __typename?: 'MutationRoot', testuserLogin: { __typename?: 'TestUser', success: boolean, token?: string | null } };


export const AuthCheckDoc = gql`
    query AuthCheck {
  authcheck {
    id
    username
    role
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
export const TestuserLoginDoc = gql`
    mutation TestuserLogin($userNumber: Int!) {
  testuserLogin(userNumber: $userNumber) {
    success
    token
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
            
export const TestuserLogin = (
            options: Omit<
              MutationOptions<any, TestuserLoginMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<TestuserLoginMutation, TestuserLoginMutationVariables>({
              mutation: TestuserLoginDoc,
              ...options,
            });
            return m;
          }