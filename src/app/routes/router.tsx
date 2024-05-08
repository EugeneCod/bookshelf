import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../../layouts';
import { ROUTES } from '../../utils/constants';

import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

const Book = lazy(() => import('../../pages/Book/Book'));
const Favorites = lazy(() => import('../../pages/Favorites/Favorites'));
const Home = lazy(() => import('../../pages/Home/Home'));
const Login = lazy(() => import('../../pages/Login/Login'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));
const SearchCurrent = lazy(
  () => import('../../pages/SearchCurrent/SearchCurrent'),
);
const SearchHistory = lazy(
  () => import('../../pages/SearchHistory/SearchHistory'),
);
const Signup = lazy(() => import('../../pages/Signup/Signup'));

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.MAIN,
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: ROUTES.SIGNIN,
          element: <Login />,
        },
        {
          path: ROUTES.SIGNUP,
          element: <Signup />,
        },
        {
          path: `${ROUTES.SEARCH}`,
          element: <SearchCurrent />,
        },
        {
          path: `${ROUTES.BOOK}/:id`,
          element: <Book />,
        },
        {
          path: ROUTES.FAVORITES,
          element: (
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.HISTORY,
          element: (
            <ProtectedRoute>
              <SearchHistory />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  { basename: '/bookshelf' },
);
