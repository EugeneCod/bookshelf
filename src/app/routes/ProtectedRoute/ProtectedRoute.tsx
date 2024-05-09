import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../../utils/constants';
import { useAppSelector } from '../../store/hooks';
import { selectUserIsAuth } from '../../store/user/selectors';

interface Props {
  children: JSX.Element;
  unauthorizedProtection?: boolean;
}

const ProtectedRoute = (props: Props) => {
  const { children, unauthorizedProtection = false } = props;
  const isAuth = useAppSelector(selectUserIsAuth);
  if (unauthorizedProtection) {
    return isAuth ? children : <Navigate to={ROUTES.SIGNIN} replace />;
  } else {
    return !isAuth ? children : <Navigate to={ROUTES.MAIN} replace />;
  }
};

export { ProtectedRoute };
