import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../utils/constants';

const PrivateRoutes = () => {
  // TODO добавить глобальный контекст аворизации
  const isAuth = true;
  return isAuth
    ? <Outlet />
    : <Navigate to={ROUTES.SIGNIN} replace/>
}

export default PrivateRoutes