import { MAX_PERCENT, MAX_RATING } from '../const';
import { AuthorizationStatus, AuthorizationStatusType } from '../types';

export const isNumber = (num: number | undefined): num is number =>
  typeof num === 'number';

export const isString = (str: string | undefined): str is string =>
  typeof str === 'string';

export const getPercentRating = (value: number): string =>
  `${(MAX_PERCENT * value) / MAX_RATING}%`;

export const setCapitalLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const checkAuthorizationStatus = (
  status: AuthorizationStatusType
): boolean => status === AuthorizationStatus.Auth;

export const isAuthorizationStatus = (str: string | null) => {
  if (str && Object.values<string>(AuthorizationStatus).includes(str)) {
    return str as AuthorizationStatusType;
  }

  return null;
};

// FIXME: formatDate fn
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
