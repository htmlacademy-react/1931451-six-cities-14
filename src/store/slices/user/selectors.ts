import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getAuthorizationStatus = (state: StateType) => state[NameSpace.User].authorizationStatus;
export const getUser = (state: StateType) => state[NameSpace.User].user;
