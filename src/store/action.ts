import { createAction } from '@reduxjs/toolkit';
import { CityNamesType, OfferType, ReviewType } from '../types';

export const changeCity = createAction<{ city: CityNamesType }>('changeCity');
export const loadOffers = createAction<{ offers: OfferType[] }>('main/loadOffers');
export const loadReviews = createAction<{ reviews: ReviewType[] }>('offer/loadReviews');
export const addReview = createAction<{ review: ReviewType }>('addReview');
export const loadFavorites = createAction<{ favorites: OfferType[] }>('favorites/loadFavorites');
export const addFavorite = createAction<{ favoriteOffer: OfferType }>('addFavorite');
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>('removeFavorite');
