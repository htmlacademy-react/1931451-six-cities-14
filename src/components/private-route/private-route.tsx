import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import { checkAuthorizationStatus } from '../../utils/utils';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  redirectTo: AppRoute;
  children: JSX.Element;
};

export default function PrivateRoute({
  redirectTo,
  children
}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  return isLogged ? children : <Navigate to={redirectTo}/>;
}
