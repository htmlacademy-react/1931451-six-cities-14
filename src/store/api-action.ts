import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType } from '../types/state';
import { AxiosInstance } from 'axios';
import { NameSpace } from '../const';
import {
  AuthDataType,
  AuthorizationStatus,
  PreviewOfferType,
  UserType,
} from '../types';
import { APIRoute } from '../types/api-route.enum';
import {
  loadOffers,
  setAuthorizationStatus,
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
>(`${NameSpace.Data}/fetchOffers`, async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<PreviewOfferType[]>(APIRoute.Offers);
  dispatch(setOffersLoadingStatus(false));
  dispatch(loadOffers(data));
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
