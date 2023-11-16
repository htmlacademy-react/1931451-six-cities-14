import { createReducer } from '@reduxjs/toolkit';
import {
  addFavorites,
  addNewFavorite,
  addNewReview,
  addReviews,
  loadOffers,
  removeFavorite,
  setActiveCity,
  setAuthorizationStatus,
  setOffersLoadingStatus,
  setUser,
} from './action';
import { offersData } from '../mocks/offers.data';
import {
  AuthorizationStatus,
  CityNamesType,
  OfferType,
  PreviewOfferType,
  ReviewType,
  UserType,
} from '../types';
import { DEFAULT_CITY_NAME } from '../const';

type InitialStateType = {
  city: CityNamesType;
  offers: PreviewOfferType[];
  reviews: ReviewType[];
  favorites: OfferType[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY_NAME,
  offers: [],
  reviews: [],
  favorites: offersData.filter((offer) => offer.isFavorite),
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, { payload }) => {
      state.city = payload.city;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(addReviews, (state, { payload }) => {
      state.reviews = payload.reviews;
    })
    .addCase(addNewReview, (state, { payload }) => {
      state.reviews.push(payload.review);
    })
    .addCase(addFavorites, (state, { payload }) => {
      state.favorites = payload.favorites;
    })
    .addCase(addNewFavorite, (state, { payload }) => {
      state.favorites.push(payload.favoriteOffer);
    })
    .addCase(removeFavorite, (state, { payload }) => {
      state.favorites = state.favorites.filter(
        (offer) => offer.id !== payload.favoriteOffer.id
      );
    })
    .addCase(setOffersLoadingStatus, (state, { payload }) => {
      state.isOffersLoading = payload;
    })
    .addCase(setAuthorizationStatus, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(setUser, (state, { payload }) => {
      state.user = payload;
    });
});
