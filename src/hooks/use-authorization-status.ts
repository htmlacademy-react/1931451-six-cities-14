import { useContext } from 'react';
import { AuthorizationStatusContextType, AuthorizationStatusContext } from '../context';
import { AuthorizationStatus } from '../types';

export function useAuthorizationStatus(): boolean {
  const { authorizationStatus } = useContext<AuthorizationStatusContextType>(
    AuthorizationStatusContext
  );

  return authorizationStatus === AuthorizationStatus.Auth;
}
