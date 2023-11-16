import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, CityNamesType, OfferType, PreviewOfferType, ReviewType, UserType } from '../types';
import { NameSpace } from '../const';

export const setActiveCity = createAction<{ city: CityNamesType }>(`${NameSpace.Offers}/setActiveCity`);
export const addReviews = createAction<{ reviews: ReviewType[] }>(`${NameSpace.Reviews}/addReviews`);
export const addNewReview = createAction<{ review: ReviewType }>(`${NameSpace.Reviews}/addNewReview`);
export const addFavorites = createAction<{ favorites: OfferType[] }>(`${NameSpace.Favorites}/addFavorites`);
export const addNewFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/addNewFavorite`);
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/removeFavorite`);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(`${NameSpace.User}/setAuthorizationStatus`);

export const loadOffers = createAction<PreviewOfferType[]>(`${NameSpace.Data}/loadOffers`);
export const setOffersLoadingStatus = createAction<boolean>(`${NameSpace.Data}/setOffersLoadingStatus`);
export const setUser = createAction<UserType | null>(`${NameSpace.User}/setUser`);
