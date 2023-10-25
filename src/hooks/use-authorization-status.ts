import { useContext } from 'react';
import { AuthorizationStatusContextType, AuthorizationStatusContext } from '../context';

export function useAuthorizationStatus(): AuthorizationStatusContextType {
  const authorizationStatus = useContext<AuthorizationStatusContextType>(
    AuthorizationStatusContext
  );

  return authorizationStatus;
}
