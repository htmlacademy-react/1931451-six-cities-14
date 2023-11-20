import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getNearPlaces = (state: StateType) => state[NameSpace.NearPlaces].nearPlaces;
