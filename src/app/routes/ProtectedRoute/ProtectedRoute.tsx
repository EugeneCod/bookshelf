import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const { children } = props;
  // TODO добавить глобальный контекст аворизации
  const isAuth = true;
  return isAuth ? children : <Navigate to={ROUTES.SIGNIN} replace />;
};

export { ProtectedRoute };
