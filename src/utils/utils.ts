import { MAX_PERCENT, MAX_RATING, MIN_PERCENT } from '../const';
import { AuthorizationStatus, AuthorizationStatusType } from '../types';

const isNumber = (num: number | undefined): num is number =>
  typeof num === 'number';

const isString = (str: string | undefined): str is string =>
  typeof str === 'string';

export const getPercentRating = (value: number | undefined): string =>
  isNumber(value)
    ? `${(MAX_PERCENT * value) / MAX_RATING}%`
    : `${MIN_PERCENT}%`;

export const setCapitalLetter = (str: string | undefined): string =>
  isString(str)
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : '';

export const checkAuthorizationStatus = (status: AuthorizationStatusType): boolean => status === AuthorizationStatus.Auth;
