import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BOOKS_API } from '../../../utils/constants';
import { transformResBook, transformResBooks } from '../../../utils/booksApi';

import type {
  LocalBookShortData,
  LocalBookFullData,
  SearchQuery,
} from './types';

const { BASE_URL, BOOKS_PATH, PARAMS } = BOOKS_API;
const { SEARCH, PROJECTION, START_INDEX, MAX_RESULTS, KEY } = PARAMS;

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBooks: builder.query<LocalBookShortData[], SearchQuery>({
      query: ({ search, startIndex = 0, maxResults = 12 }) => ({
        url: BOOKS_PATH,
        params: {
          [SEARCH]: search,
          [PROJECTION]: 'lite',
          [START_INDEX]: startIndex.toString(),
          [MAX_RESULTS]: maxResults.toString(),
          [KEY]: import.meta.env.VITE_FIREBASE_API_KEY,
        },
      }),
      transformResponse: transformResBooks,
    }),
    getBookById: builder.query<LocalBookFullData, string | undefined>({
      query: (id) => `${BOOKS_PATH}/${id}`,
      transformResponse: transformResBook,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi;
