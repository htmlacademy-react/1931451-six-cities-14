import { useContext } from 'react';
import { AuthorizationStatusContextType, AuthorizationStatusContext } from './authorization-status.context';

export function useAuthorizationStatus(): AuthorizationStatusContextType {
  const authorizationStatus = useContext<AuthorizationStatusContextType>(
    AuthorizationStatusContext
  );

  if (! authorizationStatus) {
    throw new Error('useAuthorizationStatus must be used within AuthorizationStatusContext');
  }

  return authorizationStatus;
}
