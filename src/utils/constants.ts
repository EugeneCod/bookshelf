export const ROUTES = {
  MAIN: '/',
  ITEMS: '/books',
  FAVORITES: '/favorites',
  HISTORY: '/history',
  SEARCH: '/search',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  UNASSIGNED: '*',
}

export const REGEX = {
  EMAIL: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
}

export const AUTH_ERROR_MESSAGES = {
  EMAIL_CONFLICT: 'Пользователь с таким email уже зарегистрирован',
  UNIDENTIFIED: 'В процессе авторизации произошла ошибка',
  INCORRECT_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',
}