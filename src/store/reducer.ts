import { createReducer } from '@reduxjs/toolkit';
import {
  addFavorites,
  addNewFavorite,
  removeFavorite,
} from './action';
import { offersData } from '../mocks/offers.data';
import {
  PreviewOfferType,
} from '../types';

type InitialStateType = {
  favorites: PreviewOfferType[];
};

const initialState: InitialStateType = {
  favorites: offersData.filter((offer) => offer.isFavorite),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
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
    });
});
