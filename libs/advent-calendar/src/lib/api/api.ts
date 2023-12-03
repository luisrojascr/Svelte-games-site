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
  day: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  month: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Context = {
  __typename?: 'Context';
  get: Context;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  calendarOpenDay?: Maybe<CalendarDayUser>;
  getContext: Context;
  usernameCheck: UsernameCheckResult;
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

export type CalendarOpenDayMutationVariables = Exact<{
  month: Scalars['Int']['input'];
  day: Scalars['Int']['input'];
}>;


export type CalendarOpenDayMutation = { __typename?: 'MutationRoot', calendarOpenDay?: { __typename?: 'CalendarDayUser', month: number, day: number, title?: string | null, description?: string | null } | null };


export const CalendarOpenDayDoc = gql`
    mutation CalendarOpenDay($month: Int!, $day: Int!) {
  calendarOpenDay(month: $month, day: $day) {
    month
    day
    title
    description
  }
}
    `;
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