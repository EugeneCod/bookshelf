import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BOOKS_API } from '../../../utils/constants';
import stubImage from '../../../assets/img/stub-image.png';

import type {
  ApiBooksLiteData,
  LocalBookShortData,
  LocalBookFullData,
  ApiBooksFullItem,
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
      transformResponse: ({ items }: ApiBooksLiteData) =>
        items
          ? items.map((item) => ({
              id: item.id,
              title: item.volumeInfo.title,
              authors:
                item.volumeInfo.authors?.join(', ') ||
                'The authors is not specified',
              imageLink: item.volumeInfo.imageLinks?.thumbnail || stubImage,
            }))
          : [],
    }),
    getBookById: builder.query<LocalBookFullData, string | undefined>({
      query: (id) => `${BOOKS_PATH}/${id}`,
      transformResponse: (item: ApiBooksFullItem) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors:
          item.volumeInfo.authors?.join(', ') || 'The authors is not specified',
        imageLink: item.volumeInfo.imageLinks?.medium || stubImage,
        averageRating: item.volumeInfo.averageRating?.toString() || 'n/a',
        categories:
          item.volumeInfo.categories?.join(', ') ||
          'Categories are not specified',
        description:
          item.volumeInfo.description || 'The description is not specified',
        pageCount: item.volumeInfo.pageCount?.toString() || 'n/a',
        publishedDate:
          item.volumeInfo.publishedDate ||
          'The publication date is not specified',
        previewLink: item.volumeInfo.previewLink || '/',
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi;
