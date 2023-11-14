import { createAction } from '@reduxjs/toolkit';
import { CityNamesType, OfferType, ReviewType } from '../types';
import { NameSpace } from '../const';

export const setActiveCity = createAction<{ city: CityNamesType }>(`${NameSpace.Offers}/setActiveCity`);
export const addOffers = createAction<{ offers: OfferType[] }>(`${NameSpace.Offers}/addOffers`);
export const addReviews = createAction<{ reviews: ReviewType[] }>(`${NameSpace.Reviews}/addReviews`);
export const addNewReview = createAction<{ review: ReviewType }>(`${NameSpace.Reviews}/addNewReview`);
export const addFavorites = createAction<{ favorites: OfferType[] }>(`${NameSpace.Favorites}/addFavorites`);
export const addNewFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/addNewFavorite`);
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/removeFavorite`);
