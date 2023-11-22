import { DEBOUNCE_INTERVAL, MAX_PERCENT, MAX_RATING } from '../const';
import {
  AppRoute,
  AuthorizationStatus,
  AuthorizationStatusType,
  OffersSortMapType,
  PreviewOfferType,
} from '../types';

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

export const addPluralEnding = (count: number) => (count !== 1 ? 's' : '');

export const getPathToOffer = (id: string) =>
  AppRoute.Offer.replace(':offerId', id);

export const sortingOffers = (
  arr: PreviewOfferType[],
  type: OffersSortMapType | null
) => {
  switch (type) {
    case 'LowPrice':
      return [...arr].sort((a, b) => a.price - b.price);
    case 'HighPrice':
      return [...arr].sort((a, b) => b.price - a.price);
    case 'TopRated':
      return [...arr].sort((a, b) => b.rating - a.rating);
    default:
      return arr;
  }
};

export const debounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  timeoutDelay: number = DEBOUNCE_INTERVAL
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...rest: Parameters<T>): void => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
