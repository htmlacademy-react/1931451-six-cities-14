import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getOfferLoadingStatus = (state: StateType) => state[NameSpace.Offer].isOfferLoading;
export const getOffer = (state: StateType) => state[NameSpace.Offer].offer;
export const getActiveOffer = (state: StateType) => state[NameSpace.Offer].activeOffer;
