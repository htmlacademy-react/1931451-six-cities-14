import { TokenType } from '../services/token';

export type AuthDataType = {
  email: string;
  password: string;
}

export type UserShortType = {
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export type UserType = UserShortType & {
  email: string;
  token: TokenType;
}
