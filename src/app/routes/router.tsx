import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../../layouts';
import {
  Favorites,
  Home,
  Item,
  Login,
  NotFound,
  SearchCurrent,
  SearchHistory,
  Signup,
} from '../../pages';
import { ROUTES } from '../../utils/constants';

import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

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
          path: `${ROUTES.SEARCH}/:search`,
          element: <SearchCurrent />,
        },
        {
          path: `${ROUTES.BOOK}/:id`,
          element: <Item />,
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
