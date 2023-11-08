import { AuthorizationStatus } from './types';
import { isAuthorizationStatus } from './utils/utils';

export const MAX_RATING = 5;
export const MAX_PERCENT = 100;
export const LOCAL_STORAGE_KEY = 'userStatus';
export const AUTH_STATUS = isAuthorizationStatus((localStorage.getItem(LOCAL_STORAGE_KEY))) || AuthorizationStatus.NoAuth;
export const PRIVATE_ROUTES: readonly string[] = ['/favorites'];
export const CITY_NAMES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
