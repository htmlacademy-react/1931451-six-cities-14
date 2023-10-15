import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/authorization-status.enum';
import { AppRoute } from '../../types/app-route.enum';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login}/>;
}
