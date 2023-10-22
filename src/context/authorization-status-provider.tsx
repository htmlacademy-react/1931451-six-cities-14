import { useState } from 'react';
import { AuthorizationStatusContext } from '.';
import { AuthorizationStatusType } from '../types';
import { AUTH_STATUS } from '../const';

type AuthorizationStatusProviderProps = {
  children: JSX.Element;
};

export function AuthorizationStatusProvider({
  children,
}: AuthorizationStatusProviderProps): JSX.Element {
  const [authorizationStatus, setAuthorizationStatus] =
    useState<AuthorizationStatusType>(AUTH_STATUS);

  return (
    <AuthorizationStatusContext.Provider
      value={{ authorizationStatus, setAuthorizationStatus }}
    >
      {children}
    </AuthorizationStatusContext.Provider>
  );
}
