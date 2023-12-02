import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getReviews = (state: StateType) => state[NameSpace.Reviews].reviews;
export const getReviewSendingStatus = (state: StateType) => state[NameSpace.Reviews].isReviewSending;
export const getReviewAddedSucessStatus = (state: StateType) => state[NameSpace.Reviews].isReviewAddedSuccess;
