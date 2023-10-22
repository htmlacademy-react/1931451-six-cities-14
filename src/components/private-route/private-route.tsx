import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import { useAuthorizationStatus } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/utils';

type PrivateRouteProps = {
  redirectTo: AppRoute;
  children: JSX.Element;
};

export default function PrivateRoute({
  redirectTo,
  children
}: PrivateRouteProps): JSX.Element {
  const { authorizationStatus } = useAuthorizationStatus();
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  return isLogged ? children : <Navigate to={redirectTo}/>;
}
