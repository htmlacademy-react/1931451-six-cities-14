import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { PreviewOfferType } from '../../../types';
import { fetchChangeFavoriteStatusAction, fetchFavoritesAction } from '../../api-action';

type FavoritesStateType = {
  favorites: PreviewOfferType[];
}

const initialState: FavoritesStateType = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchChangeFavoriteStatusAction.fulfilled, (state, action) => {
        const isFavorite = action.payload.isFavorite;

        if (isFavorite) {
          state.favorites.push(action.payload);
        }

        if (!isFavorite) {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.id
          );
        }
      });
  }
});
