import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { PreviewOfferType } from '../../../types';
import { fetchChangeFavoriteStatusAction, fetchFavoritesAction } from '../../api-action';

type FavoritesStateType = {
  favorites: PreviewOfferType[];
  isNeedBookmarkUpdate: boolean;
}

const initialState: FavoritesStateType = {
  favorites: [],
  isNeedBookmarkUpdate: true
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
        state.isNeedBookmarkUpdate = true;

        if (isFavorite) {
          state.favorites.push(action.payload);
        }

        if (!isFavorite) {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.id
          );
        }
      })
      .addCase(fetchChangeFavoriteStatusAction.rejected, (state) => {
        state.isNeedBookmarkUpdate = false;
      });
  }
});
