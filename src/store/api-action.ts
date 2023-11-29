import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NameSpace } from '../const';
import {
  AuthDataType,
  OfferType,
  PreviewOfferType,
  ReviewShortType,
  ReviewType,
  UserType,
} from '../types';
import { APIRoute } from '../types/api-route.enum';
import { dropToken, saveToken } from '../services/token';

type AsyncActionType = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  PreviewOfferType[],
  undefined,
  AsyncActionType
>(`${NameSpace.Offers}/fetchOffers`, async (_arg, { extra: api }) => {
  const { data } = await api.get<PreviewOfferType[]>(APIRoute.Offers);

  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  PreviewOfferType[],
  undefined,
  AsyncActionType
>(`${NameSpace.Favorites}/fetchFavorites`, async (_arg, { extra: api }) => {
  const { data } = await api.get<PreviewOfferType[]>(APIRoute.Favorite);

  return data;
});

export const fetchChangeFavoriteStatusAction = createAsyncThunk<
  PreviewOfferType,
  { offerId: OfferType['id']; status: number },
  AsyncActionType
>(
  `${NameSpace.Favorites}/postFavoriteStatus`,
  async ({ offerId, status }, { extra: api }) => {
    const secondString = `${APIRoute.Favorite}/${offerId}/${status}`;
    const { data } = await api.post<PreviewOfferType>(secondString);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  UserType,
  undefined,
  AsyncActionType
>(`${NameSpace.User}/checkAuth`, async (_arg, { extra: api }) => {
  const { data } = await api.get<UserType>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<
  UserType,
  AuthDataType,
  AsyncActionType
>(`${NameSpace.User}/login`, async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserType>(APIRoute.Login, {
    email,
    password,
  });
  const { token } = data;
  saveToken(token);

  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, AsyncActionType>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchOfferAction = createAsyncThunk<
  OfferType,
  OfferType['id'],
  AsyncActionType
>(`${NameSpace.Offer}/fetchOffer`, async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);

  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  ReviewType[],
  OfferType['id'],
  AsyncActionType
>(`${NameSpace.Reviews}/fetchReviews`, async (offerId, { extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${offerId}`
  );

  return data;
});

export const fetchAddReviewAction = createAsyncThunk<
  ReviewType,
  [OfferType['id'], ReviewShortType],
  AsyncActionType
>(
  `${NameSpace.Reviews}/postReview`,
  async ([offerId, formData], { extra: api }) => {
    const { data } = await api.post<ReviewType>(
      `${APIRoute.Comments}/${offerId}`,
      formData
    );

    return data;
  }
);

export const fetchNearPlacesAction = createAsyncThunk<
  PreviewOfferType[],
  OfferType['id'],
  AsyncActionType
>(
  `${NameSpace.NearPlaces}/fetchNearPlaces`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PreviewOfferType[]>(
      `${APIRoute.Offers}/${offerId}${APIRoute.NearPlaces}`
    );

    return data;
  }
);
