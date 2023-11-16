import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType } from '../types/state';
import { AxiosInstance } from 'axios';
import { NameSpace } from '../const';
import { PreviewOfferType } from '../types';
import { APIRoute } from '../types/api-route.enum';
import { loadOffers, setOffersLoadingStatus } from './action';

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
