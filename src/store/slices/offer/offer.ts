import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { OfferType } from '../../../types';
import { fetchOfferAction } from '../../api-action';

type OfferStateType = {
  offer: OfferType | null;
  isOfferLoading: boolean;
};

const initialState: OfferStateType = {
  offer: null,
  isOfferLoading: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.offer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      });
  },
});

export const { dropOffer } = offerSlice.actions;
