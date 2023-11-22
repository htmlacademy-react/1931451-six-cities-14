import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME, NameSpace } from '../../../const';
import { CityNamesType, OfferType, PreviewOfferType } from '../../../types';
import { fetchOffersAction } from '../../api-action';

type OffersStateType = {
  city: CityNamesType;
  offers: PreviewOfferType[];
  isOffersLoading: boolean;
};

const initialState: OffersStateType = {
  city: DEFAULT_CITY_NAME,
  offers: [],
  isOffersLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity: (state, { payload }: PayloadAction<CityNamesType>) => {
      state.city = payload;
    },
    setFavorite: (state, { payload }: PayloadAction<OfferType['id']>) => {
      const offerToChange = state.offers.find((offer) => offer.id === payload);
      if (offerToChange) {
        offerToChange.isFavorite = !offerToChange.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  },
});

export const { setActiveCity, setFavorite } = offersSlice.actions;
