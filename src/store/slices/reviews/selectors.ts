import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getReviews = (state: StateType) => state[NameSpace.Reviews].reviews;
