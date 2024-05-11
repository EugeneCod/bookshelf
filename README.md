![Deploy Status](https://github.com/EugeneCod/bookshelf/actions/workflows/gh-pages_deploy.yml/badge.svg)

# Bookshelf

- Приложение для поиска книг.
- [Развернутое приложение](https://eugenecod.github.io/bookshelf/)
- Используемое API [Google Books API](https://developers.google.com/books)

---

## :scroll: Функционал

- Регистрация и авторизация пользователей.
- Поиск книг по названиию.
- Возможность добавления книг в избранное.
- Сохранение истории поисковых запросов с меткой времени.

---

## :toolbox: Выполненные требования

### 1 уровень

- [x] Реализованы Требования к функциональности.
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем ~~LocalStorage~~ Firebase.
- [x] Пишем функциональные компоненты c хуками в приоритете над классовыми.
- [x] Есть разделение на [умные](https://github.com/EugeneCod/bookshelf/blob/main/src/components/Header/Header.tsx) и [глупые](https://github.com/EugeneCod/bookshelf/blob/main/src/components/AuthBtn/AuthBtn.tsx) компоненты.
- [x] Есть рендеринг [списков](https://github.com/EugeneCod/bookshelf/blob/main/src/components/CardList/CardList.tsx).
- [x] Реализована хотя бы одна [форма](https://github.com/EugeneCod/bookshelf/blob/main/src/components/AuthForm/AuthForm.tsx).
- [x] Есть применение [Контекст API](https://github.com/EugeneCod/bookshelf/blob/main/src/app/contexts/ThemeContext.ts).
- [x] Есть применение [предохранителя](https://github.com/EugeneCod/bookshelf/blob/main/src/App.tsx).
- [x] Есть хотя бы один кастомный [хук](https://github.com/EugeneCod/bookshelf/tree/main/src/hooks).
- [x] Хотя бы несколько компонентов используют [PropTypes](https://github.com/EugeneCod/bookshelf/blob/main/src/components/HistoryItem/HistoryItem.tsx).
- [x] Поиск не должен триггерить много запросов к [серверу](https://github.com/EugeneCod/bookshelf/blob/main/src/hooks/useDebounce.ts).
- [x] Есть применение [lazy + Suspense](https://github.com/EugeneCod/bookshelf/blob/main/src/app/routes/router.tsx).
- [x] Используем Modern Redux with [Redux Toolkit](https://github.com/EugeneCod/bookshelf/tree/main/src/app/store).
- [x] Используем [слайсы](https://github.com/EugeneCod/bookshelf/blob/main/src/app/store/history/slice.ts).
- [x] Есть хотя бы одна кастомная [мидлвара](https://github.com/EugeneCod/bookshelf/blob/main/src/app/store/middlewares/checkAuthMiddleware.ts).
- [x] Используется [RTK Query](https://github.com/EugeneCod/bookshelf/blob/main/src/app/store/books/booksApi.ts).
- [x] Используется [Transforming Responses](hhttps://github.com/EugeneCod/bookshelf/blob/main/src/utils/booksApi.ts).

### 2 уровень

- [x] Использование TypeScript.
- [x] Использование Firebase.
- [x] Настроен CI/CD.
- [x] Добавлены [тесты](https://github.com/EugeneCod/bookshelf/tree/develop/cypress/e2e).
