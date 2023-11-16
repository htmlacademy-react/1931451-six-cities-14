import { createReducer } from '@reduxjs/toolkit';
import { addFavorites, addNewFavorite, addNewReview, addReviews, loadOffers, removeFavorite, setActiveCity, setOffersLoadingStatus } from './action';
import { offersData } from '../mocks/offers.data';
import { CityNamesType, OfferType, PreviewOfferType, ReviewType } from '../types';
import { reviewsData } from '../mocks/reviews.data';
import { DEFAULT_CITY_NAME } from '../const';

type InitialStateType = {
  city: CityNamesType;
  offers: PreviewOfferType[];
  reviews: ReviewType[];
  favorites: OfferType[];
  isOffersLoading: boolean;
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY_NAME,
  offers: [],
  reviews: reviewsData,
  favorites: offersData.filter((offer) => offer.isFavorite),
  isOffersLoading: false
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
      state.favorites = state.favorites.filter((offer) => offer.id !== payload.favoriteOffer.id);
    })
    .addCase(setOffersLoadingStatus, (state, {payload}) => {
      state.isOffersLoading = payload;
    });
});
