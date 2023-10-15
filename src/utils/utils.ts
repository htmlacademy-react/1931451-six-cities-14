import { DEFAULT_BEGIN, MAX_PERCENT, MAX_RATING } from '../const';

export const getPercentRating = (value: number): string =>
  `${(MAX_PERCENT * value) / MAX_RATING}%`;

export const getArraySlice = <T = string> (arr: T[], endSlice: number, beginSlice: number = DEFAULT_BEGIN): T[] =>
  arr.slice(beginSlice, Math.min(endSlice, arr.length));

export const setCapitalLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
