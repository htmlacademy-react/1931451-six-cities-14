import { MAX_PERCENT, MAX_RATING } from '../const';

export const getPercentRating = (value: number): string => `${MAX_PERCENT * value / MAX_RATING }%`;
