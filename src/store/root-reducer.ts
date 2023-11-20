import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userSlice } from './slices/user/user';
import { offersSlice } from './slices/offers/offers';
import { offerSlice } from './slices/offer/offer';
import { reviewsSlice } from './slices/reviews/reviews';
import { nearPlacesSlice } from './slices/near-places/near-places';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.NearPlaces]: nearPlacesSlice.reducer,
});
