import { useContext } from 'react';
import { AuthorizationStatusContextType, AuthorizationStatusContext } from '../context';

// TODO: Может имеет смысл перенести этот хук в директория context?
export function useAuthorizationStatus(): AuthorizationStatusContextType {
  const authorizationStatus = useContext<AuthorizationStatusContextType>(
    AuthorizationStatusContext
  );

  return authorizationStatus;
}
