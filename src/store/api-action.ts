import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType } from '../types/state';
import { AxiosInstance } from 'axios';
import { NameSpace } from '../const';
import {
  AuthDataType,
  AuthorizationStatus,
  OfferType,
  PreviewOfferType,
  ReviewShortType,
  ReviewType,
  UserType,
} from '../types';
import { APIRoute } from '../types/api-route.enum';
import {
  addNewReview,
  addReviews,
  loadNearPlaces,
  loadOffers,
  setAuthorizationStatus,
  setOffer,
  setOfferLoadingStatus,
  setOffersLoadingStatus,
  setUser,
} from './action';
import { dropToken, saveToken } from '../services/token';

type AsyncActionType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(`${NameSpace.Offers}/fetchOffers`, async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<PreviewOfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
});

export const fetchOfferAction = createAsyncThunk<
  void,
  OfferType['id'],
  AsyncActionType
>(`${NameSpace.Offer}`, async (offerId, { dispatch, extra: api }) => {
  try {
    setOfferLoadingStatus(true);
    const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setOffer(data));
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  OfferType['id'],
  AsyncActionType
>(`${NameSpace.Offer}`, async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  dispatch(addReviews(data));
});

export const fetchAddReviewAction = createAsyncThunk<
  void,
  [OfferType['id'], ReviewShortType],
  AsyncActionType
>(`${NameSpace.Offer}`, async ([offerId, formData], { dispatch, extra: api }) => {
  const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${offerId}`, formData);
  dispatch(addNewReview(data));
});

export const fetchNearPlacesAction = createAsyncThunk<
  void,
  OfferType['id'],
  AsyncActionType
>(`${NameSpace.Offer}`, async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<PreviewOfferType[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.NearPlaces}`
  );

  dispatch(loadNearPlaces(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(`${NameSpace.User}/checkAuth`, async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserType>(APIRoute.Login);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthDataType,
  AsyncActionType
>(
  `${NameSpace.User}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserType>(APIRoute.Login, {
        email,
        password,
      });
      const { token } = data;
      saveToken(token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncActionType>(
  `${NameSpace.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);
