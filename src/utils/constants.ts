export const ROUTES = {
  MAIN: '/',
  BOOK: '/book',
  FAVORITES: '/favorites',
  HISTORY: '/history',
  SEARCH: '/search',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  UNASSIGNED: '*',
};

export const REGEX = {
  EMAIL: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
};

export const AUTH_ERROR_MESSAGES = {
  EMAIL_CONFLICT: 'The user with this email has already been registered',
  UNIDENTIFIED: 'An error occurred during the authorization process',
  INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password',
  LOGOUT_ERROR: 'Unknown logout error',
};

export const BOOKS_API = {
  BASE_URL: 'https://www.googleapis.com/books/v1',
  BOOKS_PATH: '/volumes',
  PARAMS: {
    SEARCH: 'q',
    PROJECTION: 'projection',
    START_INDEX: 'startIndex',
    MAX_RESULTS: 'maxResults',
    KEY: 'key',
  },
};
