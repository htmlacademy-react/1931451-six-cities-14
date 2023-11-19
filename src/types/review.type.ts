import { UserShortType } from '.';

export type ReviewShortType = {
  rating: number;
  comment: string;
}

export type ReviewType = ReviewShortType & {
  id: string;
  user: UserShortType;
  date: string;
}
