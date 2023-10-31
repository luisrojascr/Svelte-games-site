import client from "$lib/api/api_client";
import type {
        MutationOptions
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

export type LoginDeviceCheckResult = {
  __typename?: 'LoginDeviceCheckResult';
  deviceId: Scalars['String']['output'];
  sessionId: Scalars['String']['output'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  emailAddress?: Maybe<Scalars['String']['output']>;
  emailBanned: Scalars['Boolean']['output'];
  emailConfirmed?: Maybe<Scalars['Boolean']['output']>;
  geoBlock: Scalars['Boolean']['output'];
  googleConfirmed?: Maybe<Scalars['Boolean']['output']>;
  hasGoogle: Scalars['Boolean']['output'];
  hasPassword: Scalars['Boolean']['output'];
  hasTotp: Scalars['Boolean']['output'];
  hasWallet: Scalars['Boolean']['output'];
  ipReject: Scalars['Boolean']['output'];
  isDuplicate: Scalars['Boolean']['output'];
  isRegistered: Scalars['Boolean']['output'];
  magiclinkConfirmed?: Maybe<Scalars['Boolean']['output']>;
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
  loginCheck: LoginResult;
  loginDeviceCheck: LoginDeviceCheckResult;
  registration: LoginResult;
  usernameCheck: UsernameCheckResult;
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


export type MutationRootLoginCheckArgs = {
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


export type MutationRootLoginDeviceCheckArgs = {
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


export type MutationRootRegistrationArgs = {
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
  username: Scalars['String']['input'];
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRootUsernameCheckArgs = {
  username: Scalars['String']['input'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Returns the sum of a and b */
  add: Scalars['Int']['output'];
  getContext: Context;
};


export type QueryRootAddArgs = {
  a: Scalars['Int']['input'];
  b: Scalars['Int']['input'];
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  interval: Scalars['Int']['output'];
};


export type SubscriptionRootIntervalArgs = {
  n?: Scalars['Int']['input'];
};

export type UsernameCheckResult = {
  __typename?: 'UsernameCheckResult';
  available: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  totp?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'MutationRoot', login: { __typename?: 'LoginResult', emailAddress?: string | null, emailBanned: boolean, emailConfirmed?: boolean | null, geoBlock: boolean, hasGoogle: boolean, hasPassword: boolean, hasTotp: boolean, hasWallet: boolean, ipReject: boolean, isDuplicate: boolean, isRegistered: boolean, passwordConfirmed?: boolean | null, seonReject: boolean, success: boolean, token?: string | null, totpConfirmed?: boolean | null, username?: string | null, walletAddress?: string | null, walletBanned: boolean, walletConfirmed?: boolean | null } };

export type LoginCheckMutationVariables = Exact<{
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginCheckMutation = { __typename?: 'MutationRoot', loginCheck: { __typename?: 'LoginResult', emailAddress?: string | null, emailBanned: boolean, emailConfirmed?: boolean | null, geoBlock: boolean, hasGoogle: boolean, hasPassword: boolean, hasTotp: boolean, hasWallet: boolean, ipReject: boolean, isDuplicate: boolean, isRegistered: boolean, passwordConfirmed?: boolean | null, seonReject: boolean, success: boolean, token?: string | null, totpConfirmed?: boolean | null, username?: string | null, walletAddress?: string | null, walletBanned: boolean, walletConfirmed?: boolean | null } };

export type RegistrationMutationVariables = Exact<{
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  googleAuthToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  stag?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegistrationMutation = { __typename?: 'MutationRoot', registration: { __typename?: 'LoginResult', emailAddress?: string | null, emailBanned: boolean, emailConfirmed?: boolean | null, geoBlock: boolean, hasGoogle: boolean, hasPassword: boolean, hasTotp: boolean, hasWallet: boolean, ipReject: boolean, isDuplicate: boolean, isRegistered: boolean, passwordConfirmed?: boolean | null, seonReject: boolean, success: boolean, token?: string | null, totpConfirmed?: boolean | null, username?: string | null, walletAddress?: string | null, walletBanned: boolean, walletConfirmed?: boolean | null } };

export type UsernameCheckMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsernameCheckMutation = { __typename?: 'MutationRoot', usernameCheck: { __typename?: 'UsernameCheckResult', available: boolean, username: string } };


export const LoginDoc = gql`
    mutation Login($emailAddress: String, $googleAuthToken: String, $language: String, $magicLinkToken: String, $password: String, $stag: String, $totp: String, $walletAddress: String) {
  login(
    emailAddress: $emailAddress
    googleAuthToken: $googleAuthToken
    language: $language
    magicLinkToken: $magicLinkToken
    password: $password
    stag: $stag
    totp: $totp
    walletAddress: $walletAddress
  ) {
    emailAddress
    emailBanned
    emailConfirmed
    geoBlock
    hasGoogle
    hasPassword
    hasTotp
    hasWallet
    ipReject
    isDuplicate
    isRegistered
    passwordConfirmed
    seonReject
    success
    token
    totpConfirmed
    username
    walletAddress
    walletBanned
    walletConfirmed
  }
}
    `;
export const LoginCheckDoc = gql`
    mutation LoginCheck($emailAddress: String, $googleAuthToken: String, $language: String, $magicLinkToken: String, $stag: String, $walletAddress: String) {
  loginCheck(
    emailAddress: $emailAddress
    googleAuthToken: $googleAuthToken
    language: $language
    magicLinkToken: $magicLinkToken
    stag: $stag
    walletAddress: $walletAddress
  ) {
    emailAddress
    emailBanned
    emailConfirmed
    geoBlock
    hasGoogle
    hasPassword
    hasTotp
    hasWallet
    ipReject
    isDuplicate
    isRegistered
    passwordConfirmed
    seonReject
    success
    token
    totpConfirmed
    username
    walletAddress
    walletBanned
    walletConfirmed
  }
}
    `;
export const RegistrationDoc = gql`
    mutation Registration($emailAddress: String, $googleAuthToken: String, $language: String, $magicLinkToken: String, $password: String, $stag: String, $username: String!, $walletAddress: String) {
  registration(
    emailAddress: $emailAddress
    googleAuthToken: $googleAuthToken
    language: $language
    magicLinkToken: $magicLinkToken
    password: $password
    stag: $stag
    username: $username
    walletAddress: $walletAddress
  ) {
    emailAddress
    emailBanned
    emailConfirmed
    geoBlock
    hasGoogle
    hasPassword
    hasTotp
    hasWallet
    ipReject
    isDuplicate
    isRegistered
    passwordConfirmed
    seonReject
    success
    token
    totpConfirmed
    username
    walletAddress
    walletBanned
    walletConfirmed
  }
}
    `;
export const UsernameCheckDoc = gql`
    mutation UsernameCheck($username: String!) {
  usernameCheck(username: $username) {
    available
    username
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
              MutationOptions<any, LoginCheckMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LoginCheckMutation, LoginCheckMutationVariables>({
              mutation: LoginCheckDoc,
              ...options,
            });
            return m;
          }
export const Registration = (
            options: Omit<
              MutationOptions<any, RegistrationMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<RegistrationMutation, RegistrationMutationVariables>({
              mutation: RegistrationDoc,
              ...options,
            });
            return m;
          }
export const UsernameCheck = (
            options: Omit<
              MutationOptions<any, UsernameCheckMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<UsernameCheckMutation, UsernameCheckMutationVariables>({
              mutation: UsernameCheckDoc,
              ...options,
            });
            return m;
          }