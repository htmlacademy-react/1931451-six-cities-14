import { createContext } from 'react';
import { AuthorizationStatusType } from '../../types';
import { AUTH_STATUS } from '../../const';

export type AuthorizationStatusContextType = {
  authorizationStatus: AuthorizationStatusType;
  setAuthorizationStatus: (data: AuthorizationStatusType) => void;
};

export const AuthorizationStatusContext =
  createContext<AuthorizationStatusContextType>({
    authorizationStatus: AUTH_STATUS,
    setAuthorizationStatus: () => {},
  });
