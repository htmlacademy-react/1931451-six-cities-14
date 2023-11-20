import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { fetchNearPlacesAction } from '../../api-action';
import { PreviewOfferType } from '../../../types';

type NearPlacesStateType = {
  nearPlaces: PreviewOfferType[];
};

const initialState: NearPlacesStateType = {
  nearPlaces: [],
};

export const nearPlacesSlice = createSlice({
  name: NameSpace.NearPlaces,
  initialState,
  reducers: {
    dropNearPlaces: (state) => {
      state.nearPlaces = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
      state.nearPlaces = action.payload;
    });
  },
});

export const { dropNearPlaces } = nearPlacesSlice.actions;
