import { UserShortType } from '.';

export type ReviewType = {
  id: string;
  user: UserShortType;
  rating: number;
  comment: string;
  date: string;
}
