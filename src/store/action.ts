import { createAction } from '@reduxjs/toolkit';
import { AppRoute, OfferType } from '../types';
import { NameSpace } from '../const';


export const addFavorites = createAction<{ favorites: OfferType[] }>(`${NameSpace.Favorites}/addFavorites`);
export const addNewFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/addNewFavorite`);
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/removeFavorite`);

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
