import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants';
import { useAppSelector } from '../../store/hooks';
import { selectUserIsAuth } from '../../store/user/selectors';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const isAuth = useAppSelector(selectUserIsAuth);
  const { children } = props;
  return isAuth ? children : <Navigate to={ROUTES.SIGNIN} replace />;
};

export { ProtectedRoute };
