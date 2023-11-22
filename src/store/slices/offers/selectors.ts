import { NameSpace } from '../../../const';
import { StateType } from '../../../types/state';

export const getOffers = (state: StateType) => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: StateType) => state[NameSpace.Offers].isOffersLoading;
export const getActiveCity = (state: StateType) => state[NameSpace.Offers].city;
