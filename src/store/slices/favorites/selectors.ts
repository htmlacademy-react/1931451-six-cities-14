import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getFavorites = (state: StateType) => state[NameSpace.Favorites].favorites;
