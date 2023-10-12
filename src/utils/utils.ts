import { MAX_PERCENT, MAX_RATING } from '../const';

export const getRating = (value: number): string => `${MAX_PERCENT * value / MAX_RATING }%`;
