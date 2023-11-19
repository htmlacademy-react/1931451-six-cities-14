import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, CityNamesType, OfferType, PreviewOfferType, ReviewType, UserType } from '../types';
import { NameSpace } from '../const';

export const setActiveCity = createAction<{ city: CityNamesType }>(`${NameSpace.Offers}/setActiveCity`);
export const addReviews = createAction<ReviewType[]>(`${NameSpace.Reviews}/addReviews`);
export const addNewReview = createAction<ReviewType>(`${NameSpace.Reviews}/addNewReview`);
export const addFavorites = createAction<{ favorites: OfferType[] }>(`${NameSpace.Favorites}/addFavorites`);
export const addNewFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/addNewFavorite`);
export const removeFavorite = createAction<{ favoriteOffer: OfferType }>(`${NameSpace.Favorites}/removeFavorite`);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(`${NameSpace.User}/setAuthorizationStatus`);
export const setOffer = createAction<OfferType | null>(`${NameSpace.Offer}/setOffer`);
export const loadNearPlaces = createAction<PreviewOfferType[]>(`${NameSpace.Offer}/loadNearPlaces`);
export const setOfferLoadingStatus = createAction<boolean>(`${NameSpace.Offer}/setOfferLoadingStatus`);

export const loadOffers = createAction<PreviewOfferType[]>(`${NameSpace.Offers}/loadOffers`);
export const setOffersLoadingStatus = createAction<boolean>(`${NameSpace.Offers}/setOffersLoadingStatus`);
export const setUser = createAction<UserType | null>(`${NameSpace.User}/setUser`);
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
