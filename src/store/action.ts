import { createAction } from '@reduxjs/toolkit';
import { CityNamesType, OfferType, ReviewType } from '../types';

export const changeCity = createAction<{ city: CityNamesType }>('changeCity');
export const addOffers = createAction<{ offers: OfferType[] }>('main/addOffers');
export const addReviews = createAction<{ reviews: ReviewType[] }>('offer/addReviews');
export const addNewReview = createAction<{ review: ReviewType }>('addNewReview');
export const addFavorites = createAction<{ favorites: OfferType[] }>('favorites/addOffers');
export const addNewFavorite = createAction<{ favoriteOffer: OfferType }>('addNewFavorite');
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>('removeFavorite');
