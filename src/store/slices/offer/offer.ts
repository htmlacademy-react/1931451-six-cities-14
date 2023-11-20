import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { OfferType, PreviewOfferType } from '../../../types';
import { fetchOfferAction } from '../../api-action';

type OfferStateType = {
  offer: OfferType | null;
  isOfferLoading: boolean;
  activeOffer: PreviewOfferType | null;
};

const initialState: OfferStateType = {
  offer: null,
  isOfferLoading: false,
  activeOffer: null,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setActiveOffer: (state, { payload }: PayloadAction<PreviewOfferType | null>) => {
      state.activeOffer = payload;
    },
    dropOffer: (state) => {
      state.offer = null;
      state.activeOffer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.activeOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      });
  },
});

export const { setActiveOffer, dropOffer } = offerSlice.actions;
