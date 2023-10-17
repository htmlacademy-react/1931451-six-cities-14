import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types';
import { useAuthorizationStatus } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const isLogged = useAuthorizationStatus();
  return isLogged ? children : <Navigate to={AppRoute.Login}/>;
}
