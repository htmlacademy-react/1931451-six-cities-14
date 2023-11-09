import { createReducer } from '@reduxjs/toolkit';
import { addFavorite, addReview, changeCity, loadFavorites, loadOffers, loadReviews, removeFavorite } from './action';
import { offersData } from '../mocks/offers.data';
import { CityNamesType, OfferType, ReviewType } from '../types';
import { reviewsData } from '../mocks/reviews.data';

type InitialStateType = {
  city: CityNamesType;
  offers: OfferType[];
  reviews: ReviewType[];
  favorites: OfferType[];
};

const initialState: InitialStateType = {
  city: 'Paris',
  offers: offersData,
  reviews: reviewsData,
  favorites: offersData.filter((offer) => offer.isFavorite),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload.city;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload.offers;
    })
    .addCase(loadReviews, (state, { payload }) => {
      state.reviews = payload.reviews;
    })
    .addCase(addReview, (state, { payload }) => {
      state.reviews.push(payload.review);
    })
    .addCase(loadFavorites, (state, { payload }) => {
      state.favorites = payload.favorites;
    })
    .addCase(addFavorite, (state, { payload }) => {
      state.favorites.push(payload.favoriteOffer);
    })
    .addCase(removeFavorite, (state, { payload }) => {
      state.favorites = state.favorites.filter((offer) => offer.id !== payload.favoriteOffer.id);
    });
});
