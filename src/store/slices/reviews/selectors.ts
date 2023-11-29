import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getReviews = (state: StateType) => state[NameSpace.Reviews].reviews;
export const getSendReviewStatus = (state: StateType) => state[NameSpace.Reviews].isSendReview;
export const getReviewAddedStatus = (state: StateType) => state[NameSpace.Reviews].isReviewAdded;
