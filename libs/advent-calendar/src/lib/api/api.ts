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
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Calendar = {
  __typename?: 'Calendar';
  daysOpened: Array<CalendarDayUser>;
  endDay: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
  startDay: Scalars['Int']['output'];
};

export type CalendarDayUser = {
  __typename?: 'CalendarDayUser';
  claimEnd?: Maybe<Scalars['DateTime']['output']>;
  claimStart?: Maybe<Scalars['DateTime']['output']>;
  claimedAt?: Maybe<Scalars['DateTime']['output']>;
  claimedEligibleAt?: Maybe<Scalars['DateTime']['output']>;
  day: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disclaimer?: Maybe<Scalars['String']['output']>;
  freeSpinCurrency?: Maybe<Scalars['String']['output']>;
  freeSpinGame?: Maybe<Scalars['String']['output']>;
  freeSpinResult?: Maybe<Scalars['Decimal']['output']>;
  freeSpinSlug?: Maybe<Scalars['String']['output']>;
  freeSpins?: Maybe<Scalars['Int']['output']>;
  hasEligibility?: Maybe<Scalars['Boolean']['output']>;
  isEligible?: Maybe<Scalars['Boolean']['output']>;
  minDeposit?: Maybe<Scalars['Int']['output']>;
  month: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Context = {
  __typename?: 'Context';
  get: Context;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  calendarClaimDayEligible?: Maybe<CalendarDayUser>;
  calendarOpenDay?: Maybe<CalendarDayUser>;
  getContext: Context;
  usernameCheck: UsernameCheckResult;
};


export type MutationRootCalendarClaimDayEligibleArgs = {
  day: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
};


export type MutationRootCalendarOpenDayArgs = {
  day: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
};


export type MutationRootUsernameCheckArgs = {
  username: Scalars['String']['input'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  add: Scalars['Int']['output'];
  getCalendar: Calendar;
  getContext: Context;
  wallets: Array<Wallet>;
};


export type QueryRootAddArgs = {
  a: Scalars['Int']['input'];
  b: Scalars['Int']['input'];
};


export type QueryRootGetCalendarArgs = {
  month: Scalars['Int']['input'];
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

export type Wallet = {
  __typename?: 'Wallet';
  _id: Scalars['UUID']['output'];
  available: Scalars['Decimal']['output'];
  type: Scalars['String']['output'];
};

export type CalendarClaimDayEligibleMutationVariables = Exact<{
  month: Scalars['Int']['input'];
  day: Scalars['Int']['input'];
}>;


export type CalendarClaimDayEligibleMutation = { __typename?: 'MutationRoot', calendarClaimDayEligible?: { __typename?: 'CalendarDayUser', claimedAt?: any | null, claimedEligibleAt?: any | null, claimEnd?: any | null, claimStart?: any | null, day: number, description?: string | null, disclaimer?: string | null, freeSpins?: number | null, freeSpinCurrency?: string | null, freeSpinGame?: string | null, freeSpinSlug?: string | null, hasEligibility?: boolean | null, isEligible?: boolean | null, minDeposit?: number | null, month: number, title?: string | null } | null };

export type CalendarOpenDayMutationVariables = Exact<{
  month: Scalars['Int']['input'];
  day: Scalars['Int']['input'];
}>;


export type CalendarOpenDayMutation = { __typename?: 'MutationRoot', calendarOpenDay?: { __typename?: 'CalendarDayUser', claimedAt?: any | null, claimedEligibleAt?: any | null, claimEnd?: any | null, claimStart?: any | null, day: number, description?: string | null, disclaimer?: string | null, freeSpins?: number | null, freeSpinGame?: string | null, hasEligibility?: boolean | null, isEligible?: boolean | null, minDeposit?: number | null, month: number, title?: string | null } | null };

export type GetCalendarQueryVariables = Exact<{
  month: Scalars['Int']['input'];
}>;


export type GetCalendarQuery = { __typename?: 'QueryRoot', getCalendar: { __typename?: 'Calendar', month: number, startDay: number, endDay: number, daysOpened: Array<{ __typename?: 'CalendarDayUser', claimedAt?: any | null, claimedEligibleAt?: any | null, claimEnd?: any | null, claimStart?: any | null, day: number, description?: string | null, disclaimer?: string | null, freeSpins?: number | null, freeSpinCurrency?: string | null, freeSpinGame?: string | null, freeSpinSlug?: string | null, hasEligibility?: boolean | null, minDeposit?: number | null, month: number, title?: string | null }> } };


export const CalendarClaimDayEligibleDoc = gql`
    mutation CalendarClaimDayEligible($month: Int!, $day: Int!) {
  calendarClaimDayEligible(month: $month, day: $day) {
    claimedAt
    claimedEligibleAt
    claimEnd
    claimStart
    day
    description
    disclaimer
    freeSpins
    freeSpinCurrency
    freeSpinGame
    freeSpinSlug
    hasEligibility
    isEligible
    minDeposit
    month
    title
  }
}
    `;
export const CalendarOpenDayDoc = gql`
    mutation CalendarOpenDay($month: Int!, $day: Int!) {
  calendarOpenDay(month: $month, day: $day) {
    claimedAt
    claimedEligibleAt
    claimEnd
    claimStart
    day
    description
    disclaimer
    freeSpins
    freeSpinGame
    hasEligibility
    isEligible
    minDeposit
    month
    title
  }
}
    `;
export const GetCalendarDoc = gql`
    query GetCalendar($month: Int!) {
  getCalendar(month: $month) {
    month
    startDay
    endDay
    daysOpened {
      claimedAt
      claimedEligibleAt
      claimEnd
      claimStart
      day
      description
      disclaimer
      freeSpins
      freeSpinCurrency
      freeSpinGame
      freeSpinSlug
      hasEligibility
      minDeposit
      month
      title
    }
  }
}
    `;
export const CalendarClaimDayEligible = (
            options: Omit<
              MutationOptions<any, CalendarClaimDayEligibleMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CalendarClaimDayEligibleMutation, CalendarClaimDayEligibleMutationVariables>({
              mutation: CalendarClaimDayEligibleDoc,
              ...options,
            });
            return m;
          }
export const CalendarOpenDay = (
            options: Omit<
              MutationOptions<any, CalendarOpenDayMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CalendarOpenDayMutation, CalendarOpenDayMutationVariables>({
              mutation: CalendarOpenDayDoc,
              ...options,
            });
            return m;
          }
export const GetCalendar = (
            options: Omit<
              WatchQueryOptions<GetCalendarQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetCalendarQuery> & {
              query: ObservableQuery<
                GetCalendarQuery,
                GetCalendarQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetCalendarDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetCalendarQuery> & {
                query: ObservableQuery<
                  GetCalendarQuery,
                  GetCalendarQueryVariables
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
        
              export const AsyncGetCalendar = (
                options: Omit<
                  QueryOptions<GetCalendarQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<GetCalendarQuery>({query: GetCalendarDoc, ...options})
              }
            